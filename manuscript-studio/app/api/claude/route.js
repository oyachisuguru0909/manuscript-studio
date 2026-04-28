// このAPIルートは、ブラウザからのリクエストを受けて
// サーバー側に保管されたAPIキーでAnthropic APIを呼び出すプロキシです
// → APIキーがブラウザに公開されないため安全

export async function POST(request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: {
            type: "config_error",
            message:
              "ANTHROPIC_API_KEY が設定されていません。Vercelの環境変数で設定してください。",
          },
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return new Response(
      JSON.stringify({
        error: {
          type: "proxy_error",
          message: error.message || "APIリクエスト中にエラーが発生しました",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
