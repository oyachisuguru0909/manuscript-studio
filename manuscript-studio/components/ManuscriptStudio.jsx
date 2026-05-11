import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  FileText,
  Wand2,
  AlertCircle,
  PenLine,
  Zap,
  Layers,
  Plus,
  Edit3,
  ChevronDown,
  Info,
  Link as LinkIcon,
  Clipboard,
  AlertTriangle,
  Mail,
  Briefcase,
  Feather,
  Building2,
  Tag,
  DollarSign,
  Clock,
  Calendar,
  Heart,
  MapPin,
  Users,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Palette,
  Navigation,
  Car,
  Target,
} from "lucide-react";

/* =========================================================================
   【コアナレッジ】13本分析から抽出した装飾パターン・カラーテーマ・文体
   ========================================================================= */

const DECORATION_TYPES = `
【ジョブメドレー装飾原稿の7大型（13本分析結果）】

1. マルチカラー華やか型（P1のびのび広場）
   - SPECIAL POINTS枠（黄色ドット背景・囲み枠）
   - セクション毎に色を変える（ピンク/オレンジ/緑/青）
   - グラデーションCTA（強インパクト）
   - 情報密度最大・全面装飾

2. マルチカラー整理リッチ型（P6キャンパス石神・P12ぽかぽか広場）
   - インライン塗りラベル見出し（セクション毎に色を変える）
   - 縦線＋ドット円のタイムライン
   - カプセル型ポイントカード（丸アイコン＋flex）
   - マルチカラーだが整理された印象

3. ブルー信頼型（P3放デイ）
   - ブルー単色階調（#0077b6系）
   - 帯型見出し（背景塗り＋白文字）
   - 絵文字アイコン付き横並びflexカード
   - タブ飛び出し型スタッフの声
   - 水色グラデーションCTA

4. 統一リズム型（P5八千代・P8ナチュレ・P9ロレイン・P11aid）
   - 全セクションで同じ見出しデザインを反復使用
   - 「background:#xxx; border-left:5px solid #xxx; border-radius:6px」パターン
   - ポイントリスト（薄色背景＋絵文字＋太字）
   - 塗りラベル＋Q&A絵文字のインタビューカード
   - 最も汎用性が高い王道型

5. エレガント構造型（P2 L'AJITTO・P10 image Act）
   - ヒーローグラデカード（冒頭の世界観提示）
   - 給与ハイライト単独カード
   - 番号付きポイント・入れ子構造紹介カード
   - 白＋1-2色のアースカラー
   - 美容・上質系訴求

6. ミニマル・スポット型（P4つむぐ・P7虹色のたね・P13村上歯科）
   - プレーンHTML（<h3>+<br>+<strong>）主体
   - 装飾はスタッフインタビュー等の1-2ブロックのみ
   - ベージュラッパー（#f7f6f3）+左縦線カード
   - 医療系ではスタッフの声＋患者の声のダブル配置

7. 単色リッチ型（P12ぽかぽか広場）
   - 統一色でありながら装飾密度が高い
   - カプセル型・丸アイコン・縦線タイムライン
   - 中央下線見出し＋塗りラベル見出しの使い分け
`;

const COLOR_THEMES = `
【実証済みカラーテーマ8種】

🟧 Warm Orange（温もり）
   - メイン:#f39800 / 濃色:#d47b00 / 中間:#fff4e5 / 薄:#fffafb
   - 推奨：児発管・医療福祉・子育て（P5,P12）

🌱 Fresh Green（癒し）
   - メイン:#7cb342 / 濃色:#558b2f / 中間:#f0f9e8 / 薄:#fafff5
   - 推奨：介護・訪問・ナチュラル系（P8）

🌲 Forest Green（上品）
   - メイン:#6a994e / 濃色:#386641 / 中間:#e9f5db / 薄:#f8fcf4
   - 推奨：美容・大人女性向け（P9）

🟦 Navy Blue（プロ・稼ぎ）
   - メイン:#1f3c88 / 濃色:#1f3c88 / 中間:#eef3fb / 薄:#f8faff
   - 推奨：美容師高単価・稼ぎ訴求（P11）

💧 Water Blue（信頼・清潔）
   - メイン:#0077b6 / サブ:#00b4d8 / 中間:#e1f5fe / 薄:#f0faff
   - 推奨：医療・教育・クリニック（P3）

🧡 Warm Peach（温かみ・復職）
   - メイン:#d9730d / サブ:#f93 / 中間:#fff2e6 / 薄:#fffaf5
   - 推奨：復職訴求・美容・温かみ系（P10）

🍃 Sage Terracotta（エレガント）
   - メイン:#c68b59 / サブ:#8da399 / 中間:#fdfaf7 / 薄:#f7f1ed
   - 推奨：大人美容・上質サロン（P2）

🏥 Medical Multi（医療系ミックス）
   - サーモンピンク:#f5b5a5 / スカイ:#7bb0e6 / グリーン:#6fcf97
   - ベージュラッパー:#f7f6f3
   - 推奨：歯科・クリニック（P13）
`;

const CLOSING_PATTERNS = `
【クロージング文体5型】

A. 共感・不安解消型（P4,P7,P10）
   応募者の不安3つをカギ括弧で列挙→「そんな気持ちで…多いと思います」で肯定→解決策→CTA
   使いどころ：ブランク/復職/初めて訴求

B. 野心・成長訴求型（P11）
   「今の給与に納得がいっていない」「もっと高いステージで稼ぎたい」等の野心を言語化
   使いどころ：高歩合/稼ぎたい層

C. 魅力再訴求型（P1,P6,P8,P9,P12,P13）
   条件・福利厚生・魅力の総まとめ→「少しでも気になった方は、ぜひお気軽にご応募ください」
   使いどころ：万能型・最も汎用

D. 情緒・感情訴求型（P3）
   「あなたの笑顔が、子どもたちの勇気になる」等の情緒表現
   使いどころ：福祉/教育/情緒訴求

E. ブランド一体型（P2）
   「L'AJITTOは一人ひとりの幸せに向き合うサロンです」等のブランド主語
   使いどころ：上質・ブランド訴求
`;

const EMOJI_STRATEGIES = `
【絵文字戦略4パターン】

🌿 自然・癒し系：介護・訪問・癒し系業種（P5,P8）
✅ 確実・安心系：上品・美容系（P9,P11の一部）
🔥 情熱・結果系：稼ぎ訴求・強訴求（P11）
🌸 親しみ・柔らか系：保育・ママ向け（汎用）

【見出し絵文字の標準】
🌟 働く魅力 / ✨ 事業所紹介 / ✋ 仕事内容 / ⏰ 1日のスケジュール
🎓 研修 / 💬 スタッフの声 / 💗 お客様の声 / 🌈 応募を迷っている方へ
`;

const FIELD_SPEC = `
【ジョブメドレー管理画面12フィールド仕様】

★★★ 全フィールド共通の絵文字装飾ルール（厳守） ★★★
訴求文（②）以外のフィールド（③〜⑫）でも、絵文字を使って装飾を付けること。
ただし「適度にシンプルに」が基本姿勢。多用しすぎると逆に見づらくなるので厳禁。

【絵文字の使い方ルール】
- 各フィールドで使う絵文字は 2〜4種類に絞る（多くても5種類まで）
- 各フィールド全体での絵文字の総数は 3〜6個程度にとどめる
- 見出し・小見出しの先頭に1つだけ配置するのが基本
- 箇条書きは同じ記号（✅または▷または・）で統一し、各行に違う絵文字は使わない
- 重要な数字の前に1つだけアクセントとして使う程度（例：💰月給28万円）
- プレーンテキストのみの出力は避けるが、過剰装飾も同様にNG

【NG例（絵文字が多すぎる・各行に別絵文字）】
🩺医療処置 ／ 📝記録業務 ／ 🤝利用者対応 ／ 🚗送迎 ／ 🧹清掃 ／ 💬カウンセリング
✅社保完備 🎁賞与 🚃交通費支給 💼退職金 🏠住宅手当 🌿独自手当

【OK例（適度・見出しの絵文字1つ＋箇条書きは統一記号）】
💼 お仕事の概要
✅ 利用者さまへの医療処置（バイタル測定・服薬管理等）
✅ 記録業務（タブレット入力）
✅ 送迎業務
✅ 利用者さま・ご家族への相談対応

① 訴求文タイトル（必須）
   - 絵文字＋具体数字アンカー2〜4個｜／区切り
   - 1〜2行

② 訴求文（必須）【重要：装飾HTML対応】
   - ジョブメドレーの仕様で、HTML装飾コードを埋め込み可能
   - 必ず上記7大型のいずれかの型を採用
   - カラーテーマ・クロージング文体も適切に選択
   - ★★★出力は必ず1行（タグ間・属性間で改行しない）★★★
   - 本文中の視覚的改行は<br>タグのみで表現
   - 3要素必須：① 職場の概要　② 働くうえでの魅力　③ 求める人物像

③ 仕事内容（必須）
   - 冒頭に「💼 お仕事の概要」等の絵文字付き小見出しを1つ
   - 箇条書きは ✅ で統一、各行の先頭に異なる絵文字は付けない
   - 5〜8項目の箇条書き
   - パート・契約・業務委託の場合は雇用期間・更新条件を明記

④ 給与の備考
   - 冒頭に「💰 給与」等の絵文字付き小見出しを1つ
   - 各項目は「・」または「✅」で統一
   - 数字は強調するが、全項目に絵文字を付けない

⑤ 待遇
   - 冒頭に「🎁 待遇・福利厚生」等の絵文字付き小見出しを1つ
   - 箇条書きは ✅ で統一

⑥ 教育体制・研修
   - 冒頭に「🎓 教育体制・研修」等の絵文字付き小見出しを1つ
   - 箇条書きは ✅ または・で統一

⑦ 勤務時間・休憩時間（必須）
   - 冒頭に「⏰ 勤務時間」等の絵文字付き小見出しを1つ
   - 「✨ 働き方のポイント」として絵文字付き小見出しで特徴を強調（任意）
   - 箇条書きは ✅ または・で統一

⑧ 休日（必須）
   - 冒頭に「📅 休日」等の絵文字付き小見出しを1つ
   - 箇条書きは ✅ または・で統一

⑨ 長期休暇・特別休暇
   - 冒頭に「🌸 長期休暇・特別休暇」等の絵文字付き小見出しを1つ
   - 箇条書きは ✅ または・で統一

⑩ 応募要件（必須）
   - 「📌 必須条件」「🎯 こんな方にピッタリ」等の絵文字付き小見出しを使い分け
   - 各項目は ✅ で統一

⑪ 歓迎要件
   - 「💡 優遇する経験」「✨ 歓迎するマインド」等の絵文字付き小見出し
   - 各項目は ✅ で統一

⑫ 選考プロセス（必須）
   - ステップ1〜5形式で固定
   - 各ステップ先頭は「▼ ステップ1」等で統一（各ステップに絵文字を付けない）
   - 末尾に「🔸」補足メッセージを1つ（平均期間など）

【絵文字使用の総ルール】
- 絵文字は見出しを装飾するためのものであり、箇条書きの各行を装飾するためのものではない
- 1つのフィールドで使う絵文字の種類は最大5種類まで
- 見出し1つにつき絵文字は1つまで
- 箇条書きは同じ記号で統一し、行ごとに絵文字を変えない
- 迷ったら減らす方を選ぶ
`;

/* =========================================================================
   システムプロンプト生成
   ========================================================================= */

const buildSystemPrompt = (mode, decorationType, colorTheme, closingType) => {
  const base = `あなたはジョブメドレー（医療・福祉・美容業界）専門の求人原稿ライターです。
以下のナレッジを完全に理解し、それに従って原稿を生成してください。

${DECORATION_TYPES}
${COLOR_THEMES}
${CLOSING_PATTERNS}
${EMOJI_STRATEGIES}
${FIELD_SPEC}

【生成時のルール】
- 選択された装飾型：${decorationType}
- 選択されたカラーテーマ：${colorTheme}
- 選択されたクロージング文体：${closingType}
- 情報にない内容は絶対に捏造しない（不明は「（要確認）」と明記）
- 具体的な数字を最大限活用
- 敬体ベース
- ★絵文字装飾は「適度・シンプル」に。見出しに1つ、箇条書きは同じ記号で統一。多用は厳禁★

【出力フォーマット】
以下のフィールド区切り形式で、12フィールド全てを出力：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 訴求文タイトル
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
（本文）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 訴求文
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
（★必ず1行HTMLで出力★タグ間・属性間で絶対に改行しない）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 仕事内容
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
（以下、給与備考／待遇／教育体制／勤務時間／休日／長期休暇／応募要件／歓迎要件／選考プロセスまで全12フィールド）

【訴求文（HTML）の厳守ルール ★最重要★】
- 出力は必ず1行の連続HTML
- タグ間（</h3><div>等）で改行しない
- タグ内の属性間（style="..." 等）で改行しない
- 本文中の視覚的改行は<br>タグのみで表現
- ジョブメドレー管理画面に貼り付けた時に、デザインが崩れないことが絶対条件

出力は原稿本文のみ。前置き・説明文は一切不要。`;

  if (mode === "new") {
    return `${base}

【今回のタスク】
ユーザー提供の求人情報から、12フィールド全ての原稿を新規作成してください。`;
  }
  if (mode === "rewrite") {
    return `${base}

【今回のタスク】
ユーザーが提供する既存原稿（テキスト or URL内容）をリライトしてください。
- 既存の数字・固有名詞は一切変更しない
- 構成を上記テンプレートに沿って再構築
- 訴求力を強化し、応募率向上を狙う`;
  }
  if (mode === "catch") {
    return `あなたはジョブメドレー専門のキャッチコピーライターです。

${COLOR_THEMES}

【今回のタスク】
訴求軸の異なる3案の「訴求文タイトル」を生成してください。

【ルール】
- 各案1〜2行、絵文字＋具体数字アンカー2〜4個＋｜／区切り必須
- 訴求軸を変える（給与/働き方/キャリア/安心/差別化など）
- 既存求人と同一タイトルは禁止（ジョブメドレー規約）

【出力形式】
【案1：◯◯訴求】
（本文）

【案2：◯◯訴求】
（本文）

【案3：◯◯訴求】
（本文）

出力は3案のみ。前置き・説明は不要。`;
  }
  if (mode === "section") {
    return `${base}

【今回のタスク】
ユーザー指定フィールドのみを生成または編集してください。
指定フィールド以外は出力しない。
情報不足は「（要確認）」で明記。`;
  }
  return base;
};

/* =========================================================================
   API呼び出し
   ========================================================================= */

const callClaudeAPI = async (systemPrompt, userContent, tools = null) => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: "user", content: userContent }],
  };
  if (tools) body.tools = tools;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.content
    .map((item) => (item.type === "text" ? item.text : ""))
    .filter(Boolean)
    .join("\n");
};

/* =========================================================================
   共通UIパーツ
   ========================================================================= */

const copyToClipboard = async (text) => {
  if (!text) return false;
  // 方法1: navigator.clipboard（モダンブラウザ・HTTPS環境）
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // 失敗時はフォールバックへ
    }
  }
  // 方法2: execCommandフォールバック（iframe・非HTTPS対応）
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "2em";
    textarea.style.height = "2em";
    textarea.style.padding = "0";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "none";
    textarea.style.background = "transparent";
    textarea.style.opacity = "0";
    textarea.setAttribute("readonly", "");
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch (e) {
    return false;
  }
};

const CopyBtn = ({ text, small = false, label = "コピー" }) => {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const doCopy = async () => {
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 1800);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 2500);
    }
  };
  const cls = small
    ? "flex items-center gap-1 text-[10px] text-slate-600 hover:text-teal-400 transition px-2 py-1 rounded border border-slate-200 hover:border-teal-300"
    : "flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-400 transition px-3 py-1.5 rounded-md border border-slate-200 hover:border-teal-300 hover:bg-teal-50";
  return (
    <button onClick={doCopy} disabled={!text} className={`${cls} disabled:opacity-30`}>
      {copied ? (
        <>
          <Check className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
          済
        </>
      ) : failed ? (
        <>
          <AlertCircle className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
          失敗
        </>
      ) : (
        <>
          <Copy className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
          {label}
        </>
      )}
    </button>
  );
};

const parseFieldedOutput = (text) => {
  if (!text) return [];
  const regex = /━+\s*\n■\s*(.+?)\n━+\s*\n([\s\S]*?)(?=\n━+\s*\n■|\n*$)/g;
  const fields = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    fields.push({ label: m[1].trim(), content: m[2].trim() });
  }
  return fields.length ? fields : [{ label: "出力", content: text }];
};

/* === セクション修正指示用：よく使うプリセット === */
const REVISION_PRESETS = {
  tone: {
    label: "トーン調整",
    items: [
      { label: "もっと親しみやすく", instruction: "もっと親しみやすく、カジュアルなトーンに" },
      { label: "もっとフォーマルに", instruction: "もっとフォーマルで丁寧な敬語表現に" },
      { label: "もっとカジュアルに", instruction: "もっとカジュアルで気軽なトーンに" },
      { label: "もっと熱量高く", instruction: "もっと情熱的で熱量の高いトーンに、応募意欲を引き出す表現で" },
    ],
  },
  content: {
    label: "内容調整",
    items: [
      { label: "もっと簡潔に", instruction: "情報量を減らし、もっと簡潔に。冗長な部分を削減" },
      { label: "もっと具体的に", instruction: "抽象表現を減らし、具体的な数字やエピソードを盛り込んで" },
      { label: "もっと詳しく", instruction: "情報量を増やし、より詳細で説得力のある内容に拡張" },
      { label: "訴求を強く", instruction: "ベネフィットや訴求ポイントを強調し、応募したくなる文章に" },
    ],
  },
  decoration: {
    label: "装飾調整",
    items: [
      { label: "絵文字を増やす", instruction: "適切な絵文字をもっと追加し、視覚的に華やかに" },
      { label: "絵文字を減らす", instruction: "絵文字を減らし、シンプルで落ち着いた雰囲気に" },
      { label: "装飾をシンプルに", instruction: "装飾記号を最小限にし、読みやすく整理された見た目に" },
      { label: "もっと華やかに", instruction: "見出し・装飾記号・絵文字を効果的に増やして華やかに" },
    ],
  },
  target: {
    label: "ターゲット調整",
    items: [
      { label: "若い世代向け", instruction: "20代の若手向けにトーン・内容を調整" },
      { label: "ベテラン向け", instruction: "経験者・ベテラン向けに、専門性や責任ある業務を強調" },
      { label: "未経験者向け", instruction: "未経験者でも安心できる、教育体制やサポートを強調" },
      { label: "ミドル世代向け", instruction: "30〜40代のミドル世代向けに、安定性とキャリア両立を強調" },
    ],
  },
};

/* === 修正指示パネルコンポーネント（共通） === */
const RevisionPanel = ({ open, onClose, onApply, isLoading, accentColor = "teal" }) => {
  const [instruction, setInstruction] = useState("");
  if (!open) return null;

  const accentClasses = {
    teal: { bg: "bg-teal-500", bgHover: "hover:bg-teal-600", text: "text-teal-700", bg50: "bg-teal-50", border: "border-teal-300" },
    rose: { bg: "bg-rose-700", bgHover: "hover:bg-rose-600", text: "text-rose-700", bg50: "bg-rose-50", border: "border-rose-300" },
    sky: { bg: "bg-sky-600", bgHover: "hover:bg-sky-700", text: "text-sky-700", bg50: "bg-sky-50", border: "border-sky-300" },
  };
  const c = accentClasses[accentColor] || accentClasses.teal;

  const apply = (instr) => {
    onApply(instr);
    setInstruction("");
  };

  return (
    <div className={`mt-2 border-2 ${c.border} ${c.bg50} rounded-lg p-3 space-y-3`}>
      <div className="flex items-center justify-between">
        <div className={`text-xs font-bold ${c.text} flex items-center gap-1`}>
          <Wand2 className="w-3 h-3" /> 修正指示
        </div>
        <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-700">
          ✕ 閉じる
        </button>
      </div>

      {/* よく使う修正プリセット */}
      <div className="space-y-2">
        {Object.entries(REVISION_PRESETS).map(([catKey, cat]) => (
          <div key={catKey}>
            <div className="text-[10px] uppercase font-bold text-slate-600 mb-1">{cat.label}</div>
            <div className="flex flex-wrap gap-1">
              {cat.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => apply(item.instruction)}
                  disabled={isLoading}
                  className="px-2 py-1 text-[11px] bg-white border border-slate-300 hover:border-slate-400 rounded transition disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 自由入力 */}
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-600 mb-1">自由に入力</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="例：女性向けに調整して、20代の保育士が安心できる表現で"
            className="flex-1 px-2 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none focus:border-slate-400 text-slate-900"
            onKeyDown={(e) => {
              if (e.key === "Enter" && instruction.trim() && !isLoading) {
                apply(instruction);
              }
            }}
          />
          <button
            onClick={() => instruction.trim() && apply(instruction)}
            disabled={isLoading || !instruction.trim()}
            className={`px-3 py-1.5 text-xs font-bold ${c.bg} ${c.bgHover} text-white rounded disabled:opacity-50 transition flex items-center gap-1 whitespace-nowrap`}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
            反映
          </button>
        </div>
      </div>
    </div>
  );
};

const FieldedOutput = ({ output, loading, onRevise, isRevising, onReviseField, revisingField }) => {
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [fieldRevisionOpen, setFieldRevisionOpen] = useState(null); // フィールド単位の修正パネル
  const fields = parseFieldedOutput(output);
  if (!output && !loading) return null;
  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Sparkles className="w-4 h-4 text-teal-400" />
          生成結果（フィールド別コピー・修正可）
        </label>
        <div className="flex gap-2">
          {output && onRevise && (
            <button
              onClick={() => setRevisionOpen(!revisionOpen)}
              disabled={isRevising || revisingField}
              className={
                "flex items-center gap-1 px-3 py-1.5 text-xs border transition rounded disabled:opacity-50 " +
                (revisionOpen ? "bg-teal-500 text-white border-teal-500" : "border-slate-200 hover:border-slate-300")
              }
            >
              <Wand2 className="w-3 h-3" />
              全体修正
            </button>
          )}
          {output && <CopyBtn text={output} label="全体コピー" />}
        </div>
      </div>

      {onRevise && (
        <RevisionPanel
          open={revisionOpen}
          onClose={() => setRevisionOpen(false)}
          onApply={(instr) => {
            onRevise(instr);
            setRevisionOpen(false);
          }}
          isLoading={isRevising}
          accentColor="teal"
        />
      )}

      {loading && !output ? (
        <div className="bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-3 text-slate-500 text-sm py-12 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          原稿を生成中...
        </div>
      ) : (
        <div className={isRevising ? "opacity-40 pointer-events-none relative" : "relative"}>
          {fields.map((f, i) => {
            const isAppeal = f.label.includes("訴求文") && !f.label.includes("タイトル");
            const isThisFieldRevising = revisingField === f.label;
            const isPanelOpen = fieldRevisionOpen === f.label;
            return (
              <div
                key={i}
                className={`bg-gradient-to-br from-white to-slate-50 border rounded-lg overflow-hidden mb-3 ${
                  isAppeal ? "border-amber-300" : "border-slate-200"
                }`}
              >
                <div
                  className={`flex items-center justify-between px-4 py-2.5 border-b flex-wrap gap-2 ${
                    isAppeal
                      ? "bg-amber-50 border-amber-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-4 rounded-full ${isAppeal ? "bg-amber-400" : "bg-teal-400"}`} />
                    <span className="text-xs font-bold text-slate-900">■ {f.label}</span>
                    {isAppeal && (
                      <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-300">
                        HTML・1行
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    {onReviseField && (
                      <button
                        onClick={() => setFieldRevisionOpen(isPanelOpen ? null : f.label)}
                        disabled={isThisFieldRevising || isRevising}
                        className={
                          "flex items-center gap-1 px-2 py-1 text-[11px] border transition rounded disabled:opacity-50 " +
                          (isPanelOpen ? "bg-teal-500 text-white border-teal-500" : "border-slate-200 hover:border-slate-300")
                        }
                      >
                        {isThisFieldRevising ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        修正
                      </button>
                    )}
                    <CopyBtn text={f.content} small />
                  </div>
                </div>
                <pre
                  className={`whitespace-pre-wrap break-all text-sm leading-[1.85] text-slate-900 px-4 py-3 ${
                    isThisFieldRevising ? "opacity-30" : ""
                  }`}
                  style={{ fontFamily: '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif' }}
                >
                  {f.content}
                </pre>
                {/* フィールド別の修正パネル */}
                {isPanelOpen && onReviseField && (
                  <div className="px-4 pb-4">
                    <RevisionPanel
                      open={true}
                      onClose={() => setFieldRevisionOpen(null)}
                      onApply={(instr) => {
                        onReviseField(f.label, instr);
                        setFieldRevisionOpen(null);
                      }}
                      isLoading={isThisFieldRevising}
                      accentColor="teal"
                    />
                  </div>
                )}
              </div>
            );
          })}
          {isRevising && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <div className="bg-slate-800 text-white px-4 py-2 text-sm flex items-center gap-2 rounded">
                <Loader2 className="w-4 h-4 animate-spin" /> 修正中...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PlainOutput = ({ output, loading, onChange, onRevise, isRevising }) => {
  const [revisionOpen, setRevisionOpen] = useState(false);
  if (!output && !loading) return null;
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Sparkles className="w-4 h-4 text-teal-400" />
          生成結果
        </label>
        <div className="flex gap-2">
          {output && onRevise && (
            <button
              onClick={() => setRevisionOpen(!revisionOpen)}
              disabled={isRevising}
              className={
                "flex items-center gap-1 px-3 py-1.5 text-xs border transition rounded disabled:opacity-50 " +
                (revisionOpen ? "bg-teal-500 text-white border-teal-500" : "border-slate-200 hover:border-slate-300")
              }
            >
              <Wand2 className="w-3 h-3" />
              修正指示
            </button>
          )}
          {output && <CopyBtn text={output} />}
        </div>
      </div>
      {onRevise && (
        <RevisionPanel
          open={revisionOpen}
          onClose={() => setRevisionOpen(false)}
          onApply={(instr) => {
            onRevise(instr);
            setRevisionOpen(false);
          }}
          isLoading={isRevising}
          accentColor="teal"
        />
      )}
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg relative overflow-hidden mt-2">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400" />
        {loading && !output ? (
          <div className="flex items-center gap-3 text-slate-500 text-sm py-12 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            生成中...
          </div>
        ) : (
          <textarea
            value={output}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-transparent text-sm leading-[1.9] text-slate-900 p-5 focus:outline-none resize-y min-h-[280px]"
            style={{ fontFamily: '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif' }}
            disabled={isRevising}
          />
        )}
        {isRevising && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="bg-slate-800 text-white px-4 py-2 text-sm flex items-center gap-2 rounded">
              <Loader2 className="w-4 h-4 animate-spin" /> 修正中...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ErrorBox = ({ error }) =>
  error ? (
    <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-300 rounded-md p-3 text-sm text-red-700">
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>{error}</span>
    </div>
  ) : null;

/* =========================================================================
   共通：装飾型・カラー・クロージング選択UI
   ========================================================================= */

const DECORATION_OPTIONS = [
  { id: "auto", label: "おまかせ（AIが最適な型を選択）", desc: "求人情報から最適な装飾型を自動判定" },
  { id: "multicolor_rich", label: "マルチカラー華やか型", desc: "P1型・SPECIAL POINTS枠・フル装飾" },
  { id: "multicolor_organized", label: "マルチカラー整理型", desc: "P6/P12型・カプセルカード・塗りラベル見出し" },
  { id: "blue_trust", label: "ブルー信頼型", desc: "P3型・帯見出し・医療教育向け" },
  { id: "unified_rhythm", label: "統一リズム型", desc: "P5/P8/P9/P11型・万能・色替え可能" },
  { id: "elegant_structure", label: "エレガント構造型", desc: "P2/P10型・ヒーローグラデ・美容上質系" },
  { id: "minimal_spot", label: "ミニマル・スポット型", desc: "P4/P7/P13型・装飾控えめ・堅実系" },
];

const COLOR_OPTIONS = [
  { id: "auto", label: "おまかせ（業種から自動選択）" },
  { id: "warm_orange", label: "🟧 Warm Orange（温もり・医療福祉）" },
  { id: "fresh_green", label: "🌱 Fresh Green（癒し・介護訪問）" },
  { id: "forest_green", label: "🌲 Forest Green（上品・美容大人系）" },
  { id: "navy_blue", label: "🟦 Navy Blue（プロ・高単価・稼ぎ訴求）" },
  { id: "water_blue", label: "💧 Water Blue（信頼・医療教育）" },
  { id: "warm_peach", label: "🧡 Warm Peach（復職・温かみ）" },
  { id: "sage_terracotta", label: "🍃 Sage Terracotta（エレガント）" },
  { id: "medical_multi", label: "🏥 Medical Multi（医療系ミックス）" },
];

const CLOSING_OPTIONS = [
  { id: "auto", label: "おまかせ（業種・訴求から自動選択）" },
  { id: "empathy", label: "A. 共感・不安解消型（復職/ブランク向け）" },
  { id: "ambition", label: "B. 野心・成長訴求型（高歩合/稼ぎ向け）" },
  { id: "charm_recap", label: "C. 魅力再訴求型（万能）" },
  { id: "emotional", label: "D. 情緒・感情訴求型（福祉/教育）" },
  { id: "brand", label: "E. ブランド一体型（上質/ブランド向け）" },
];

const StyleSelector = ({ decoType, setDecoType, colorTheme, setColorTheme, closingType, setClosingType }) => {
  return (
    <div className="mb-5 p-4 bg-slate-100 border border-slate-200 rounded-lg space-y-3">
      <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
        スタイル設定（装飾型・カラー・クロージング）
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">装飾型</label>
          <select
            value={decoType}
            onChange={(e) => setDecoType(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
          >
            {DECORATION_OPTIONS.map((o) => (
              <option key={o.id} value={o.id} className="bg-white">
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">カラーテーマ</label>
          <select
            value={colorTheme}
            onChange={(e) => setColorTheme(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
          >
            {COLOR_OPTIONS.map((o) => (
              <option key={o.id} value={o.id} className="bg-white">
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">クロージング</label>
          <select
            value={closingType}
            onChange={(e) => setClosingType(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
          >
            {CLOSING_OPTIONS.map((o) => (
              <option key={o.id} value={o.id} className="bg-white">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   タブ1：新規作成
   ========================================================================= */

const NewTab = () => {
  const [form, setForm] = useState({
    facility: "",
    jobType: "",
    employmentType: "正職員",
    industry: "",
    location: "",
    salary: "",
    workHours: "",
    holidays: "",
    duties: "",
    requirements: "",
    welcomed: "",
    benefits: "",
    features: "",
    targetPersona: "",
    otherNotes: "",
  });
  const [decoType, setDecoType] = useState("auto");
  const [colorTheme, setColorTheme] = useState("auto");
  const [closingType, setClosingType] = useState("auto");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upd = (k, v) => setForm({ ...form, [k]: v });

  const run = async () => {
    if (!form.facility || !form.jobType) {
      setError("最低限「事業所名」と「職種」は入力してください");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const userContent = `以下の求人情報から、ジョブメドレー管理画面の全12フィールドの原稿を新規作成してください。

【事業所名】${form.facility}
【職種】${form.jobType}
【雇用形態】${form.employmentType || "（要確認）"}
【業種カテゴリ】${form.industry || "（要確認）"}
【勤務地】${form.location || "（要確認）"}
【給与】${form.salary || "（要確認）"}
【勤務時間】${form.workHours || "（要確認）"}
【休日】${form.holidays || "（要確認）"}
【業務内容】${form.duties || "（要確認）"}
【応募資格】${form.requirements || "（要確認）"}
【歓迎要件】${form.welcomed || "（要確認）"}
【福利厚生】${form.benefits || "（要確認）"}
【事業所の特徴・強み】${form.features || "（要確認）"}
【ターゲット人材】${form.targetPersona || "（要確認）"}
【その他メモ】${form.otherNotes || "なし"}`;

      const res = await callClaudeAPI(
        buildSystemPrompt("new", decoType, colorTheme, closingType),
        userContent
      );
      setOutput(res);
    } catch (e) {
      setError("生成に失敗しました。時間をおいて再度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const [revising, setRevising] = useState(false);
  const revise = async (instruction) => {
    if (!output || !instruction) return;
    setRevising(true);
    setError("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("new", decoType, colorTheme, closingType),
        `以下のジョブメドレー原稿を、修正指示に従って改善してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の原稿】
${output}

修正指示を反映した完全版を、12フィールド全て揃った形で出力してください。`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevising(false);
    }
  };

  const [revisingField, setRevisingField] = useState(null);
  const reviseField = async (fieldLabel, instruction) => {
    if (!output || !instruction) return;
    setRevisingField(fieldLabel);
    setError("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("new", decoType, colorTheme, closingType),
        `以下のジョブメドレー原稿のうち、「${fieldLabel}」フィールドのみを修正してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の全12フィールド原稿】
${output}

【出力ルール】
- 必ず全12フィールド揃った形で出力すること
- 「${fieldLabel}」以外のフィールドは現状のまま完全に維持する
- 「${fieldLabel}」だけを修正指示に従って改善する
- ■{フィールド名}\n{内容}\n の形式を厳守`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevisingField(null);
    }
  };

  const field = (key, label, placeholder, rows = 1, required = false) => (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-teal-400 ml-1">*</span>}
      </label>
      {rows > 1 ? (
        <textarea
          value={form[key]}
          onChange={(e) => upd(key, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition resize-y"
        />
      ) : (
        <input
          value={form[key]}
          onChange={(e) => upd(key, e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed">
          求人情報を入力すると、<b className="text-teal-400">13本分析済みの装飾パターン</b>を元に、管理画面の<b className="text-teal-400">12フィールド全て</b>に即貼り付け可能な原稿を出力します。訴求文はHTML装飾付き・1行出力で管理画面の仕様に完全準拠。
        </p>
      </div>

      <StyleSelector
        decoType={decoType}
        setDecoType={setDecoType}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        closingType={closingType}
        setClosingType={setClosingType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {field("facility", "事業所名", "例：医療法人村上歯科医院", 1, true)}
        {field("jobType", "職種", "例：歯科衛生士", 1, true)}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">雇用形態</label>
          <select
            value={form.employmentType}
            onChange={(e) => upd("employmentType", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
          >
            <option className="bg-white">正職員</option>
            <option className="bg-white">契約職員</option>
            <option className="bg-white">パート・バイト</option>
            <option className="bg-white">業務委託</option>
          </select>
        </div>
        {field("industry", "業種カテゴリ", "例：歯科／美容／看護／介護／保育")}
        {field("location", "勤務地", "例：福岡県北九州市小倉北区")}
        {field("salary", "給与", "例：月給28万円〜35万円")}
        {field("workHours", "勤務時間", "例：8:45〜18:00（休憩60分）")}
        {field("holidays", "休日", "例：年間休日125日／日曜祝日休み")}
      </div>

      <div className="space-y-3">
        {field("duties", "業務内容", "例：メインテナンス60分枠／診療補助／患者担当制", 3)}
        {field("requirements", "応募資格", "例：歯科衛生士免許／未経験OK／新卒歓迎", 2)}
        {field("welcomed", "歓迎要件", "例：患者担当制の経験／接客が好きな方", 2)}
        {field("benefits", "福利厚生", "例：社保完備／交通費／昇給年1回／賞与年2回", 2)}
        {field("features", "事業所の特徴・強み", "例：メンテ60分枠／予防重視／院内全面禁煙", 3)}
        {field("targetPersona", "ターゲット人材", "例：じっくり患者と向き合いたい方", 2)}
        {field("otherNotes", "その他メモ（インタビュー素材など）", "例：推し活と両立しているスタッフがいる", 3)}
      </div>

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            全フィールドの原稿を生成
          </>
        )}
      </button>

      <FieldedOutput output={output} loading={loading} onRevise={revise} isRevising={revising} onReviseField={reviseField} revisingField={revisingField} />
    </div>
  );
};

/* =========================================================================
   タブ2：リライト（ペースト / URL両対応）
   ========================================================================= */

const RewriteTab = () => {
  const [inputMode, setInputMode] = useState("paste");
  const [pasteInput, setPasteInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [decoType, setDecoType] = useState("auto");
  const [colorTheme, setColorTheme] = useState("auto");
  const [closingType, setClosingType] = useState("auto");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");

  const isValidJobMedleyUrl = (url) => {
    try {
      const u = new URL(url);
      return u.hostname.includes("job-medley.com");
    } catch {
      return false;
    }
  };

  const run = async () => {
    setError("");
    setOutput("");

    // バリデーション
    if (inputMode === "paste" && !pasteInput.trim()) {
      setError("既存原稿をペーストしてください");
      return;
    }
    if (inputMode === "url") {
      if (!urlInput.trim()) {
        setError("URLを入力してください");
        return;
      }
      if (!isValidJobMedleyUrl(urlInput)) {
        setError("ジョブメドレーのURL（job-medley.com）を入力してください");
        return;
      }
    }

    setLoading(true);
    try {
      let sourceContent = "";

      if (inputMode === "url") {
        // URL取得：Claude APIのweb_search tool経由で取得
        setLoadingStep("URLから原稿を取得中...");
        const fetchSystem = `あなたは指定されたジョブメドレー求人ページのURLから、原稿本文（訴求文タイトル、訴求文、仕事内容、給与、勤務時間、休日、応募要件、その他）をすべて抽出するアシスタントです。
取得した原稿は整理せず、できる限り原文のまま出力してください。出力はテキストのみ。前置き・説明は不要です。`;
        const fetchUserContent = `以下のジョブメドレー求人ページから、原稿内容をすべて抽出してください：
${urlInput}`;

        sourceContent = await callClaudeAPI(fetchSystem, fetchUserContent, [
          { type: "web_search_20250305", name: "web_search" },
        ]);

        if (!sourceContent || sourceContent.length < 100) {
          throw new Error("URLから十分な原稿内容を取得できませんでした。ペーストモードをお試しください。");
        }
      } else {
        sourceContent = pasteInput;
      }

      // リライト実行
      setLoadingStep("原稿をリライト中...");
      const res = await callClaudeAPI(
        buildSystemPrompt("rewrite", decoType, colorTheme, closingType),
        `以下の既存ジョブメドレー原稿をリライトし、管理画面の全12フィールドを出力してください。

---
${sourceContent}
---`
      );
      setOutput(res);
    } catch (e) {
      setError(e.message || "生成に失敗しました。時間をおいて再度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const [revising, setRevising] = useState(false);
  const revise = async (instruction) => {
    if (!output || !instruction) return;
    setRevising(true);
    setError("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("rewrite", decoType, colorTheme, closingType),
        `以下のジョブメドレー原稿を、修正指示に従って改善してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の原稿】
${output}

修正指示を反映した完全版を、12フィールド全て揃った形で出力してください。`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevising(false);
    }
  };

  const [revisingField, setRevisingField] = useState(null);
  const reviseField = async (fieldLabel, instruction) => {
    if (!output || !instruction) return;
    setRevisingField(fieldLabel);
    setError("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("rewrite", decoType, colorTheme, closingType),
        `以下のジョブメドレー原稿のうち、「${fieldLabel}」フィールドのみを修正してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の全12フィールド原稿】
${output}

【出力ルール】
- 必ず全12フィールド揃った形で出力すること
- 「${fieldLabel}」以外のフィールドは現状のまま完全に維持する
- 「${fieldLabel}」だけを修正指示に従って改善する
- ■{フィールド名}\n{内容}\n の形式を厳守`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevisingField(null);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed">
          既存原稿を<b className="text-teal-400">テキストペースト</b>または<b className="text-teal-400">URL指定</b>のどちらからでもリライト可能。既存の数字・固有名詞は保持したまま、装飾・構成・訴求力を強化します。
        </p>
      </div>

      {/* 入力モード切替 */}
      <div className="mb-4">
        <div className="flex gap-2 bg-slate-100 border border-slate-200 rounded-md p-1 w-fit">
          <button
            onClick={() => setInputMode("paste")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition ${
              inputMode === "paste" ? "bg-teal-500 text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <Clipboard className="w-3 h-3" />
            原稿ペースト
          </button>
          <button
            onClick={() => setInputMode("url")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition ${
              inputMode === "url" ? "bg-teal-500 text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL指定
          </button>
        </div>
      </div>

      <StyleSelector
        decoType={decoType}
        setDecoType={setDecoType}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        closingType={closingType}
        setClosingType={setClosingType}
      />

      {/* 入力エリア */}
      {inputMode === "paste" ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <FileText className="w-4 h-4 text-teal-400" />
              既存原稿をペースト
            </label>
            <span className="text-xs text-slate-500">{pasteInput.length.toLocaleString()} 文字</span>
          </div>
          <textarea
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="既存のジョブメドレー原稿をここにペースト..."
            className="w-full h-56 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition resize-y"
          />
        </div>
      ) : (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
            <LinkIcon className="w-4 h-4 text-teal-400" />
            ジョブメドレー掲載URL
          </label>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://job-medley.com/..."
            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition"
          />
          <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500">
            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0 text-amber-500" />
            <span>
              ページ取得に10〜30秒ほどかかります。取得失敗時は「原稿ペースト」モードをご利用ください。
            </span>
          </div>
        </div>
      )}

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingStep || "処理中..."}
          </>
        ) : (
          <>
            <PenLine className="w-4 h-4" />
            フィールド別にリライト
          </>
        )}
      </button>

      <FieldedOutput output={output} loading={loading} onRevise={revise} isRevising={revising} onReviseField={reviseField} revisingField={revisingField} />
    </div>
  );
};

/* =========================================================================
   タブ3：キャッチコピー
   ========================================================================= */

const CatchTab = () => {
  const [input, setInput] = useState("");
  const [colorTheme, setColorTheme] = useState("auto");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!input.trim()) {
      setError("訴求素材を入力してください");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("catch", "auto", colorTheme, "auto"),
        `以下の情報から、訴求軸の異なる3案の訴求文タイトルを生成してください。\n\n${input}`
      );
      setOutput(res);
    } catch (e) {
      setError("生成に失敗しました。時間をおいて再度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const [revising, setRevising] = useState(false);
  const revise = async (instruction) => {
    if (!output || !instruction) return;
    setRevising(true);
    setError("");
    try {
      const res = await callClaudeAPI(
        buildSystemPrompt("catch", "auto", colorTheme, "auto"),
        `以下の訴求文タイトル候補を、修正指示に従って改善してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の候補】
${output}

修正指示を反映した訴求文タイトル3案を再生成してください。`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevising(false);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed">
          事業所の魅力・数字を箇条書きで入力すると、訴求軸の異なる3案の「訴求文タイトル」を生成します。
        </p>
      </div>

      <div className="mb-4 p-4 bg-slate-100 border border-slate-200 rounded-lg">
        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">
          カラーテーマ（絵文字セット選択）
        </label>
        <select
          value={colorTheme}
          onChange={(e) => setColorTheme(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
        >
          {COLOR_OPTIONS.map((o) => (
            <option key={o.id} value={o.id} className="bg-white">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
        <Zap className="w-4 h-4 text-teal-400" />
        訴求素材
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`例：\n・職種：歯科衛生士（正職員）\n・月給28万円〜\n・メンテナンス60分枠\n・年間休日125日以上\n・祝日振替なし\n・未経験OK・新卒歓迎`}
        className="w-full h-52 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition resize-y"
      />

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading || !input.trim()}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            訴求文タイトルを3案生成
          </>
        )}
      </button>

      <PlainOutput output={output} loading={loading} onChange={setOutput} onRevise={revise} isRevising={revising} />
    </div>
  );
};

/* =========================================================================
   タブ4：フィールド別生成・編集
   ========================================================================= */

const OUTPUT_FIELDS = [
  { id: "title", label: "訴求文タイトル", required: true, hint: "絵文字＋具体数字アンカー＋｜／区切りで1〜2行" },
  { id: "body", label: "訴求文（HTML装飾・1行）", required: true, hint: "★1行HTML出力★タグ間改行なし・装飾パターン適用" },
  { id: "duties", label: "仕事内容", required: true, hint: "✅/▷で5〜8項目。パート・業務委託は雇用期間等を明記" },
  { id: "salaryNote", label: "給与の備考", required: false, hint: "試用期間・昇給・手当・固定残業代等" },
  { id: "benefits", label: "待遇", required: false, hint: "社保・賞与・交通費・退職金・独自手当" },
  { id: "training", label: "教育体制・研修", required: false, hint: "入職後研修、OJT、資格取得支援" },
  { id: "hours", label: "勤務時間・休憩時間", required: true, hint: "始業〜終業・休憩・シフト・働き方のポイント" },
  { id: "holiday", label: "休日", required: true, hint: "週休形態・年間休日数・希望休" },
  { id: "longHoliday", label: "長期休暇・特別休暇", required: false, hint: "有給・年末年始・夏季・特別有給" },
  { id: "requirements", label: "応募要件", required: true, hint: "✅必須条件＋✅こんな方にピッタリ" },
  { id: "welcomed", label: "歓迎要件", required: false, hint: "✅優遇経験＋✅免許スキル＋✅歓迎マインド" },
  { id: "selection", label: "選考プロセス", required: true, hint: "ステップ1〜5形式" },
];

const SectionTab = () => {
  const [fieldId, setFieldId] = useState("title");
  const [materials, setMaterials] = useState("");
  const [existing, setExisting] = useState("");
  const [decoType, setDecoType] = useState("auto");
  const [colorTheme, setColorTheme] = useState("auto");
  const [closingType, setClosingType] = useState("auto");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentField = OUTPUT_FIELDS.find((f) => f.id === fieldId);
  const isAppealBody = fieldId === "body";

  const run = async () => {
    if (!materials.trim() && !existing.trim()) {
      setError("素材情報または既存フィールドのどちらかを入力してください");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      let userContent = `対象フィールド：${currentField.label}
このフィールドの特徴：${currentField.hint}
必須：${currentField.required ? "はい" : "いいえ"}
${isAppealBody ? "\n★★このフィールドは訴求文HTML。必ず1行で出力。タグ間・属性間で改行しない。★★\n" : ""}
`;
      if (existing.trim()) {
        userContent += `【既存のこのフィールド】\n${existing}\n\n上記を改善してください。\n`;
      }
      if (materials.trim()) {
        userContent += `\n【追加の素材情報】\n${materials}\n`;
      }
      if (!existing.trim()) {
        userContent += `\nこのフィールドを新規生成してください。\n`;
      }
      userContent += `\n※このフィールドのみの内容を出力。フィールド区切り記号（━や■）は不要。`;

      const res = await callClaudeAPI(
        buildSystemPrompt("section", decoType, colorTheme, closingType),
        userContent
      );
      setOutput(res);
    } catch (e) {
      setError("生成に失敗しました。時間をおいて再度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed">
          管理画面の12フィールドから1つ選び、部分的に生成または既存内容の改善を行います。
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">対象フィールド</label>
        <div className="relative">
          <select
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-200 rounded-md px-3 py-2.5 pr-9 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
          >
            {OUTPUT_FIELDS.map((f) => (
              <option key={f.id} value={f.id} className="bg-white">
                ■ {f.label}
                {f.required ? "（必須）" : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
        <p className="mt-1.5 text-[11px] text-teal-600">▸ {currentField.hint}</p>
        {isAppealBody && (
          <div className="mt-2 flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-100 border border-amber-300 rounded-md px-2.5 py-2">
            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>
              訴求文フィールドは<b>1行HTMLで出力</b>されます（ジョブメドレー仕様）。そのままコピーしてください。
            </span>
          </div>
        )}
      </div>

      {isAppealBody && (
        <StyleSelector
          decoType={decoType}
          setDecoType={setDecoType}
          colorTheme={colorTheme}
          setColorTheme={setColorTheme}
          closingType={closingType}
          setClosingType={setClosingType}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
            <Plus className="w-3 h-3" />
            素材情報（新規作成用）
          </label>
          <textarea
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="事業所情報・数字・魅力を箇条書きで..."
            className="w-full h-44 bg-white border border-slate-200 rounded-md p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition resize-y"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
            <Edit3 className="w-3 h-3" />
            既存フィールド（リライト用／省略可）
          </label>
          <textarea
            value={existing}
            onChange={(e) => setExisting(e.target.value)}
            placeholder="既存のこのフィールドをペースト..."
            className="w-full h-44 bg-white border border-slate-200 rounded-md p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition resize-y"
          />
        </div>
      </div>

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Layers className="w-4 h-4" />
            このフィールドを生成
          </>
        )}
      </button>

      <PlainOutput output={output} loading={loading} onChange={setOutput} onRevise={revise} isRevising={revising} />
    </div>
  );
};

/* =========================================================================
   タブ5：スカウトメール生成（ジョブメドレー求人原稿 → スカウトメール変換）
   ========================================================================= */

const SCOUT_SYSTEM_PROMPT = `あなたはジョブメドレーのスカウトメール作成の専門家です。
求人原稿の情報を元に、以下の「スカウトメール型」に当てはめてスカウトメール文面を作成してください。

【スカウトメール型】

①タイトル行（キャッチコピー）
- 絵文字で装飾（🌸✨💰🏃など）
- 給与・職種の魅力・働き方の3要素を1行に凝縮
- 目を引く数字（月給額など）を先頭付近に配置

②サブキャッチ（1〜2行）
- 「✅」で始める
- 応募ハードルを下げるフレーズ（ブランクOK、未経験OKなど）
- 施設の独自性・差別化ポイントをセットで提示
- 絵文字は末尾に1つ程度（🌱など）

③条件一覧（✓箇条書き）
以下の順番で記載：
 ✓給与：月給○○円～○○円（条件があれば補足）💰
 ✓休日：週休パターン／希望休の可否
 ✓勤務：勤務時間帯（休憩含む）
 ✓業務：主な業務内容を簡潔に列挙
 ✓待遇：社保・賞与・交通費・その他福利厚生✨
 ✓安心材料：フォロー体制・研修など

④クロージング（CTA）
- 「少しでも気になった方は、ぜひジョブメドレーの求人原稿をチェックしてみてください😊✨」

【ルール】
- 「｜」「／」で情報を区切り、1行に複数情報を詰め込む
- 不安払拭ワード（ブランクOK、未経験OK、フォローありなど）を冒頭と末尾の両方に配置
- 具体的な数字を必ず入れる（月給額、勤務時間、対象人数など）
- 原稿に記載のない情報は絶対に捏造しない
- 原稿から読み取れる情報のみで構成する`;

const ScoutMailTab = () => {
  const [inputMode, setInputMode] = useState("paste");
  const [pasteInput, setPasteInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");

  const isValidJobMedleyUrl = (url) => {
    try {
      const u = new URL(url);
      return u.hostname.includes("job-medley.com");
    } catch {
      return false;
    }
  };

  const run = async () => {
    setError("");
    setOutput("");

    if (inputMode === "paste" && !pasteInput.trim()) {
      setError("求人原稿をペーストしてください");
      return;
    }
    if (inputMode === "url") {
      if (!urlInput.trim()) {
        setError("URLを入力してください");
        return;
      }
      if (!isValidJobMedleyUrl(urlInput)) {
        setError("ジョブメドレーのURL（job-medley.com）を入力してください");
        return;
      }
    }

    setLoading(true);
    try {
      let sourceContent = "";

      if (inputMode === "url") {
        setLoadingStep("URLから原稿を取得中...");
        const fetchSystem = `あなたは指定されたジョブメドレー求人ページのURLから、原稿本文（訴求文タイトル、訴求文、仕事内容、給与、勤務時間、休日、応募要件、その他）をすべて抽出するアシスタントです。取得した原稿は整理せず、原文のまま出力してください。出力はテキストのみ。前置き・説明は不要です。`;
        const fetchUserContent = `以下のジョブメドレー求人ページから、原稿内容をすべて抽出してください：
${urlInput}`;

        sourceContent = await callClaudeAPI(fetchSystem, fetchUserContent, [
          { type: "web_search_20250305", name: "web_search" },
        ]);

        if (!sourceContent || sourceContent.length < 100) {
          throw new Error("URLから十分な原稿内容を取得できませんでした。ペーストモードをお試しください。");
        }
      } else {
        sourceContent = pasteInput;
      }

      setLoadingStep("スカウトメールを生成中...");
      const res = await callClaudeAPI(
        SCOUT_SYSTEM_PROMPT,
        `以下のジョブメドレー求人原稿をスカウトメール型に変換してください。

---
${sourceContent}
---`
      );
      setOutput(res);
    } catch (e) {
      setError(e.message || "生成に失敗しました。時間をおいて再度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const [revising, setRevising] = useState(false);
  const revise = async (instruction) => {
    if (!output || !instruction) return;
    setRevising(true);
    setError("");
    try {
      const res = await callClaudeAPI(
        SCOUT_SYSTEM_PROMPT,
        `以下のスカウトメール文面を、修正指示に従って改善してください。

【★修正指示（最優先で反映）★】
${instruction}

【現在の文面】
${output}

修正指示を反映したスカウトメール文面を、4ブロック（キャッチコピー / サブキャッチ / ✓条件一覧 / CTA）の構成で出力してください。`
      );
      setOutput(res);
    } catch (e) {
      setError("修正に失敗しました: " + (e.message || ""));
    } finally {
      setRevising(false);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed">
          ジョブメドレー求人原稿を<b className="text-teal-700">テキストペースト</b>または<b className="text-teal-700">URL指定</b>のどちらからでも、スカウトメール文面に変換します。
        </p>
      </div>

      {/* 入力モード切替 */}
      <div className="mb-4">
        <div className="flex gap-2 bg-slate-100 border border-slate-200 rounded-md p-1 w-fit">
          <button
            onClick={() => setInputMode("paste")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition ${
              inputMode === "paste" ? "bg-teal-500 text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <Clipboard className="w-3 h-3" />
            原稿ペースト
          </button>
          <button
            onClick={() => setInputMode("url")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition ${
              inputMode === "url" ? "bg-teal-500 text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL指定
          </button>
        </div>
      </div>

      {/* 入力エリア */}
      {inputMode === "paste" ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <FileText className="w-4 h-4 text-teal-600" />
              求人原稿を貼り付け
            </label>
            <span className="text-xs text-slate-500">{pasteInput.length.toLocaleString()} 文字</span>
          </div>
          <textarea
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="ジョブメドレーの求人原稿をここにペーストしてください。&#10;&#10;例：職種、給与、勤務時間、仕事内容、応募要件など"
            className="w-full h-56 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 ring-teal-200 transition resize-y"
          />
        </div>
      ) : (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
            <LinkIcon className="w-4 h-4 text-teal-600" />
            ジョブメドレー掲載URL
          </label>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://job-medley.com/..."
            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 ring-teal-200 transition"
          />
          <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500">
            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0 text-amber-500" />
            <span>
              ページ取得に10〜30秒ほどかかります。取得失敗時は「原稿ペースト」モードをご利用ください。
            </span>
          </div>
        </div>
      )}

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingStep || "処理中..."}
          </>
        ) : (
          <>
            <Mail className="w-4 h-4" />
            スカウトメールを生成
          </>
        )}
      </button>

      <PlainOutput output={output} loading={loading} onChange={setOutput} onRevise={revise} isRevising={revising} />
    </div>
  );
};

/* =========================================================================
   【エアワーク機能】定数・プロンプト・コンポーネント
   ========================================================================= */

const AIRWORK_PATTERNS = {
  A: {
    name: "A：✅羅列型",
    tagline: "シンプル・ストレート",
    bestFor: "条件重視",
    templateExample: "✅ 月給250,000円〜高収入！\n✅ 年間休日120日◎\n✅ 少人数制\n\\\\ 具体的な仕事内容 //\n[本文]",
  },
  B: {
    name: "B：装飾線挟み型",
    tagline: "ビジュアル重視",
    bestFor: "雰囲気訴求",
    templateExample: "✼┈┈┈ここがPoint┈┈┈✼\n✅ ポイント1\n✼┈┈┈┈┈┈┈┈┈┈┈✼\n✨ [施設名]について",
  },
  C: {
    name: "C：＼挟む＋✅型",
    tagline: "バランス型",
    bestFor: "営業・接客",
    templateExample: "＼営業未経験が8割以上／\n✅ 月給30万\n✅ ノルマなし\n[本文]",
  },
  D: {
    name: "D：【】見出し連続型",
    tagline: "物語性",
    bestFor: "未経験歓迎",
    templateExample: "【この仕事、一言で言うと？】\n[短文]\n【この求人のポイント】\n✅ ポイント1",
  },
};

const AIRWORK_TONES = {
  friendly: { label: "親しみやすい", emoji: "😊", description: "やわらかく距離感近め" },
  polite: { label: "丁寧・誠実", emoji: "🎩", description: "きちんとした印象" },
  passionate: { label: "熱い", emoji: "🔥", description: "前のめりに訴求" },
  calm: { label: "落ち着いた", emoji: "🌿", description: "大人向け・プロ" },
};

const AIRWORK_APPEAL_OPTIONS = [
  "高収入",
  "未経験歓迎",
  "週休2日",
  "残業少なめ",
  "福利厚生充実",
  "駅近",
  "車通勤OK",
  "ブランクOK",
  "キャリアアップ",
  "育児両立",
  "チームワーク重視",
  "少人数制",
];

const AIRWORK_SECTION_CONFIG = {
  // ===== ステップ1：募集概要 =====
  jobTitleText: { label: "職種名（30文字以内）", icon: Feather, step: 1, isTitle: true, maxLength: 30 },
  mainContent: { label: "仕事内容（メイン本文）", icon: FileText, step: 1, isLarge: true },
  requiredProfile: { label: "求める人材", icon: Users, step: 1, isLarge: true },
  title: { label: "求人キャッチコピー（30文字以内）", icon: Feather, step: 1, isTitle: true, maxLength: 30 },
  // ===== ステップ2：雇用条件 =====
  salary: { label: "給与・基本給", icon: DollarSign, step: 2 },
  salaryDetail: { label: "給与の補足説明", icon: DollarSign, step: 2, isLarge: true },
  workHours: { label: "勤務時間・シフト補足説明", icon: Clock, step: 2, isLarge: true },
  holidays: { label: "休日・休暇の補足説明", icon: Calendar, step: 2, isLarge: true },
  benefits: { label: "福利厚生の補足説明", icon: Heart, step: 2, isLarge: true },
  // ===== ステップ3：応募・選考 =====
  selectionProcess: { label: "選考についての補足説明", icon: ChevronRight, step: 3, isLarge: true },
};

/* === Airwork 管理画面のタグ選択肢（実際の画面から抽出） === */
const AIRWORK_TAG_OPTIONS = {
  // 仕事内容の特徴（2択トグル）
  jobFeatures: {
    label: "仕事内容の特徴",
    type: "toggle",
    step: 1,
    items: [
      { key: "customerInteraction", label: "お客様との対話", options: ["多い", "少ない"] },
      { key: "workStyle", label: "仕事のスタイル", options: ["立ち仕事が多い", "デスクワークが多い"] },
      { key: "environment", label: "仕事の環境", options: ["室外が多い", "室内が多い"] },
      { key: "location", label: "勤務地", options: ["いろんな勤務地で働く", "固定の勤務地で働く"] },
      { key: "taskStyle", label: "業務のスタイル", options: ["マニュアルに従う", "創意工夫が求められる"] },
      { key: "physicalWork", label: "力仕事", options: ["多い", "少ない"] },
      { key: "teamWork", label: "作業内容", options: ["チーム作業が多い", "1人作業が多い"] },
    ],
  },
  // 勤務地の特徴
  locationFeatures: {
    label: "勤務地の特徴",
    type: "multi",
    step: 1,
    items: ["送迎あり", "車通勤OK", "バイク通勤OK", "駅ナカ", "駅近5分以内", "転勤なし", "在宅OK"],
  },
  // 職場環境（大量のタグ）
  workplaceTags: {
    label: "職場環境",
    type: "multi",
    step: 1,
    items: [
      "英語", "オープニングスタッフ", "服装自由", "髪型・髪色自由", "制服あり",
      "主婦・主夫歓迎", "学歴不問", "フリーター歓迎", "ブランクOK", "ひげOK",
      "ネイルOK", "ピアスOK", "経験者歓迎", "有資格者歓迎", "管理職・マネジメント経験歓迎",
      "第二新卒歓迎", "業界未経験歓迎", "中途入社50%以上", "女性が活躍中", "女性管理職登用あり",
      "管理職・マネジャー採用", "中国語", "経験不問", "未経験者歓迎", "ノルマなし",
      "ランチタイム", "知識不要", "経験不要", "要知識", "要経験",
      "20代が多い", "30代が多い", "40代が多い", "50代が多い", "60代が多い", "70代以上が多い",
    ],
  },
  // 勤務形態・勤務時間の特徴
  workTimeFeatures: {
    label: "勤務形態・勤務時間の特徴",
    type: "multi",
    step: 2,
    items: [
      "残業なし", "長期歓迎", "早朝", "午前", "夕方", "深夜", "夜間",
      "月平均残業時間20時間以内", "原則定時退社", "時短勤務あり",
    ],
  },
  // 休日・休暇（タグ選択）
  holidayFeatures: {
    label: "休日・休暇タグ",
    type: "multi",
    step: 2,
    items: ["長期休暇あり", "年間休日120日以上", "完全週休2日制", "介護休暇あり", "育休あり", "土日祝休み"],
  },
  // 給与の特徴
  salaryFeatures: {
    label: "給与の特徴",
    type: "multi",
    step: 2,
    items: [
      "日払いOK", "週払いOK", "高収入", "賞与あり", "ストックオプションあり",
      "歩合給あり", "固定給25万円以上", "固定給35万円以上",
    ],
  },
  // 社会保険
  socialInsurance: {
    label: "社会保険",
    type: "multi",
    step: 2,
    items: ["健康保険", "厚生年金保険", "雇用保険", "労災保険"],
  },
  // 福利厚生
  benefitsTags: {
    label: "福利厚生",
    type: "multi",
    step: 2,
    items: [
      "入社祝い金あり", "託児所あり", "交通費支給", "社割あり", "研修あり",
      "副業・WワークOK", "家賃無料", "住宅手当あり", "寮・社宅あり", "食事補助あり",
      "まかないあり", "昼食補助あり", "食費補助あり", "資格取得支援あり", "退職金あり",
      "インセンティブあり", "資格取得手当あり", "通勤交通費全額支給",
    ],
  },
  // 選考の流れ
  selectionFeatures: {
    label: "選考の流れタグ",
    type: "multi",
    step: 3,
    items: ["60代も応募可", "70代も応募可", "履歴書不要", "友達と応募OK", "職場見学可", "面接1回"],
  },
};

function buildAirworkInputSection({ mode, formData, pasteContent }) {
  return mode === "form"
    ? `会社名:${formData.companyName || "?"} 事業所:${formData.branchName || "?"} 雇用形態:${
        formData.employmentType || "正社員"
      } 職種:${formData.jobTitle || "?"} 業界:${formData.industry || "?"} 給与:${
        formData.salary || "?"
      } 勤務地:${formData.location || "?"} 勤務時間:${formData.workHours || "?"} 休日:${
        formData.holidays || "?"
      } 福利厚生:${formData.benefits || "?"} 仕事内容:${formData.jobDescription || "?"} 求める人材:${
        formData.requirements || "?"
      } 1日の流れ:${formData.dailySchedule || "?"} 特記:${formData.notes || "?"}`
    : pasteContent || "";
}

function buildAirworkBaseRules({ pattern, tone, appeals }) {
  const p = AIRWORK_PATTERNS[pattern];
  const t = AIRWORK_TONES[tone];
  const ap = appeals.length > 0 ? `\n訴求ポイント: ${appeals.join("/")}` : "";
  return `Airwork求人原稿プロライター。パターン${pattern}:${p.name}(${p.tagline}) トーン:${t.label}(${t.description})${ap}

=== 共通ルール ===
- 装飾記号（✅✨✼┈╲╱【】◎｜）を自然に使う
- 1日のスケジュールは「10:00｜業務」の形式
- 文末は応募したくなる書き方

=== キャッチコピーのルール（titleフィールド）===
★ 25〜30文字（30文字ギリギリを狙え。20文字以下は絶対ダメ）
★ 雇用形態・職種名は絶対に書くな

【思考プロセス】
1.この求人の「一番おいしい事実」は何か
2.それを求職者の「日常の実感」に変換
3.「え、マジ？」「自分のことだ」と思わせる引っかかりを仕込む
4.声に出してリズムが気持ちいいか確認

【6つの必殺技法（いずれか必ず使え）】
(1)生活シーン変換: 条件→帰宅後・休日の具体シーン「18時には家。録画したドラマ、その日に観れます。」
(2)常識破壊: 前提をひっくり返す「ノルマなし。だから売れるんです。」
(3)本音ぶっちゃけ: 求職者の心の声を代弁「転職サイト見すぎて、もう何がいいかわからない人へ。」
(4)一行ストーリー: 過去→現在を圧縮「"もう介護はやらない"と言った私が、まだここにいる理由。」
(5)数字×感情: 数字に感情接続「入社2年で年収150万上がった。努力じゃなくて、仕組みです。」
(6)語りかけ: 読者に直接話す「いま何社目のページですか？最後にしません？」

【NG】やりがい/成長/活躍/輝く/夢/充実/アットホーム/笑顔/感謝/仲間。「〜しませんか？」「〜な仕事です」系テンプレ構文。条件箇条書き風。

=== 情報網羅ルール ===
★ 入力情報は1つも漏らさず反映。入力にない情報は創作しない。`;
}

function buildAirworkFullPrompt(inputs) {
  // タグオプションをテキスト化
  const tagOptionsText = Object.entries(AIRWORK_TAG_OPTIONS)
    .map(([key, cfg]) => {
      if (cfg.type === "toggle") {
        const items = cfg.items.map((i) => `${i.label}[${i.options.join("/")}]`).join(", ");
        return `${cfg.label}（いずれか1つ選択）: ${items}`;
      }
      return `${cfg.label}: ${cfg.items.join(" / ")}`;
    })
    .join("\n");

  return `${buildAirworkBaseRules(inputs)}

${buildAirworkInputSection(inputs)}

=== Airwork管理画面のタグ選択肢 ===
${tagOptionsText}

パターン${inputs.pattern}でAirwork原稿を作成。
入力情報から読み取れる範囲で、各テキストフィールドを作成し、上記タグから該当するものを推奨してください。
全情報を反映。JSON形式のみ返せ:
{
  "jobTitleText": "職種名（30文字以内。業務内容が分かる簡潔な名称。例：事務職（総務・経理・営業事務））",
  "title": "求人キャッチコピー。25-30文字。6技法使用。雇用形態・職種名禁止",
  "mainContent": "仕事内容メイン本文。パターン${inputs.pattern}の装飾使用。1日の流れ含む完全版",
  "requiredProfile": "求める人材。◎こんな方、特に歓迎 や ◎こんな気持ち、ありませんか？など装飾見出し付き",
  "salary": "給与・基本給の概要（給与形態・金額範囲・手当など）",
  "salaryDetail": "給与の補足説明。✨給与・収入について の装飾見出し付き、昇給・賞与・手当の内訳を詳細に",
  "workHours": "勤務時間・シフト・最低勤務期間の補足説明。✨勤務時間について の装飾見出し付き",
  "holidays": "休日・休暇の補足説明。✨休日・休暇について の装飾見出し付き、長期休暇の内訳も",
  "benefits": "福利厚生の補足説明。✨福利厚生・サポート制度 の装飾見出し付き、研修・成長サポートも",
  "selectionProcess": "選考についての補足説明。✨選考の流れ の装飾見出し付き、①応募・書類選考→②面接→③内定・入社のご相談 等",
  "featureTags": ["特徴タグ5-8個"],
  "workplaceTagsAI": ["職場環境タグ（上記の職場環境項目から該当するもの、原稿の内容に合わせて推奨）"],
  "locationFeaturesAI": ["勤務地の特徴タグ（上記項目から該当）"],
  "workTimeFeaturesAI": ["勤務形態・勤務時間の特徴タグ（上記項目から該当）"],
  "holidayFeaturesAI": ["休日・休暇タグ（上記項目から該当）"],
  "salaryFeaturesAI": ["給与の特徴タグ（上記項目から該当）"],
  "benefitsTagsAI": ["福利厚生タグ（上記項目から該当）"],
  "selectionFeaturesAI": ["選考の流れタグ（上記項目から該当）"],
  "socialInsuranceAI": ["社会保険タグ（上記項目から該当。雇用形態が正社員なら通常は全て該当）"],
  "jobFeaturesAI": {
    "customerInteraction": "多い または 少ない",
    "workStyle": "立ち仕事が多い または デスクワークが多い",
    "environment": "室外が多い または 室内が多い",
    "location": "いろんな勤務地で働く または 固定の勤務地で働く",
    "taskStyle": "マニュアルに従う または 創意工夫が求められる",
    "physicalWork": "多い または 少ない",
    "teamWork": "チーム作業が多い または 1人作業が多い"
  }
}`;
}

function buildAirworkSectionPrompt(section, inputs, existingOutput, revisionInstruction = "") {
  const others = Object.entries(existingOutput || {})
    .filter(([k]) => k !== section)
    .map(([k, v]) => `${AIRWORK_SECTION_CONFIG[k]?.label || k}: ${Array.isArray(v) ? v.join(",") : String(v).slice(0, 100)}`)
    .join("\n");
  const instructions = {
    title: "キャッチコピー1つ。25-30文字(30文字ギリギリ)。雇用形態・職種名禁止。6技法を使え。",
    mainContent: `仕事内容メイン本文。パターン${inputs.pattern}の装飾使用。1日の流れ含む完全版。`,
    requiredProfile: "求める人材。必須・歓迎・人物像。",
    salary: "給与セクション。入力全反映。",
    workHours: "勤務時間セクション。",
    holidays: "休日・休暇セクション。入力全反映。",
    benefits: "福利厚生・社会保険。入力全反映。",
    location: "勤務地・アクセス。",
    selectionProcess: "選考プロセス。",
    featureTags: "特徴タグ5-8個。",
    workplaceTags: "職場環境タグ5-10個。",
  };
  const isArr = section === "featureTags" || section === "workplaceTags";
  const currentContent = existingOutput?.[section];
  const revisionPart = revisionInstruction
    ? `\n\n【★修正指示（最優先で反映）★】\n${revisionInstruction}\n\n【現在の内容】\n${Array.isArray(currentContent) ? currentContent.join(",") : String(currentContent || "")}\n\n上記の修正指示を反映して、現在の内容を改善してください。`
    : "";
  return `${buildAirworkBaseRules(inputs)}\n\n${buildAirworkInputSection(inputs)}\n\n既存セクション:\n${others}\n\n作成: ${
    instructions[section] || section
  }${revisionPart}\nJSON形式のみ:\n${isArr ? `{"${section}":["..."]}` : `{"${section}":"..."}`}`;
}

async function callAirworkAPI(prompt, maxTokens = 4000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error("APIエラー: " + res.status);
  const data = await res.json();
  const text = data.content
    .filter((i) => i.type === "text")
    .map((i) => i.text)
    .join("\n");
  let c = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const f = c.indexOf("{"),
    l = c.lastIndexOf("}");
  if (f !== -1 && l !== -1) c = c.substring(f, l + 1);
  return JSON.parse(c);
}

/* エアワーク：各セクション表示コンポーネント */
const AirworkOutputSection = ({ label, Icon, content, onCopy, copied, onRegenerate, onRevise, isRegenerating, isLarge, isTitle, accentColor = "rose" }) => {
  const [revisionOpen, setRevisionOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs uppercase font-bold text-rose-700 tracking-wider">
          <Icon className="w-4 h-4" /> {label}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1 px-3 py-1 text-xs border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 disabled:opacity-50 transition rounded"
          >
            {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            {isRegenerating ? "再生成中" : "再生成"}
          </button>
          {onRevise && (
            <button
              onClick={() => setRevisionOpen(!revisionOpen)}
              disabled={isRegenerating}
              className={
                "flex items-center gap-1 px-3 py-1 text-xs border transition rounded disabled:opacity-50 " +
                (revisionOpen ? "bg-rose-700 text-white border-rose-700" : "border-slate-200 hover:border-slate-300")
              }
            >
              <Wand2 className="w-3 h-3" />
              修正指示
            </button>
          )}
          <button
            onClick={onCopy}
            className={
              "flex items-center gap-1 px-3 py-1 text-xs border transition rounded " +
              (copied ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 hover:border-slate-300")
            }
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "コピー済" : "コピー"}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre
          className="p-4 border border-slate-300 bg-amber-50 rounded text-sm whitespace-pre-wrap overflow-x-auto text-slate-900"
          style={{
            fontFamily: 'inherit',
            lineHeight: 1.8,
            minHeight: isLarge ? "200px" : "auto",
            fontSize: isTitle ? "16px" : "14px",
            fontWeight: isTitle ? 700 : 400,
            opacity: isRegenerating ? 0.3 : 1,
          }}
        >
          {content}
        </pre>
        {isTitle && (
          <div className="mt-1 text-right">
            <span
              className={
                "text-xs px-2 py-0.5 rounded " +
                (content.length <= 30 && content.length > 0
                  ? content.length >= 25
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800")
              }
            >
              {content.length}文字{" "}
              {content.length > 30
                ? "（30文字超過）"
                : content.length >= 25
                ? "✓"
                : content.length === 0
                ? ""
                : "（短い）"}
            </span>
          </div>
        )}
        {isRegenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-800 text-white px-4 py-2 text-sm flex items-center gap-2 rounded">
              <Loader2 className="w-4 h-4 animate-spin" /> 再生成中...
            </div>
          </div>
        )}
      </div>
      {onRevise && (
        <RevisionPanel
          open={revisionOpen}
          onClose={() => setRevisionOpen(false)}
          onApply={(instr) => {
            onRevise(instr);
            setRevisionOpen(false);
          }}
          isLoading={isRegenerating}
          accentColor={accentColor}
        />
      )}
    </div>
  );
};

const AirworkTagBlock = ({ title, tags, onCopy, copied, onRegenerate, isRegenerating }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs uppercase font-bold text-rose-700 tracking-wider">
          <Tag className="w-4 h-4" /> {title}
        </div>
        <div className="flex gap-1">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1 px-2 py-1 text-xs border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 disabled:opacity-50 rounded"
          >
            {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          </button>
          <button
            onClick={onCopy}
            className={
              "flex items-center gap-1 px-2 py-1 text-xs border rounded " +
              (copied ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200")
            }
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className="p-3 border border-slate-300 bg-amber-50 rounded flex flex-wrap gap-1"
          style={{ opacity: isRegenerating ? 0.3 : 1 }}
        >
          {tags.map((t, i) => (
            <span key={i} className="px-2 py-1 text-xs bg-amber-100 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* エアワーク：マルチセレクトタグ（AI推奨＋ユーザー微調整可） */
const AirworkMultiTagBlock = ({ label, allItems, aiRecommended, selected, onChange, onCopy, copied }) => {
  const toggle = (item) => {
    if (selected.includes(item)) onChange(selected.filter((x) => x !== item));
    else onChange([...selected, item]);
  };
  const isAI = (item) => aiRecommended?.includes(item);

  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs uppercase font-bold text-rose-700 tracking-wider">
          <Tag className="w-4 h-4" /> {label}
          <span className="text-[10px] text-slate-500 normal-case font-normal">
            （{selected.length}件選択中・AI推奨{aiRecommended?.length || 0}件）
          </span>
        </div>
        <button
          onClick={onCopy}
          className={
            "flex items-center gap-1 px-2 py-1 text-xs border rounded transition " +
            (copied ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 hover:border-slate-300")
          }
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "コピー済" : "選択中をコピー"}
        </button>
      </div>
      <div className="p-3 border border-slate-300 bg-white rounded flex flex-wrap gap-1.5">
        {allItems.map((item, i) => {
          const isSelected = selected.includes(item);
          const recommended = isAI(item);
          return (
            <button
              key={i}
              onClick={() => toggle(item)}
              className={
                "px-2.5 py-1 text-xs border rounded transition relative " +
                (isSelected
                  ? "bg-rose-700 text-white border-rose-700"
                  : recommended
                  ? "bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300")
              }
              title={recommended ? "AI推奨項目" : ""}
            >
              {recommended && !isSelected && <span className="text-amber-600 mr-0.5">★</span>}
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* エアワーク：2択トグルブロック（仕事内容の特徴など） */
const AirworkToggleBlock = ({ label, items, values, onChange }) => {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase font-bold text-rose-700 tracking-wider mb-2">
        <Tag className="w-4 h-4" /> {label}
        <span className="text-[10px] text-slate-500 normal-case font-normal">（AIが原稿から推奨・クリックで変更可）</span>
      </div>
      <div className="p-3 border border-slate-300 bg-white rounded space-y-2">
        {items.map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="text-xs text-slate-700 font-semibold min-w-[120px]">{row.label}</div>
            <div className="flex gap-1 flex-wrap">
              {row.options.map((opt) => {
                const isSelected = values?.[row.key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onChange({ ...values, [row.key]: isSelected ? "" : opt })}
                    className={
                      "px-3 py-1 text-xs border rounded transition " +
                      (isSelected
                        ? "bg-rose-700 text-white border-rose-700"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* エアワーク：メインコンポーネント */
const AirworkStudio = () => {
  const [mode, setMode] = useState("paste");
  const [pattern, setPattern] = useState("A");
  const [tone, setTone] = useState("friendly");
  const [appeals, setAppeals] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    branchName: "",
    employmentType: "正社員",
    jobTitle: "",
    industry: "",
    salary: "",
    location: "",
    workHours: "",
    holidays: "",
    benefits: "",
    jobDescription: "",
    requirements: "",
    dailySchedule: "",
    notes: "",
  });
  const [pasteContent, setPasteContent] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [expandedPattern, setExpandedPattern] = useState(null);

  // タグ選択state（ユーザーが微調整可能）
  const [selectedTags, setSelectedTags] = useState({
    workplaceTags: [],
    locationFeatures: [],
    workTimeFeatures: [],
    holidayFeatures: [],
    salaryFeatures: [],
    benefitsTags: [],
    selectionFeatures: [],
    socialInsurance: [],
  });
  const [jobFeatures, setJobFeatures] = useState({});

  const inputs = { mode, formData, pasteContent, pattern, tone, appeals };

  // 生成後、AI推奨をselectedTagsの初期値として反映
  const applyAIRecommendations = (res) => {
    setSelectedTags({
      workplaceTags: res.workplaceTagsAI || [],
      locationFeatures: res.locationFeaturesAI || [],
      workTimeFeatures: res.workTimeFeaturesAI || [],
      holidayFeatures: res.holidayFeaturesAI || [],
      salaryFeatures: res.salaryFeaturesAI || [],
      benefitsTags: res.benefitsTagsAI || [],
      selectionFeatures: res.selectionFeaturesAI || [],
      socialInsurance: res.socialInsuranceAI || [],
    });
    setJobFeatures(res.jobFeaturesAI || {});
  };

  const generate = async () => {
    if (mode === "paste" && !pasteContent.trim()) {
      setError("情報を貼り付けてください");
      return;
    }
    if (mode === "form" && !formData.jobTitle.trim()) {
      setError("職種を入力してください");
      return;
    }
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await callAirworkAPI(buildAirworkFullPrompt(inputs));
      setOutput(res);
      applyAIRecommendations(res);
    } catch (e) {
      setError("生成エラー: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const regenerateSection = async (section) => {
    if (!output) return;
    setSectionLoading(section);
    setError(null);
    try {
      const r = await callAirworkAPI(buildAirworkSectionPrompt(section, inputs, output));
      if (r[section] !== undefined) setOutput({ ...output, [section]: r[section] });
    } catch (e) {
      setError("再生成エラー: " + e.message);
    } finally {
      setSectionLoading(null);
    }
  };

  const reviseSection = async (section, revisionInstruction) => {
    if (!output || !revisionInstruction) return;
    setSectionLoading(section);
    setError(null);
    try {
      const r = await callAirworkAPI(buildAirworkSectionPrompt(section, inputs, output, revisionInstruction));
      if (r[section] !== undefined) setOutput({ ...output, [section]: r[section] });
    } catch (e) {
      setError("修正エラー: " + e.message);
    } finally {
      setSectionLoading(null);
    }
  };

  const doCopy = async (text, key) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } else {
      setError("コピー失敗");
      setTimeout(() => setError(null), 2500);
    }
  };

  const getAllText = () => {
    if (!output) return "";
    const sections = [];

    // ステップ1：募集概要
    sections.push("━━━━━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ1：募集概要】");
    sections.push("━━━━━━━━━━━━━━━━━━━━━━━━");
    if (output.jobTitleText) sections.push("■ 職種名\n" + output.jobTitleText);
    if (output.title) sections.push("■ 求人キャッチコピー\n" + output.title);
    if (output.mainContent) sections.push("■ 仕事内容\n" + output.mainContent);
    if (output.requiredProfile) sections.push("■ 求める人材\n" + output.requiredProfile);

    // 仕事内容の特徴（2択トグル）
    const jfEntries = Object.entries(jobFeatures || {}).filter(([, v]) => v);
    if (jfEntries.length > 0) {
      const jfMap = {
        customerInteraction: "お客様との対話",
        workStyle: "仕事のスタイル",
        environment: "仕事の環境",
        location: "勤務地",
        taskStyle: "業務のスタイル",
        physicalWork: "力仕事",
        teamWork: "作業内容",
      };
      sections.push("■ 仕事内容の特徴\n" + jfEntries.map(([k, v]) => `${jfMap[k]}：${v}`).join("\n"));
    }

    if (selectedTags.locationFeatures.length > 0)
      sections.push("■ 勤務地の特徴\n" + selectedTags.locationFeatures.join(" / "));
    if (selectedTags.workplaceTags.length > 0)
      sections.push("■ 職場環境\n" + selectedTags.workplaceTags.join(" / "));

    // ステップ2：雇用条件
    sections.push("\n━━━━━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ2:雇用条件】");
    sections.push("━━━━━━━━━━━━━━━━━━━━━━━━");
    if (output.salary) sections.push("■ 給与・基本給\n" + output.salary);
    if (output.salaryDetail) sections.push("■ 給与の補足説明\n" + output.salaryDetail);
    if (selectedTags.salaryFeatures.length > 0)
      sections.push("■ 給与の特徴\n" + selectedTags.salaryFeatures.join(" / "));
    if (output.workHours) sections.push("■ 勤務時間・シフト補足説明\n" + output.workHours);
    if (selectedTags.workTimeFeatures.length > 0)
      sections.push("■ 勤務形態・勤務時間の特徴\n" + selectedTags.workTimeFeatures.join(" / "));
    if (output.holidays) sections.push("■ 休日・休暇の補足説明\n" + output.holidays);
    if (selectedTags.holidayFeatures.length > 0)
      sections.push("■ 休日・休暇タグ\n" + selectedTags.holidayFeatures.join(" / "));
    if (selectedTags.socialInsurance.length > 0)
      sections.push("■ 社会保険\n" + selectedTags.socialInsurance.join(" / "));
    if (output.benefits) sections.push("■ 福利厚生の補足説明\n" + output.benefits);
    if (selectedTags.benefitsTags.length > 0)
      sections.push("■ 福利厚生タグ\n" + selectedTags.benefitsTags.join(" / "));

    // ステップ3:応募・選考
    sections.push("\n━━━━━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ3:応募・選考】");
    sections.push("━━━━━━━━━━━━━━━━━━━━━━━━");
    if (output.selectionProcess) sections.push("■ 選考についての補足説明\n" + output.selectionProcess);
    if (selectedTags.selectionFeatures.length > 0)
      sections.push("■ 選考の流れタグ\n" + selectedTags.selectionFeatures.join(" / "));

    return sections.join("\n\n");
  };

  const updateForm = (k, v) => setFormData({ ...formData, [k]: v });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ===== 左パネル：入力 ===== */}
      <div className="space-y-5">
        {/* Step 1：入力方法 */}
        <div>
          <div className="text-xs uppercase mb-2 text-rose-700 tracking-widest font-bold">Step 1 · 入力方法</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("paste")}
              className={
                "p-3 border rounded transition flex flex-col items-center gap-1 " +
                (mode === "paste" ? "border-slate-800 bg-slate-800 text-white" : "border-slate-200 bg-white hover:border-slate-300")
              }
            >
              <Clipboard className="w-5 h-5" />
              <span className="text-sm">コピペ入力</span>
            </button>
            <button
              onClick={() => setMode("form")}
              className={
                "p-3 border rounded transition flex flex-col items-center gap-1 " +
                (mode === "form" ? "border-slate-800 bg-slate-800 text-white" : "border-slate-200 bg-white hover:border-slate-300")
              }
            >
              <FormInputIcon />
              <span className="text-sm">フォーム入力</span>
            </button>
          </div>
        </div>

        {/* Step 2：情報入力 */}
        <div>
          <div className="text-xs uppercase mb-2 text-rose-700 tracking-widest font-bold">Step 2 · 情報入力</div>
          {mode === "paste" ? (
            <textarea
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              rows={12}
              placeholder="既存の求人原稿、募集要項、メモ等を貼り付け"
              className="w-full p-4 border border-slate-200 rounded bg-amber-50 text-sm resize-none focus:outline-none focus:border-slate-800 text-slate-900"
              style={{ lineHeight: 1.7 }}
            />
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {[
                ["companyName", "会社名", "株式会社〇〇"],
                ["branchName", "事業所", "〇〇事業所"],
                ["employmentType", "雇用形態", "正社員"],
                ["jobTitle", "職種 *", "保育士、営業等"],
                ["industry", "業界", "放デイ等"],
                ["salary", "給与", "月給25万〜"],
                ["location", "勤務地", "東京都〇〇区"],
                ["workHours", "勤務時間", "10:00〜19:00"],
                ["holidays", "休日・休暇", "週休2日"],
                ["benefits", "福利厚生", "社保完備"],
              ].map(([k, l, p]) => (
                <div key={k}>
                  <label className="block text-xs mb-1 text-slate-600 font-semibold">{l}</label>
                  <input
                    value={formData[k]}
                    onChange={(e) => updateForm(k, e.target.value)}
                    placeholder={p}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-amber-50 text-sm focus:outline-none focus:border-slate-800 text-slate-900"
                  />
                </div>
              ))}
              {[
                ["jobDescription", "仕事内容の詳細", "業務内容", 3],
                ["requirements", "求める人材", "必須資格等", 2],
                ["dailySchedule", "1日の流れ", "10:00 出社...", 3],
                ["notes", "特記事項", "職場環境等", 2],
              ].map(([k, l, p, r]) => (
                <div key={k}>
                  <label className="block text-xs mb-1 text-slate-600 font-semibold">{l}</label>
                  <textarea
                    value={formData[k]}
                    onChange={(e) => updateForm(k, e.target.value)}
                    placeholder={p}
                    rows={r}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-amber-50 text-sm focus:outline-none focus:border-slate-800 resize-none text-slate-900"
                    style={{ lineHeight: 1.6 }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 3：パターン */}
        <div>
          <div className="text-xs uppercase mb-2 text-rose-700 tracking-widest font-bold">Step 3 · パターン</div>
          <div className="space-y-1">
            {Object.entries(AIRWORK_PATTERNS).map(([k, p]) => (
              <div
                key={k}
                className={"border rounded transition " + (pattern === k ? "border-slate-800 bg-amber-50" : "border-slate-200 bg-white")}
              >
                <div className="flex items-center">
                  <button onClick={() => setPattern(k)} className="flex-1 p-2 text-left flex items-center gap-3">
                    <div
                      className={
                        "w-9 h-9 flex items-center justify-center font-bold text-sm shrink-0 rounded " +
                        (pattern === k ? "bg-slate-800 text-white" : "bg-amber-100 text-slate-700")
                      }
                    >
                      {k}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.bestFor}</div>
                    </div>
                  </button>
                  <button onClick={() => setExpandedPattern(expandedPattern === k ? null : k)} className="p-2">
                    <ChevronDown className={"w-4 h-4 transition text-slate-500 " + (expandedPattern === k ? "rotate-180" : "")} />
                  </button>
                </div>
                {expandedPattern === k && (
                  <pre
                    className="text-xs p-2 mx-2 mb-2 whitespace-pre-wrap bg-amber-100 rounded text-slate-800"
                    style={{ fontFamily: "inherit" }}
                  >
                    {p.templateExample}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 4：トーン */}
        <div>
          <div className="text-xs uppercase mb-2 text-rose-700 tracking-widest font-bold">Step 4 · トーン</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(AIRWORK_TONES).map(([k, t]) => (
              <button
                key={k}
                onClick={() => setTone(k)}
                className={
                  "p-2 border rounded transition text-left " +
                  (tone === k ? "border-rose-700 bg-rose-50" : "border-slate-200 bg-white hover:border-slate-300")
                }
              >
                <div className="text-base">{t.emoji}</div>
                <div className="text-xs font-bold text-slate-900">{t.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5：訴求 */}
        <div>
          <div className="text-xs uppercase mb-2 text-rose-700 tracking-widest font-bold">Step 5 · 訴求（任意）</div>
          <div className="flex flex-wrap gap-1">
            {AIRWORK_APPEAL_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => setAppeals(appeals.includes(a) ? appeals.filter((x) => x !== a) : [...appeals, a])}
                className={
                  "px-2 py-1 text-xs border rounded transition " +
                  (appeals.includes(a) ? "border-rose-700 bg-rose-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-rose-300")
                }
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full py-3.5 text-base font-bold flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white border-2 border-slate-800 rounded disabled:opacity-50 transition shadow-lg shadow-slate-800/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              原稿を生成する（全項目）
            </>
          )}
        </button>
        {error && (
          <div className="p-3 text-sm border border-red-300 bg-red-50 text-red-700 rounded">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            {error}
          </div>
        )}
      </div>

      {/* ===== 右パネル：出力 ===== */}
      <div>
        {!output && !loading && (
          <div className="flex flex-col items-center justify-center min-h-96 border-2 border-dashed border-slate-200 rounded p-12 text-center">
            <FileText className="w-12 h-12 mb-4 text-rose-700 opacity-30" />
            <h3 className="text-xl mb-2 font-bold text-slate-900">まだ原稿はありません</h3>
            <p className="text-sm text-slate-500">左のパネルから情報を入力して生成してください</p>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-96">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-rose-700" />
            <div className="text-lg font-bold text-slate-900">原稿を生成しています...</div>
          </div>
        )}

        {output && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200">
              <div className="text-sm text-slate-600">
                パターン{pattern} / {AIRWORK_TONES[tone].label}
              </div>
              <button
                onClick={generate}
                className="flex items-center gap-1 px-3 py-2 text-xs border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition rounded"
              >
                <RefreshCw className="w-3 h-3" /> 全再生成
              </button>
            </div>

            {Object.entries(AIRWORK_SECTION_CONFIG).map(([sk, cfg]) => {
              const content = output[sk];
              if (!content) return null;
              return (
                <AirworkOutputSection
                  key={sk}
                  label={cfg.label}
                  Icon={cfg.icon}
                  content={content}
                  onCopy={() => doCopy(content, sk)}
                  copied={copiedKey === sk}
                  onRegenerate={() => regenerateSection(sk)}
                  onRevise={(instr) => reviseSection(sk, instr)}
                  isRegenerating={sectionLoading === sk}
                  isLarge={cfg.isLarge}
                  isTitle={cfg.isTitle}
                  accentColor="rose"
                />
              );
            })}

            {/* === 仕事内容の特徴（2択トグル） === */}
            <AirworkToggleBlock
              label={AIRWORK_TAG_OPTIONS.jobFeatures.label}
              items={AIRWORK_TAG_OPTIONS.jobFeatures.items}
              values={jobFeatures}
              onChange={setJobFeatures}
            />

            {/* === マルチセレクトタグ群 === */}
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.locationFeatures.label}
              allItems={AIRWORK_TAG_OPTIONS.locationFeatures.items}
              aiRecommended={output.locationFeaturesAI}
              selected={selectedTags.locationFeatures}
              onChange={(v) => setSelectedTags({ ...selectedTags, locationFeatures: v })}
              onCopy={() => doCopy(selectedTags.locationFeatures.join("\n"), "loc")}
              copied={copiedKey === "loc"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.workplaceTags.label}
              allItems={AIRWORK_TAG_OPTIONS.workplaceTags.items}
              aiRecommended={output.workplaceTagsAI}
              selected={selectedTags.workplaceTags}
              onChange={(v) => setSelectedTags({ ...selectedTags, workplaceTags: v })}
              onCopy={() => doCopy(selectedTags.workplaceTags.join("\n"), "wp")}
              copied={copiedKey === "wp"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.workTimeFeatures.label}
              allItems={AIRWORK_TAG_OPTIONS.workTimeFeatures.items}
              aiRecommended={output.workTimeFeaturesAI}
              selected={selectedTags.workTimeFeatures}
              onChange={(v) => setSelectedTags({ ...selectedTags, workTimeFeatures: v })}
              onCopy={() => doCopy(selectedTags.workTimeFeatures.join("\n"), "wt2")}
              copied={copiedKey === "wt2"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.holidayFeatures.label}
              allItems={AIRWORK_TAG_OPTIONS.holidayFeatures.items}
              aiRecommended={output.holidayFeaturesAI}
              selected={selectedTags.holidayFeatures}
              onChange={(v) => setSelectedTags({ ...selectedTags, holidayFeatures: v })}
              onCopy={() => doCopy(selectedTags.holidayFeatures.join("\n"), "hol")}
              copied={copiedKey === "hol"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.salaryFeatures.label}
              allItems={AIRWORK_TAG_OPTIONS.salaryFeatures.items}
              aiRecommended={output.salaryFeaturesAI}
              selected={selectedTags.salaryFeatures}
              onChange={(v) => setSelectedTags({ ...selectedTags, salaryFeatures: v })}
              onCopy={() => doCopy(selectedTags.salaryFeatures.join("\n"), "sal")}
              copied={copiedKey === "sal"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.socialInsurance.label}
              allItems={AIRWORK_TAG_OPTIONS.socialInsurance.items}
              aiRecommended={output.socialInsuranceAI}
              selected={selectedTags.socialInsurance}
              onChange={(v) => setSelectedTags({ ...selectedTags, socialInsurance: v })}
              onCopy={() => doCopy(selectedTags.socialInsurance.join("\n"), "si")}
              copied={copiedKey === "si"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.benefitsTags.label}
              allItems={AIRWORK_TAG_OPTIONS.benefitsTags.items}
              aiRecommended={output.benefitsTagsAI}
              selected={selectedTags.benefitsTags}
              onChange={(v) => setSelectedTags({ ...selectedTags, benefitsTags: v })}
              onCopy={() => doCopy(selectedTags.benefitsTags.join("\n"), "ben")}
              copied={copiedKey === "ben"}
            />
            <AirworkMultiTagBlock
              label={AIRWORK_TAG_OPTIONS.selectionFeatures.label}
              allItems={AIRWORK_TAG_OPTIONS.selectionFeatures.items}
              aiRecommended={output.selectionFeaturesAI}
              selected={selectedTags.selectionFeatures}
              onChange={(v) => setSelectedTags({ ...selectedTags, selectionFeatures: v })}
              onCopy={() => doCopy(selectedTags.selectionFeatures.join("\n"), "sel")}
              copied={copiedKey === "sel"}
            />

            {output.featureTags?.length > 0 && (
              <AirworkTagBlock
                title="特徴タグ（参考）"
                tags={output.featureTags}
                onCopy={() => doCopy(output.featureTags.join("\n"), "ft")}
                copied={copiedKey === "ft"}
                onRegenerate={() => regenerateSection("featureTags")}
                isRegenerating={sectionLoading === "featureTags"}
              />
            )}

            <button
              onClick={() => doCopy(getAllText(), "all")}
              className={
                "w-full py-3 text-sm font-bold flex items-center justify-center gap-2 rounded transition " +
                (copiedKey === "all" ? "bg-emerald-600 text-white" : "bg-rose-700 hover:bg-rose-800 text-white shadow-lg shadow-rose-700/20")
              }
            >
              {copiedKey === "all" ? (
                <>
                  <Check className="w-4 h-4" /> コピー済み
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> 全文コピー（タグ選択反映）
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* フォーム入力アイコン（lucideにないので簡易代替） */
const FormInputIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <path d="M12 12h.01" />
    <path d="M17 12h.01" />
    <path d="M7 12h.01" />
  </svg>
);

/* =========================================================================
   【Indeed機能】定数・プロンプト・コンポーネント
   ========================================================================= */

const INDEED_SYSTEM_PROMPT = `あなたはIndeed for Employersの管理画面に直接入力する求人原稿を作成する専門ライターです。

【Indeed管理画面の実フィールド構成】
本ツールはIndeed for Employersの実際の入力画面の各フィールドに対応する原稿を生成します。

【原稿の装飾スタイル】
実際のIndeed掲載求人を参考に、Airworkに近いリッチな装飾原稿スタイルで仕上げます：

★装飾記号は次を中心に使う★
- ✅ ：箇条書き・条件提示
- ✨ ：見出し・サブ訴求
- ◎ ：人物像・志向性の箇条書き
- 【】：見出し
- 改行と空行で読みやすく整理

【参考：実例の構成パターン】

▼ 仕事内容
リード文（共感を呼ぶ問いかけ・人物像の絞り込み）

【具体的な業務内容】
✅ 業務1
✅ 業務2
✅ 業務3

【入社後の流れ・キャリア】
キャリアパスや成長環境を文章で説明

▼ アピールポイント
✨ 【小見出し1】
本文（複数行）

✨ 【小見出し2】
本文（複数行）

▼ 求める人材
✨ 〜の方、大歓迎！
✨ 〜に興味がある方

【優遇される資格・経験】
✅ ○○資格
✅ ○○経験

【こんな方にピッタリです】
◎ 〜が好き
◎ 〜に興味がある

▼ 休暇・休日
✅ 週休○日制
✅ ゴールデンウィーク休暇
✅ 夏季休暇
✅ 年末年始休暇

▼ 勤務地の補足
出張・転勤・受動喫煙防止措置に関する記載

▼ アクセス
【最寄駅からのアクセス】
✅ ○○駅より徒歩○分

【通勤のポイント】
✨ マイカー通勤OK
✨ バイク・自転車通勤も可能

▼ 給与の補足
✅ 昇給○回 / 賞与○回
✅ ○○手当（月額○円支給）
✅ ○○手当（月額上限○円）

▼ 待遇・福利厚生
✅ ○○制度
✅ ○○手当
✅ 交通費支給
✅ 研修期間○ヶ月

▼ その他
面接や勤務開始日に関する補足

【Indeed特有の重要ポイント】

1. SEOキーワード重視：職種名・勤務地・雇用形態・給与は冒頭に明記
2. 職業カテゴリー：仕事内容に合うカテゴリーを最大3つ提案（例：営業・接客、事務、IT・WEB、医療・介護、製造・建設、サービス）
3. 求人キャッチコピー：求職者の目を引く短いキャッチ
4. 装飾は適度に（HTMLタグNG、✅✨◎【】等の記号と絵文字は適切に使用）
5. 求める人材で特定の属性・年齢層・国籍・性別の指定NG（記入不可：「20代歓迎」「母国語が英語」「女性歓迎・限定」「学生限定」等）
6. 受動喫煙防止措置の記載は必須（敷地内禁煙/原則屋内禁煙、喫煙室あり等）
7. 過度な絵文字は避ける（1セクション2-4個程度）
8. 誇大表現・虚偽記載NG（審査落ちリスク）

【出力形式】
JSON形式のみで返してください。マークダウン記法、前置き、説明文は一切不要です。各テキストフィールドは上記の装飾型で記述してください。

{
  "jobTitle": "職種名（具体的で仕事内容が伝わる表記。例：医療機器の法人営業、居酒屋ホールスタッフ、住宅ブランドの広報）",
  "jobCategories": ["職業カテゴリー（最大3つ）。例：営業職, 販売・接客, サービス職"],
  "catchCopy": "求人キャッチコピー（求人をアピールする短い文章。30〜50文字程度）",
  "hiringCount": "採用予定人数（1名 / 2〜5名 / 6〜10名 / 11名以上 のいずれか）",
  "employmentType": "雇用形態（正社員 / アルバイト・パート / 派遣社員 / 契約社員 / 業務委託 / インターン / 新卒 / ボランティア のいずれか）",
  "salaryType": "給与形態（時給 / 日給 / 週給 / 月給 / 年俸 のいずれか）",
  "salaryDisplay": "給与表示方法（範囲で表示 / 最低額のみ / 固定額 のいずれか）",
  "salaryMin": "最低額（数値のみ。例：1200, 250000, 3500000）",
  "salaryMax": "最高額（数値のみ。範囲表示の場合のみ。例：1500, 350000, 5000000）",
  "workHours": "勤務時間・曜日。実働時間・休憩時間・時間外勤務有無・勤務形態を具体的に。装飾記号で見やすく。",
  "jobDescription": "仕事内容。【具体的な業務内容】✅で箇条書き、【入社後の流れ・キャリア】文章説明、リード文も含めた装飾型完全版",
  "appealPoints": "アピールポイント。✨【小見出し】＋本文 を3〜5セクション。仕事や職場のイメージ・企業ビジョンを盛り込む装飾型完全版",
  "requirements": "求める人材。✨見出し＋【優遇される資格・経験】✅箇条書き＋【こんな方にピッタリです】◎箇条書きの装飾型完全版。注意：年齢・性別・国籍・属性の指定NG",
  "holidays": "休暇・休日。✅で箇条書きの装飾型完全版。土日休/年間休日数/特別休暇制度等",
  "locationNote": "勤務地の補足。出張・転勤・複数勤務地・受動喫煙防止措置に関する記載（例：敷地内全面禁煙、原則屋内禁煙等）。装飾記号で見やすく。",
  "access": "アクセス。【最寄駅からのアクセス】✅ + 【通勤のポイント】✨で完全版（駐車場・自転車通勤可否等）",
  "salaryDetail": "給与の補足。固定/変動手当、固定残業代、昇給、賞与等。✅で箇条書きの装飾型",
  "benefits": "待遇・福利厚生。契約期間等を含む待遇・福利厚生に関する情報。✅で箇条書きの装飾型完全版",
  "otherInfo": "その他。面接や勤務開始日など、上記に該当しない情報。✅で箇条書きの装飾型",
  "tags": ["この求人のタグ（特長）最大3つ。次から該当するもの：社員登用あり / 昇給あり / 残業なし / 週1日からOK / 週2・3日からOK / シフト自由 / 交通費支給 / 即日勤務OK / 駅近5分以内 / フルリモート / 在宅OK"],
  "additionalAppInfo": ["応募者から取得する追加情報。次から該当するもの：性別 / 生年月日 / 電話番号 / 住所 / 職歴 / 学歴 / 資格・免許 / スキル"]
}`;

const INDEED_SECTION_CONFIG = {
  // ===== 求人の基本情報 =====
  jobTitle: { label: "職種名", icon: Feather, isTitle: true, maxLength: 50, step: "基本情報" },
  catchCopy: { label: "求人キャッチコピー", icon: Sparkles, isTitle: true, maxLength: 80, step: "基本情報" },
  hiringCount: { label: "採用予定人数", icon: Users, step: "基本情報" },
  // ===== 求人の詳細 =====
  employmentType: { label: "雇用形態", icon: Briefcase, step: "詳細" },
  salaryType: { label: "給与形態", icon: DollarSign, step: "詳細" },
  salaryDisplay: { label: "給与表示方法", icon: DollarSign, step: "詳細" },
  salaryMin: { label: "最低額", icon: DollarSign, step: "詳細" },
  salaryMax: { label: "最高額", icon: DollarSign, step: "詳細" },
  workHours: { label: "勤務時間・曜日", icon: Clock, isLarge: true, step: "詳細" },
  // ===== 求人の募集要項 =====
  jobDescription: { label: "仕事内容", icon: FileText, isLarge: true, step: "募集要項" },
  appealPoints: { label: "アピールポイント", icon: Sparkles, isLarge: true, step: "募集要項" },
  requirements: { label: "求める人材", icon: Users, isLarge: true, step: "募集要項" },
  holidays: { label: "休暇・休日", icon: Calendar, isLarge: true, step: "募集要項" },
  locationNote: { label: "勤務地の補足", icon: MapPin, isLarge: true, step: "募集要項" },
  access: { label: "アクセス", icon: MapPin, isLarge: true, step: "募集要項" },
  salaryDetail: { label: "給与の補足", icon: DollarSign, isLarge: true, step: "募集要項" },
  benefits: { label: "待遇・福利厚生", icon: Heart, isLarge: true, step: "募集要項" },
  otherInfo: { label: "その他", icon: Info, isLarge: true, step: "募集要項" },
};

// タグ（特長）の選択肢
const INDEED_TAG_OPTIONS = [
  "社員登用あり",
  "昇給あり",
  "残業なし",
  "週1日からOK",
  "週2・3日からOK",
  "シフト自由",
  "交通費支給",
  "即日勤務OK",
  "駅近5分以内",
  "フルリモート",
  "在宅OK",
];

// 応募者から取得する追加情報
const INDEED_ADDITIONAL_APP_INFO = [
  "性別",
  "生年月日",
  "電話番号",
  "住所",
  "職歴",
  "学歴",
  "資格・免許",
  "スキル",
];

async function callIndeedAPI(systemPrompt, userContent) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    }),
  });
  if (!res.ok) throw new Error("APIエラー: " + res.status);
  const data = await res.json();
  const text = data.content
    .filter((i) => i.type === "text")
    .map((i) => i.text)
    .join("\n");
  let c = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const f = c.indexOf("{"),
    l = c.lastIndexOf("}");
  if (f !== -1 && l !== -1) c = c.substring(f, l + 1);
  return JSON.parse(c);
}

/* Indeed 出力セクション */
const IndeedOutputSection = ({ label, Icon, content, onCopy, copied, isLarge, isTitle, isSummary, maxLength, onRegenerate, onRevise, isRegenerating }) => {
  const [revisionOpen, setRevisionOpen] = useState(false);
  const isOverLimit = maxLength && content.length > maxLength;
  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs uppercase font-bold text-sky-700 tracking-wider">
          <Icon className="w-4 h-4" /> {label}
        </div>
        <div className="flex gap-2 flex-wrap">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1 px-3 py-1 text-xs border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 disabled:opacity-50 transition rounded"
            >
              {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              {isRegenerating ? "再生成中" : "再生成"}
            </button>
          )}
          {onRevise && (
            <button
              onClick={() => setRevisionOpen(!revisionOpen)}
              disabled={isRegenerating}
              className={
                "flex items-center gap-1 px-3 py-1 text-xs border transition rounded disabled:opacity-50 " +
                (revisionOpen ? "bg-sky-600 text-white border-sky-600" : "border-slate-200 hover:border-slate-300")
              }
            >
              <Wand2 className="w-3 h-3" />
              修正指示
            </button>
          )}
          <button
            onClick={onCopy}
            className={
              "flex items-center gap-1 px-3 py-1 text-xs border rounded transition " +
              (copied ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 hover:border-slate-300")
            }
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "コピー済" : "コピー"}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre
          className={
            "p-4 border rounded text-sm whitespace-pre-wrap overflow-x-auto text-slate-900 " +
            (isSummary ? "border-sky-300 bg-sky-50" : "border-slate-300 bg-white")
          }
          style={{
            fontFamily: 'inherit',
            lineHeight: 1.7,
            minHeight: isLarge ? "160px" : "auto",
            fontSize: isTitle ? "16px" : "14px",
            fontWeight: isTitle ? 700 : 400,
            opacity: isRegenerating ? 0.3 : 1,
          }}
        >
          {content}
        </pre>
        {maxLength && (
          <div className="mt-1 text-right">
            <span
              className={
                "text-xs px-2 py-0.5 rounded " +
                (isOverLimit
                  ? "bg-red-100 text-red-800"
                  : content.length > maxLength * 0.8
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800")
              }
            >
              {content.length}/{maxLength}文字 {isOverLimit ? "（超過）" : ""}
            </span>
          </div>
        )}
        {isRegenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-800 text-white px-4 py-2 text-sm flex items-center gap-2 rounded">
              <Loader2 className="w-4 h-4 animate-spin" /> 処理中...
            </div>
          </div>
        )}
      </div>
      {onRevise && (
        <RevisionPanel
          open={revisionOpen}
          onClose={() => setRevisionOpen(false)}
          onApply={(instr) => {
            onRevise(instr);
            setRevisionOpen(false);
          }}
          isLoading={isRegenerating}
          accentColor="sky"
        />
      )}
    </div>
  );
};

/* Indeed メインコンポーネント */
const IndeedStudio = () => {
  const [mode, setMode] = useState("paste");
  const [pasteContent, setPasteContent] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    employmentType: "正社員",
    industry: "",
    salary: "",
    location: "",
    workHours: "",
    holidays: "",
    benefits: "",
    jobDescription: "",
    requirements: "",
    notes: "",
  });
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const buildUserContent = () => {
    if (mode === "paste") {
      return `以下の求人情報からIndeed直接投稿用の原稿を作成してください。

${pasteContent}

上記情報を元に、Indeed for Employersの管理画面に入力する各フィールドの内容をJSON形式で返してください。`;
    }
    return `以下の求人情報からIndeed直接投稿用の原稿を作成してください。

【会社名】${formData.companyName || "（未入力）"}
【職種】${formData.jobTitle || "（未入力）"}
【雇用形態】${formData.employmentType}
【業界】${formData.industry || "（未入力）"}
【給与】${formData.salary || "（未入力）"}
【勤務地】${formData.location || "（未入力）"}
【勤務時間】${formData.workHours || "（未入力）"}
【休日】${formData.holidays || "（未入力）"}
【福利厚生】${formData.benefits || "（未入力）"}
【仕事内容】${formData.jobDescription || "（未入力）"}
【応募要件】${formData.requirements || "（未入力）"}
【その他メモ】${formData.notes || "（未入力）"}

上記情報を元に、Indeed for Employersの管理画面に入力する各フィールドの内容をJSON形式で返してください。`;
  };

  const generate = async () => {
    if (mode === "paste" && !pasteContent.trim()) {
      setError("情報を貼り付けてください");
      return;
    }
    if (mode === "form" && !formData.jobTitle.trim()) {
      setError("職種を入力してください");
      return;
    }
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await callIndeedAPI(INDEED_SYSTEM_PROMPT, buildUserContent());
      setOutput(res);
    } catch (e) {
      setError("生成エラー: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const [sectionLoading, setSectionLoading] = useState(null);

  const buildSectionPrompt = (section, revisionInstruction = "") => {
    const sectionLabel = INDEED_SECTION_CONFIG[section]?.label || section;
    const currentValue = output?.[section];
    const others = Object.entries(output || {})
      .filter(([k]) => k !== section)
      .filter(([k]) => INDEED_SECTION_CONFIG[k] || k === "jobCategories" || k === "tags" || k === "additionalAppInfo")
      .map(([k, v]) => `${INDEED_SECTION_CONFIG[k]?.label || k}: ${Array.isArray(v) ? v.join(",") : String(v).slice(0, 200)}`)
      .join("\n");

    const revisionPart = revisionInstruction
      ? `\n\n【★修正指示（最優先で反映）★】\n${revisionInstruction}\n\n【現在の${sectionLabel}】\n${Array.isArray(currentValue) ? currentValue.join(",") : String(currentValue || "")}\n\n上記の修正指示を反映して、現在の内容を改善してください。`
      : `\n\n【再生成】\n現在の内容を別パターンで再生成してください。`;

    return `${INDEED_SYSTEM_PROMPT}

【元の入力情報】
${buildUserContent()}

【他の既存セクション（参考）】
${others}
${revisionPart}

「${sectionLabel}」のみを改善してください。
JSON形式のみで返してください: {"${section}": "..."}`;
  };

  const regenerateSection = async (section) => {
    if (!output) return;
    setSectionLoading(section);
    setError(null);
    try {
      const res = await callIndeedAPI(buildSectionPrompt(section), `${section}を再生成してください`);
      if (res[section] !== undefined) setOutput({ ...output, [section]: res[section] });
    } catch (e) {
      setError("再生成エラー: " + e.message);
    } finally {
      setSectionLoading(null);
    }
  };

  const reviseSection = async (section, instruction) => {
    if (!output || !instruction) return;
    setSectionLoading(section);
    setError(null);
    try {
      const res = await callIndeedAPI(buildSectionPrompt(section, instruction), `${section}を修正指示に従って改善してください`);
      if (res[section] !== undefined) setOutput({ ...output, [section]: res[section] });
    } catch (e) {
      setError("修正エラー: " + e.message);
    } finally {
      setSectionLoading(null);
    }
  };

  const doCopy = async (text, key) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const getAllText = () => {
    if (!output) return "";
    const sections = [];
    sections.push("━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ1：求人の基本情報】");
    sections.push("━━━━━━━━━━━━━━━━━━━━");
    if (output.jobTitle) sections.push("▼ 職種名\n" + output.jobTitle);
    if (output.jobCategories?.length > 0) sections.push("▼ 職業カテゴリー\n" + output.jobCategories.join(" / "));
    if (output.catchCopy) sections.push("▼ 求人キャッチコピー\n" + output.catchCopy);
    if (output.hiringCount) sections.push("▼ 採用予定人数\n" + output.hiringCount);

    sections.push("\n━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ2：求人の詳細】");
    sections.push("━━━━━━━━━━━━━━━━━━━━");
    if (output.employmentType) sections.push("▼ 雇用形態\n" + output.employmentType);
    if (output.salaryType || output.salaryMin) {
      const salaryInfo = [];
      if (output.salaryType) salaryInfo.push("給与形態：" + output.salaryType);
      if (output.salaryDisplay) salaryInfo.push("表示方法：" + output.salaryDisplay);
      if (output.salaryMin) salaryInfo.push("最低額：¥" + Number(output.salaryMin).toLocaleString());
      if (output.salaryMax) salaryInfo.push("最高額：¥" + Number(output.salaryMax).toLocaleString());
      sections.push("▼ 給与\n" + salaryInfo.join("\n"));
    }
    if (output.workHours) sections.push("▼ 勤務時間・曜日\n" + output.workHours);

    sections.push("\n━━━━━━━━━━━━━━━━━━━━");
    sections.push("【ステップ3：求人の募集要項】");
    sections.push("━━━━━━━━━━━━━━━━━━━━");
    if (output.jobDescription) sections.push("▼ 仕事内容\n" + output.jobDescription);
    if (output.appealPoints) sections.push("▼ アピールポイント\n" + output.appealPoints);
    if (output.requirements) sections.push("▼ 求める人材\n" + output.requirements);
    if (output.holidays) sections.push("▼ 休暇・休日\n" + output.holidays);
    if (output.locationNote) sections.push("▼ 勤務地の補足\n" + output.locationNote);
    if (output.access) sections.push("▼ アクセス\n" + output.access);
    if (output.salaryDetail) sections.push("▼ 給与の補足\n" + output.salaryDetail);
    if (output.benefits) sections.push("▼ 待遇・福利厚生\n" + output.benefits);
    if (output.otherInfo) sections.push("▼ その他\n" + output.otherInfo);
    if (output.tags?.length > 0) sections.push("▼ この求人のタグ（特長・最大3つ）\n" + output.tags.join(" / "));

    if (output.additionalAppInfo?.length > 0) {
      sections.push("\n━━━━━━━━━━━━━━━━━━━━");
      sections.push("【ステップ4：応募関連の設定】");
      sections.push("━━━━━━━━━━━━━━━━━━━━");
      sections.push("▼ 応募者から取得する追加情報\n" + output.additionalAppInfo.join(" / "));
    }

    return sections.join("\n\n");
  };

  const updateForm = (k, v) => setFormData({ ...formData, [k]: v });

  return (
    <div>
      {/* 情報ボックス */}
      <div className="flex items-start gap-2 mb-4 p-3 bg-sky-50 border border-sky-200 rounded-md">
        <Info className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <b className="text-sky-700">Indeed for Employers</b>の管理画面（求人の基本情報→求人の詳細→求人の募集要項→応募関連の設定）に対応した原稿を生成します。Airworkに近い<b className="text-sky-700">リッチな装飾原稿スタイル</b>（✅✨◎【】等）です。
        </div>
      </div>

      {/* Indeed特有の注意 */}
      <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <b className="text-amber-700">Indeedの注意点：</b>
            ①<b>求める人材で年齢・性別・国籍・属性の指定はNG</b>（例「20代歓迎」「女性歓迎」「学生限定」等）　②受動喫煙防止措置の記載が必要　③HTMLタグNG（記号・絵文字での装飾はOK）　④誇大表現・虚偽記載は審査落ちリスク
          </div>
        </div>
      </div>

      {/* 入力モード切替 */}
      <div className="mb-5">
        <div className="text-xs uppercase mb-2 text-sky-700 tracking-widest font-bold">入力方法</div>
        <div className="flex gap-2 bg-slate-100 border border-slate-200 rounded-md p-1 w-fit">
          <button
            onClick={() => setMode("paste")}
            className={
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition " +
              (mode === "paste" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-slate-800")
            }
          >
            <Clipboard className="w-3 h-3" />
            原稿ペースト
          </button>
          <button
            onClick={() => setMode("form")}
            className={
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition " +
              (mode === "form" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-slate-800")
            }
          >
            <FormInputIcon />
            フォーム入力
          </button>
        </div>
      </div>

      {/* 入力エリア */}
      <div className="mb-5">
        {mode === "paste" ? (
          <textarea
            value={pasteContent}
            onChange={(e) => setPasteContent(e.target.value)}
            rows={10}
            placeholder="既存の求人原稿、募集要項、事業所情報などを貼り付けてください"
            className="w-full p-4 border border-slate-200 rounded bg-white text-sm resize-y focus:outline-none focus:border-sky-500 focus:ring-1 ring-sky-200 text-slate-900"
            style={{ lineHeight: 1.7 }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ["companyName", "会社名", "株式会社〇〇"],
              ["jobTitle", "職種名 *", "事務職（総務・経理）"],
              ["industry", "業界", "医療事務、美容、介護等"],
              ["salary", "給与", "月給25万〜35万円"],
              ["location", "勤務地", "東京都〇〇区〇〇1-2-3"],
              ["workHours", "勤務時間", "9:00〜18:00（休憩1時間）"],
              ["holidays", "休日・休暇", "完全週休2日制・年間休日120日"],
              ["benefits", "福利厚生", "社保完備・交通費・賞与年2回"],
            ].map(([k, l, p]) => (
              <div key={k}>
                <label className="block text-xs mb-1 text-slate-600 font-semibold">{l}</label>
                <input
                  value={formData[k]}
                  onChange={(e) => updateForm(k, e.target.value)}
                  placeholder={p}
                  className="w-full px-3 py-2 border border-slate-200 rounded bg-white text-sm focus:outline-none focus:border-sky-500 text-slate-900"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs mb-1 text-slate-600 font-semibold">雇用形態</label>
              <select
                value={formData.employmentType}
                onChange={(e) => updateForm("employmentType", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-white text-sm focus:outline-none focus:border-sky-500 text-slate-900"
              >
                <option>正社員</option>
                <option>パート・アルバイト</option>
                <option>契約社員</option>
                <option>業務委託</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 text-slate-600 font-semibold">仕事内容の詳細</label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => updateForm("jobDescription", e.target.value)}
                placeholder="業務内容を具体的に..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-white text-sm focus:outline-none focus:border-sky-500 resize-y text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 text-slate-600 font-semibold">応募要件・求める人材</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => updateForm("requirements", e.target.value)}
                placeholder="必須スキル・歓迎条件・人物像など"
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-white text-sm focus:outline-none focus:border-sky-500 resize-y text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 text-slate-600 font-semibold">その他メモ（訴求ポイント等）</label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                placeholder="職場の雰囲気、特筆したい魅力など"
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-white text-sm focus:outline-none focus:border-sky-500 resize-y text-slate-900"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 mb-4 text-sm border border-red-300 bg-red-50 text-red-700 rounded">
          <AlertCircle className="w-4 h-4 inline mr-1" />
          {error}
        </div>
      )}

      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-3.5 text-base font-bold flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white border-2 border-sky-600 rounded disabled:opacity-50 transition shadow-lg shadow-sky-600/20"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Indeed原稿を生成する
          </>
        )}
      </button>

      {/* 出力エリア */}
      {output && (
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="text-sm text-slate-600 font-semibold">生成結果（各フィールドをIndeed管理画面に貼り付け）</div>
            <button
              onClick={() => doCopy(getAllText(), "all")}
              className={
                "flex items-center gap-1 px-3 py-2 text-xs font-bold border rounded transition " +
                (copiedKey === "all"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-sky-600 text-white border-sky-600 hover:bg-sky-500")
              }
            >
              {copiedKey === "all" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedKey === "all" ? "コピー済" : "全文コピー"}
            </button>
          </div>

          {/* 職業カテゴリー（チップ表示） */}
          {output.jobCategories && output.jobCategories.length > 0 && (
            <div className="p-3 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  職業カテゴリー（最大3つ・原稿作成時に管理画面で選択）
                </div>
                <button
                  onClick={() => doCopy(output.jobCategories.join("、"), "jc")}
                  className={
                    "flex items-center gap-1 px-2 py-1 text-xs border rounded transition " +
                    (copiedKey === "jc"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-slate-200 hover:border-slate-300")
                  }
                >
                  {copiedKey === "jc" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {output.jobCategories.map((k, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-sky-200 text-sky-900 rounded font-semibold">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* === ステップ1：求人の基本情報 === */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider border-l-4 border-sky-600 pl-2">
              ステップ1：求人の基本情報
            </div>
            {["jobTitle", "catchCopy", "hiringCount"].map((sk) => {
              const cfg = INDEED_SECTION_CONFIG[sk];
              const content = output[sk];
              if (!content || !cfg) return null;
              return (
                <IndeedOutputSection
                  key={sk}
                  label={cfg.label}
                  Icon={cfg.icon}
                  content={content}
                  onCopy={() => doCopy(content, sk)}
                  copied={copiedKey === sk}
                  isLarge={cfg.isLarge}
                  isTitle={cfg.isTitle}
                  isSummary={cfg.isSummary}
                  maxLength={cfg.maxLength}
                  onRegenerate={() => regenerateSection(sk)}
                  onRevise={(instr) => reviseSection(sk, instr)}
                  isRegenerating={sectionLoading === sk}
                />
              );
            })}
          </div>

          {/* === ステップ2：求人の詳細 === */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider border-l-4 border-sky-600 pl-2">
              ステップ2：求人の詳細
            </div>
            {["employmentType"].map((sk) => {
              const cfg = INDEED_SECTION_CONFIG[sk];
              const content = output[sk];
              if (!content || !cfg) return null;
              return (
                <IndeedOutputSection
                  key={sk}
                  label={cfg.label}
                  Icon={cfg.icon}
                  content={content}
                  onCopy={() => doCopy(content, sk)}
                  copied={copiedKey === sk}
                  isLarge={cfg.isLarge}
                  isTitle={cfg.isTitle}
                  onRegenerate={() => regenerateSection(sk)}
                  onRevise={(instr) => reviseSection(sk, instr)}
                  isRegenerating={sectionLoading === sk}
                />
              );
            })}

            {/* 給与の集約表示 */}
            {(output.salaryType || output.salaryMin) && (
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-sky-700 tracking-wider">
                    <DollarSign className="w-4 h-4" /> 給与（基本情報）
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-300 rounded grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {output.salaryType && (
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">給与形態</div>
                      <div className="font-bold text-slate-900">{output.salaryType}</div>
                    </div>
                  )}
                  {output.salaryDisplay && (
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">表示方法</div>
                      <div className="font-bold text-slate-900">{output.salaryDisplay}</div>
                    </div>
                  )}
                  {output.salaryMin && (
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">最低額</div>
                      <div className="font-bold text-slate-900">¥{Number(output.salaryMin).toLocaleString()}</div>
                    </div>
                  )}
                  {output.salaryMax && (
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">最高額</div>
                      <div className="font-bold text-slate-900">¥{Number(output.salaryMax).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {["workHours"].map((sk) => {
              const cfg = INDEED_SECTION_CONFIG[sk];
              const content = output[sk];
              if (!content || !cfg) return null;
              return (
                <IndeedOutputSection
                  key={sk}
                  label={cfg.label}
                  Icon={cfg.icon}
                  content={content}
                  onCopy={() => doCopy(content, sk)}
                  copied={copiedKey === sk}
                  isLarge={cfg.isLarge}
                  onRegenerate={() => regenerateSection(sk)}
                  onRevise={(instr) => reviseSection(sk, instr)}
                  isRegenerating={sectionLoading === sk}
                />
              );
            })}
          </div>

          {/* === ステップ3：求人の募集要項 === */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider border-l-4 border-sky-600 pl-2">
              ステップ3：求人の募集要項
            </div>
            {[
              "jobDescription",
              "appealPoints",
              "requirements",
              "holidays",
              "locationNote",
              "access",
              "salaryDetail",
              "benefits",
              "otherInfo",
            ].map((sk) => {
              const cfg = INDEED_SECTION_CONFIG[sk];
              const content = output[sk];
              if (!content || !cfg) return null;
              return (
                <IndeedOutputSection
                  key={sk}
                  label={cfg.label}
                  Icon={cfg.icon}
                  content={content}
                  onCopy={() => doCopy(content, sk)}
                  copied={copiedKey === sk}
                  isLarge={cfg.isLarge}
                  onRegenerate={() => regenerateSection(sk)}
                  onRevise={(instr) => reviseSection(sk, instr)}
                  isRegenerating={sectionLoading === sk}
                />
              );
            })}

            {/* 求人タグ（特長・最大3つ） */}
            {output.tags && output.tags.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-sky-700 tracking-wider">
                    <Tag className="w-4 h-4" /> この求人のタグ（特長・最大3つ）
                    <span className="text-[10px] text-slate-500 normal-case font-normal">
                      （AI推奨：{output.tags.length}件）
                    </span>
                  </div>
                  <button
                    onClick={() => doCopy(output.tags.slice(0, 3).join("、"), "tags")}
                    className={
                      "flex items-center gap-1 px-2 py-1 text-xs border rounded transition " +
                      (copiedKey === "tags"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    {copiedKey === "tags" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="p-3 border border-slate-300 bg-white rounded flex flex-wrap gap-1.5">
                  {INDEED_TAG_OPTIONS.map((item, i) => {
                    const isRecommended = output.tags?.includes(item);
                    return (
                      <span
                        key={i}
                        className={
                          "px-2.5 py-1 text-xs border rounded " +
                          (isRecommended
                            ? "bg-sky-600 text-white border-sky-600 font-semibold"
                            : "bg-white border-slate-200 text-slate-500")
                        }
                      >
                        {isRecommended && <span className="mr-0.5">★</span>}
                        {item}
                      </span>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5">
                  ※ Indeedでは最大3つまで選択できます。AI推奨は参考としてご利用ください。
                </p>
              </div>
            )}
          </div>

          {/* === ステップ4：応募関連の設定 === */}
          {output.additionalAppInfo && output.additionalAppInfo.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider border-l-4 border-sky-600 pl-2">
                ステップ4：応募関連の設定
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-sky-700 tracking-wider">
                    <Users className="w-4 h-4" /> 応募者から取得する追加情報（AI推奨）
                  </div>
                  <button
                    onClick={() => doCopy(output.additionalAppInfo.join("、"), "appinfo")}
                    className={
                      "flex items-center gap-1 px-2 py-1 text-xs border rounded transition " +
                      (copiedKey === "appinfo"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    {copiedKey === "appinfo" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="p-3 border border-slate-300 bg-white rounded flex flex-wrap gap-1.5">
                  {INDEED_ADDITIONAL_APP_INFO.map((item, i) => {
                    const isRecommended = output.additionalAppInfo?.includes(item);
                    return (
                      <span
                        key={i}
                        className={
                          "px-2.5 py-1 text-xs border rounded " +
                          (isRecommended
                            ? "bg-sky-600 text-white border-sky-600 font-semibold"
                            : "bg-white border-slate-200 text-slate-500")
                        }
                      >
                        {isRecommended && <span className="mr-0.5">★</span>}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


/* =========================================================================
   【通勤圏エリア抽出】事業所住所＋エリア一覧→30/45/60分圏内のエリア抽出
   ========================================================================= */

const CommuteAreaTab = () => {
  const [address, setAddress] = useState("");
  const [areaList, setAreaList] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);

  const run = async () => {
    setError("");
    setOutput(null);

    if (!address.trim()) {
      setError("事業所の住所を入力してください");
      return;
    }
    if (!areaList.trim()) {
      setError("エリア一覧を貼り付けてください");
      return;
    }

    setLoading(true);
    try {
      const systemPrompt = `あなたは日本の地理・交通事情に精通した通勤距離分析の専門家です。
ユーザーから提供される「事業所の住所」と「市区町村のエリア一覧」を元に、
事業所からの**車での通勤所要時間**を一般道（高速道路を使わない前提）で推定し、以下3つのカテゴリに分類してください。

【分類カテゴリ】
- ★ 30分圏内：事業所から一般道で約30分以内で到達可能な市区町村
- ★ 45分圏内：30分圏外で、約45分以内で到達可能な市区町村
- ★ 60分圏内：45分圏外で、約60分以内で到達可能な市区町村
- ☓ 60分超：60分を超える市区町村（参考表示）

【分析ルール】
- 一般道（国道・県道）使用前提（高速道路・有料道路は使わない）
- 市街地は平均25-30km/h、郊外は35-40km/h程度の速度を想定
- 各市区町村の中心部（市役所・町役場周辺）までの所要時間で判定
- 信号待ち・道路状況（山間部・渋滞しやすい区間）も考慮
- 距離だけでなく、実際の道路ネットワーク（橋・トンネル・峠など）を考慮
- 推定値であり±5-10分程度の誤差があることを念頭に
- ユーザーが提供したエリア一覧の市区町村のみを対象とする（リストにないエリアは追加しない）

【出力形式】
JSON形式のみで返してください。前置き・後付けの説明文は不要。

{
  "facility_address": "（入力された事業所住所）",
  "analysis_summary": "（事業所周辺の地理的特徴を1〜2行で）",
  "areas_30min": [
    {"name": "市区町村名", "estimated_minutes": 推定分数, "note": "補足（任意）"}
  ],
  "areas_45min": [
    {"name": "市区町村名", "estimated_minutes": 推定分数, "note": "補足（任意）"}
  ],
  "areas_60min": [
    {"name": "市区町村名", "estimated_minutes": 推定分数, "note": "補足（任意）"}
  ],
  "areas_over_60min": [
    {"name": "市区町村名", "estimated_minutes": 推定分数}
  ],
  "caveat": "推定値のため、実際の所要時間とは差異がある可能性があります。最終確認はGoogleマップ等での実測を推奨します。"
}`;

      const userContent = `【事業所の住所】
${address}

【エリア一覧】
${areaList}

上記エリア一覧の各市区町村について、事業所からの一般道（高速道路を使わない）での車通勤所要時間を推定し、30分圏内・45分圏内・60分圏内・60分超に分類してください。`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: "user", content: userContent }],
        }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      let text = data.content
        .map((item) => (item.type === "text" ? item.text : ""))
        .filter(Boolean)
        .join("\n");
      text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      const f = text.indexOf("{");
      const l = text.lastIndexOf("}");
      if (f !== -1 && l !== -1) text = text.substring(f, l + 1);
      const parsed = JSON.parse(text);
      setOutput(parsed);
    } catch (e) {
      setError("生成に失敗しました：" + (e.message || ""));
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const doCopy = async (text, key) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // エリアを改行区切り＋カンマ区切りでコピー用テキスト作成
  const formatAreasForCopy = (areas) => {
    if (!areas || areas.length === 0) return "";
    return areas.map((a) => a.name).join("\n");
  };

  const formatAllAreas = () => {
    if (!output) return "";
    const lines = [];
    lines.push(`■ 事業所：${output.facility_address}`);
    if (output.analysis_summary) lines.push(`■ 概要：${output.analysis_summary}`);
    lines.push("");
    lines.push("─────── ★ 30分圏内 ───────");
    output.areas_30min?.forEach((a) => lines.push(`${a.name}（約${a.estimated_minutes}分）${a.note ? " ※" + a.note : ""}`));
    lines.push("");
    lines.push("─────── ★ 45分圏内 ───────");
    output.areas_45min?.forEach((a) => lines.push(`${a.name}（約${a.estimated_minutes}分）${a.note ? " ※" + a.note : ""}`));
    lines.push("");
    lines.push("─────── ★ 60分圏内 ───────");
    output.areas_60min?.forEach((a) => lines.push(`${a.name}（約${a.estimated_minutes}分）${a.note ? " ※" + a.note : ""}`));
    if (output.areas_over_60min?.length > 0) {
      lines.push("");
      lines.push("─────── ☓ 60分超（参考） ───────");
      output.areas_over_60min.forEach((a) => lines.push(`${a.name}（約${a.estimated_minutes}分）`));
    }
    return lines.join("\n");
  };

  const AreaList = ({ title, areas, color, copyKey }) => {
    if (!areas || areas.length === 0) return null;
    const colorClasses = {
      green: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", badge: "bg-emerald-600" },
      yellow: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-600" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", badge: "bg-orange-600" },
      gray: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", badge: "bg-slate-500" },
    };
    const c = colorClasses[color];
    return (
      <div className={`${c.bg} ${c.border} border rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`${c.badge} text-white text-xs font-bold px-2 py-0.5 rounded`}>{areas.length}件</span>
            <h3 className={`text-sm font-bold ${c.text}`}>{title}</h3>
          </div>
          <button
            onClick={() => doCopy(formatAreasForCopy(areas), copyKey)}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] border rounded transition ${
              copiedKey === copyKey
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            {copiedKey === copyKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copiedKey === copyKey ? "コピー済" : "エリア名のみコピー"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
          {areas.map((a, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between bg-white px-2.5 py-1.5 rounded border border-slate-200 text-sm"
              title={a.note || ""}
            >
              <span className="font-medium text-slate-900 truncate mr-2">{a.name}</span>
              <span className="text-[10px] text-slate-500 whitespace-nowrap font-mono">約{a.estimated_minutes}分</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
        <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-700 leading-relaxed">
          事業所の住所と、ジョブメドレーのスカウト画面からコピーしたエリア一覧を入力すると、<b className="text-teal-700">事業所からの一般道での通勤所要時間（30分・45分・60分圏内）</b>に分類して抽出します。スカウトメール送信時のターゲティングリスト作成にお使いください。
        </div>
      </div>

      {/* 注意事項 */}
      <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <b className="text-amber-700">精度について：</b>AIによる推定値のため、±5〜10分程度の誤差があります。山間部・離島は精度が落ちる場合があります。最終的な確認は<a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline text-teal-600 mx-1">Googleマップ</a>での実測を推奨します。
          </div>
        </div>
      </div>

      {/* 入力エリア */}
      <div className="space-y-4 mb-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            ① 事業所の住所
            <span className="text-rose-600 text-xs">*</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="例：京都府京都市中京区烏丸通御池下る虎屋町566-1"
            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 ring-teal-200 transition"
          />
          <p className="text-[11px] text-slate-500 mt-1.5">
            事業所の正確な住所（市区町村まで含む）を入力してください。
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-teal-600" />
              ② エリア一覧
              <span className="text-rose-600 text-xs">*</span>
            </label>
            <span className="text-xs text-slate-500">{areaList.length.toLocaleString()} 文字</span>
          </div>
          <textarea
            value={areaList}
            onChange={(e) => setAreaList(e.target.value)}
            placeholder={`ジョブメドレーのスカウト画面でエリア選択画面を開き、表示された市区町村一覧をそのままコピペ\n\n例：\n京都市\n京都市北区\n京都市上京区\n京都市左京区\n福知山市\n舞鶴市\n綾部市\n...`}
            className="w-full h-48 bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 ring-teal-200 transition resize-y"
          />
          <p className="text-[11px] text-slate-500 mt-1.5">
            ジョブメドレーのスカウト画面の「希望勤務地」セクションで、対象都道府県を選んだ際に表示される市区町村リストをそのままコピペしてください。
          </p>
        </div>
      </div>

      <ErrorBox error={error} />

      <button
        onClick={run}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-teal-500/30 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            通勤圏を分析中...
          </>
        ) : (
          <>
            <Target className="w-4 h-4" />
            通勤圏エリアを抽出
          </>
        )}
      </button>

      {/* 出力エリア */}
      {output && (
        <div className="mt-6 space-y-4">
          {/* サマリー */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-teal-700 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">事業所</div>
                <div className="text-sm font-semibold text-slate-900">{output.facility_address}</div>
                {output.analysis_summary && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{output.analysis_summary}</p>
                )}
              </div>
            </div>

            {/* 集計バッジ */}
            <div className="mt-3 flex flex-wrap gap-2">
              <div className="bg-white px-3 py-1.5 rounded-md border border-emerald-200 text-xs">
                <span className="text-emerald-700 font-bold">30分圏内</span>
                <span className="text-slate-700 ml-1.5">{output.areas_30min?.length || 0}件</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-md border border-amber-200 text-xs">
                <span className="text-amber-700 font-bold">45分圏内</span>
                <span className="text-slate-700 ml-1.5">{output.areas_45min?.length || 0}件</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-md border border-orange-200 text-xs">
                <span className="text-orange-700 font-bold">60分圏内</span>
                <span className="text-slate-700 ml-1.5">{output.areas_60min?.length || 0}件</span>
              </div>
              {output.areas_over_60min?.length > 0 && (
                <div className="bg-white px-3 py-1.5 rounded-md border border-slate-200 text-xs">
                  <span className="text-slate-600 font-bold">60分超</span>
                  <span className="text-slate-700 ml-1.5">{output.areas_over_60min.length}件</span>
                </div>
              )}
            </div>
          </div>

          {/* 全体コピー */}
          <div className="flex justify-end">
            <button
              onClick={() => doCopy(formatAllAreas(), "all")}
              className={
                "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition " +
                (copiedKey === "all"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-700")
              }
            >
              {copiedKey === "all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === "all" ? "コピー済" : "全体（注釈付き）コピー"}
            </button>
          </div>

          {/* エリアリスト */}
          <AreaList title="★ 30分圏内（一般道）" areas={output.areas_30min} color="green" copyKey="30min" />
          <AreaList title="★ 45分圏内（一般道）" areas={output.areas_45min} color="yellow" copyKey="45min" />
          <AreaList title="★ 60分圏内（一般道）" areas={output.areas_60min} color="orange" copyKey="60min" />
          <AreaList title="☓ 60分超（参考）" areas={output.areas_over_60min} color="gray" copyKey="over60min" />

          {/* 注釈 */}
          {output.caveat && (
            <div className="text-[11px] text-slate-500 italic p-3 bg-slate-50 border border-slate-200 rounded">
              ※ {output.caveat}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   メインアプリ
   ========================================================================= */

const TABS = [
  { id: "new", label: "新規作成", icon: Plus, desc: "情報入力→全12フィールド" },
  { id: "rewrite", label: "リライト", icon: PenLine, desc: "ペースト or URL" },
  { id: "catch", label: "キャッチコピー", icon: Zap, desc: "3案生成" },
  { id: "section", label: "フィールド別", icon: Layers, desc: "部分編集" },
  { id: "scout", label: "スカウトメール", icon: Mail, desc: "原稿→メール変換" },
  { id: "commute", label: "通勤圏抽出", icon: Target, desc: "30/45/60分圏内" },
];

const PLATFORMS = [
  {
    id: "jobmedley",
    label: "ジョブメドレー",
    sublabel: "医療・福祉・美容系",
    description: "管理画面の12フィールドに即貼り付け可能な原稿を生成",
    accentColor: "teal",
  },
  {
    id: "airwork",
    label: "エアワーク",
    sublabel: "総合求人媒体",
    description: "4パターン×4トーンで独自性のあるキャッチコピーと原稿を生成",
    accentColor: "rose",
  },
  {
    id: "indeed",
    label: "Indeed",
    sublabel: "検索エンジン型求人",
    description: "Indeed直接投稿用の原稿。SEOキーワード最適化・冒頭150文字訴求凝縮",
    accentColor: "sky",
  },
];

export default function App() {
  const [platform, setPlatform] = useState("jobmedley");
  const [tab, setTab] = useState("new");

  const currentPlatform = PLATFORMS.find((p) => p.id === platform);
  const isJobMedley = platform === "jobmedley";
  const isAirwork = platform === "airwork";
  const isIndeed = platform === "indeed";

  // プラットフォーム別の色設定
  const colorMap = {
    jobmedley: {
      ambient1: "bg-teal-400/20",
      ambient2: "bg-cyan-400/20",
      iconBg: "bg-teal-500",
      label: "text-teal-600",
      title: "text-teal-500",
      tabBorder: "border-teal-500",
      tabText: "text-teal-600",
      tabBg: "bg-teal-50",
    },
    airwork: {
      ambient1: "bg-rose-400/20",
      ambient2: "bg-amber-400/20",
      iconBg: "bg-rose-700",
      label: "text-rose-700",
      title: "text-rose-700",
      tabBorder: "border-rose-700",
      tabText: "text-rose-700",
      tabBg: "bg-rose-50",
    },
    indeed: {
      ambient1: "bg-sky-400/20",
      ambient2: "bg-blue-400/20",
      iconBg: "bg-sky-600",
      label: "text-sky-700",
      title: "text-sky-600",
      tabBorder: "border-sky-600",
      tabText: "text-sky-700",
      tabBg: "bg-sky-50",
    },
  };
  const c = colorMap[platform];

  return (
    <div
      className="min-h-screen w-full bg-slate-50 text-slate-900"
      style={{ fontFamily: '"Zen Kaku Gothic New", "Hiragino Sans", "Noto Sans JP", sans-serif' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap"
      />

      {/* ambient gradient (platform-aware) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={
            "absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 " +
            c.ambient1
          }
        />
        <div
          className={
            "absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 " +
            c.ambient2
          }
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-8 md:py-10">
        {/* ===== ヘッダー ===== */}
        <header className="mb-6 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3 mb-1">
            <div
              className={
                "w-11 h-11 flex items-center justify-center rounded-full transition-colors " + c.iconBg
              }
            >
              {isIndeed ? (
                <Briefcase className="w-5 h-5 text-white" />
              ) : (
                <Feather className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <div
                className={
                  "text-[10px] uppercase tracking-widest font-semibold transition-colors " + c.label
                }
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {currentPlatform.sublabel} · Manuscript Studio
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                <span className={c.title}>{currentPlatform.label}</span>
                原稿作成ツール
              </h1>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-2">{currentPlatform.description}</p>
        </header>

        {/* ===== プラットフォーム切替（メインタブ） ===== */}
        <div className="mb-6">
          <div className="flex gap-0 border-b-2 border-slate-200 overflow-x-auto">
            {PLATFORMS.map((p) => {
              const active = platform === p.id;
              const pc = colorMap[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setPlatform(p.id);
                    if (p.id === "jobmedley") setTab("new");
                    else if (p.id === "airwork") setTab("airwork_main");
                    else setTab("indeed_main");
                  }}
                  className={
                    "flex items-center gap-2 px-5 md:px-7 py-3 text-sm md:text-base font-bold transition border-b-4 -mb-0.5 whitespace-nowrap " +
                    (active
                      ? `${pc.tabBorder} ${pc.tabText} ${pc.tabBg}`
                      : "border-transparent text-slate-400 hover:text-slate-600")
                  }
                >
                  {p.id === "jobmedley" ? (
                    <Briefcase className="w-4 h-4" />
                  ) : p.id === "airwork" ? (
                    <Feather className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                  <div className="text-left">
                    <div>{p.label}</div>
                    <div className="text-[10px] font-normal opacity-70">{p.sublabel}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== ジョブメドレー側 ===== */}
        {isJobMedley && (
          <>
            {/* 仕様注意 */}
            <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <b className="text-amber-700">訴求文フィールドの重要仕様：</b>出力は1行HTML形式。ジョブメドレー管理画面にそのまま貼り付ければ、改行で崩れることなくデザインが適用されます。他フィールドは通常改行OK。
              </div>
            </div>

            {/* サブタブ */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-6">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`group relative border rounded-lg p-3 text-left transition-all ${
                      active
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100/50"
                    }`}
                  >
                    {active && <div className="absolute top-0 left-0 w-full h-0.5 bg-teal-400 rounded-t-lg" />}
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${active ? "text-teal-400" : "text-slate-500"}`} />
                      <span className={`text-sm font-bold ${active ? "text-slate-900" : "text-slate-700"}`}>{t.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{t.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* タブコンテンツ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6">
              {tab === "new" && <NewTab />}
              {tab === "rewrite" && <RewriteTab />}
              {tab === "catch" && <CatchTab />}
              {tab === "section" && <SectionTab />}
              {tab === "scout" && <ScoutMailTab />}
              {tab === "commute" && <CommuteAreaTab />}
            </div>
          </>
        )}

        {/* ===== エアワーク側 ===== */}
        {isAirwork && (
          <>
            {/* エアワーク用サブタブ */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => setTab("airwork_main")}
                className={`group relative border rounded-lg p-3 text-left transition-all ${
                  tab === "airwork_main" || tab !== "image"
                    ? "border-rose-700 bg-rose-50 ring-2 ring-rose-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                {(tab === "airwork_main" || tab !== "image") && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-rose-700 rounded-t-lg" />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Feather
                    className={`w-4 h-4 ${tab === "airwork_main" || tab !== "image" ? "text-rose-700" : "text-slate-500"}`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      tab === "airwork_main" || tab !== "image" ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    エアワーク原稿作成
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">4パターン×4トーンで原稿生成</div>
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6">
              <AirworkStudio />
            </div>
          </>
        )}

        {/* ===== Indeed側 ===== */}
        {isIndeed && (
          <>
            {/* Indeed用サブタブ */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => setTab("indeed_main")}
                className={`group relative border rounded-lg p-3 text-left transition-all ${
                  tab === "indeed_main" || tab !== "image"
                    ? "border-sky-600 bg-sky-50 ring-2 ring-sky-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                {(tab === "indeed_main" || tab !== "image") && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-sky-600 rounded-t-lg" />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase
                    className={`w-4 h-4 ${tab === "indeed_main" || tab !== "image" ? "text-sky-700" : "text-slate-500"}`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      tab === "indeed_main" || tab !== "image" ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    Indeed原稿作成
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">14フィールド・装飾型原稿</div>
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6">
              <IndeedStudio />
            </div>
          </>
        )}

        <footer
          className="mt-10 pt-5 border-t border-slate-200 text-[10px] tracking-[0.2em] text-slate-400 uppercase text-center"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          Manuscript Studio
        </footer>
      </div>
    </div>
  );
}

