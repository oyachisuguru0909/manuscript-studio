// app/api/notion-sync/route.js
// SUGURU脳DBから「マニスタ原稿生成に役立つ知見」をAI判定で抽出して返す

export const runtime = "nodejs";
export const maxDuration = 60;

const NOTION_VERSION = "2022-06-28";
const NOTION_API = "https://api.notion.com/v1";

/**
 * POST /api/notion-sync
 * body: { sinceISO?: string }  // 増分同期用：この日時より新しいページのみ取得
 * returns: { knowledge: Array<{ id, title, summary }>, fetchedAt: string, totalFetched: number, totalAdopted: number }
 */
export async function POST(req) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!NOTION_API_KEY) {
    return Response.json({ error: "NOTION_API_KEY が未設定です" }, { status: 500 });
  }
  if (!NOTION_DATABASE_ID) {
    return Response.json({ error: "NOTION_DATABASE_ID が未設定です" }, { status: 500 });
  }
  if (!ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY が未設定です" }, { status: 500 });
  }

  let body = {};
  try { body = await req.json(); } catch (e) { body = {}; }
  const sinceISO = body.sinceISO || null;

  try {
    // 1. Notion DBから直近50件を取得（更新日時の新しい順）
    const pages = await queryNotionDatabase({
      apiKey: NOTION_API_KEY,
      databaseId: NOTION_DATABASE_ID,
      sinceISO,
      pageSize: 50,
    });

    if (pages.length === 0) {
      return Response.json({
        knowledge: [],
        fetchedAt: new Date().toISOString(),
        totalFetched: 0,
        totalAdopted: 0,
        message: "新しい更新はありませんでした",
      });
    }

    // 2. 各ページのタイトル＋本文先頭を取得
    const pageDataPromises = pages.map((p) => fetchPageSnippet({ apiKey: NOTION_API_KEY, page: p }));
    const pageDataAll = await Promise.all(pageDataPromises);
    const pageData = pageDataAll.filter((p) => p !== null);

    // 3. AI判定（Haiku）でマニスタ関連を抽出＋30字要約
    const adopted = await aiJudgeAndSummarize({
      apiKey: ANTHROPIC_API_KEY,
      pageData,
    });

    return Response.json({
      knowledge: adopted,
      fetchedAt: new Date().toISOString(),
      totalFetched: pages.length,
      totalAdopted: adopted.length,
    });
  } catch (e) {
    console.error("notion-sync error:", e);
    return Response.json({ error: e.message || "同期エラー" }, { status: 500 });
  }
}

// ─────────────────────────────────────────
// Notion DBクエリ
// ─────────────────────────────────────────
async function queryNotionDatabase({ apiKey, databaseId, sinceISO, pageSize }) {
  const body = {
    page_size: pageSize,
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  };
  if (sinceISO) {
    body.filter = {
      timestamp: "last_edited_time",
      last_edited_time: { after: sinceISO },
    };
  }
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Notion DBクエリ失敗 (${res.status}): ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.results || [];
}

// ─────────────────────────────────────────
// 単一ページのタイトル＋本文先頭300字を取得
// ─────────────────────────────────────────
async function fetchPageSnippet({ apiKey, page }) {
  try {
    // タイトル抽出
    let title = "";
    const props = page.properties || {};
    for (const k of Object.keys(props)) {
      const p = props[k];
      if (p.type === "title" && p.title && p.title.length > 0) {
        title = p.title.map((t) => t.plain_text || "").join("");
        break;
      }
    }
    if (!title) return null;

    // 種別・学び欄も抽出（参考として）
    let category = "";
    let learning = "";
    for (const k of Object.keys(props)) {
      const p = props[k];
      if (p.type === "select" && p.select && (k === "種別" || k === "Type")) {
        category = p.select.name || "";
      }
      if (p.type === "rich_text" && p.rich_text && (k === "学び" || k === "Learning")) {
        learning = p.rich_text.map((t) => t.plain_text || "").join("");
      }
    }

    // 本文ブロックを取得（先頭のみ）
    const blocksRes = await fetch(`${NOTION_API}/blocks/${page.id}/children?page_size=10`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
      },
    });
    let bodyText = "";
    if (blocksRes.ok) {
      const blocksData = await blocksRes.json();
      const blocks = blocksData.results || [];
      for (const b of blocks) {
        const rt = extractRichText(b);
        if (rt) bodyText += rt + "\n";
        if (bodyText.length >= 300) break;
      }
    }

    return {
      id: page.id,
      title,
      category,
      learning: learning.slice(0, 200),
      bodySnippet: bodyText.slice(0, 300),
    };
  } catch (e) {
    return null;
  }
}

function extractRichText(block) {
  const t = block.type;
  const obj = block[t];
  if (!obj) return "";
  if (obj.rich_text && Array.isArray(obj.rich_text)) {
    return obj.rich_text.map((r) => r.plain_text || "").join("");
  }
  return "";
}

// ─────────────────────────────────────────
// AI判定＋要約
// ─────────────────────────────────────────
async function aiJudgeAndSummarize({ apiKey, pageData }) {
  // 10件ずつバッチ処理
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < pageData.length; i += batchSize) {
    batches.push(pageData.slice(i, i + batchSize));
  }

  const adopted = [];
  for (const batch of batches) {
    const result = await judgeBatch({ apiKey, batch });
    adopted.push(...result);
    if (adopted.length >= 20) break; // 最大20件
  }

  return adopted.slice(0, 20);
}

async function judgeBatch({ apiKey, batch }) {
  const itemsText = batch
    .map(
      (p, idx) =>
        `[${idx + 1}] タイトル: ${p.title}\n種別: ${p.category || "(未設定)"}\n学び: ${p.learning || "(なし)"}\n本文先頭: ${p.bodySnippet || "(なし)"}`
    )
    .join("\n\n");

  const prompt = `あなたは求人原稿生成システムのキュレーターです。
以下の知見ストックから、「求人原稿（Indeed・Airwork・ジョブメドレー向け）の文面作成に直接役立つもの」だけを選んでください。

【役立つ例】
- キャッチコピーの作り方
- 訴求文の構成パターン
- 業界別の表現テクニック
- 応募者心理に関する洞察
- NG表現・推奨表現
- 装飾・読みやすさの工夫

【役立たない例】
- システム障害対応・技術的な振り返り
- 営業戦略・経営方針
- 個別の事業所固有情報
- 雑談・日記的なメモ

各エントリについて、以下のJSON配列形式で出力してください。役立つもの（YES）だけを含め、役立たないもの（NO）は含めないでください。

[
  { "id": 1, "summary": "30文字以内で要約したノウハウ1文" },
  { "id": 3, "summary": "..." }
]

要約は「○○の時は××する」「○○の表現は△△に置き換える」など、原稿生成時に直接適用できる具体的な指示文にしてください。

知見ストック:

${itemsText}

JSON配列のみ返してください（説明文・コードブロック不要）:`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("AI判定エラー:", errText);
    return [];
  }

  const data = await res.json();
  const text = data.content
    .filter((i) => i.type === "text")
    .map((i) => i.text)
    .join("");

  // JSON配列を抽出
  let cleanText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const startIdx = cleanText.indexOf("[");
  const endIdx = cleanText.lastIndexOf("]");
  if (startIdx === -1 || endIdx === -1) return [];
  cleanText = cleanText.substring(startIdx, endIdx + 1);

  try {
    const parsed = JSON.parse(cleanText);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.id === "number" && item.summary)
      .map((item) => {
        const source = batch[item.id - 1];
        return {
          id: source ? source.id : null,
          title: source ? source.title : "",
          summary: String(item.summary).slice(0, 60),
        };
      })
      .filter((item) => item.id !== null);
  } catch (e) {
    console.error("JSON parse error:", e.message, "text:", cleanText.slice(0, 200));
    return [];
  }
}
