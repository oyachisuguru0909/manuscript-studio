// OpenAI画像生成API用のプロキシ
// DALL-E 3 / GPT-Image-1 に対応

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: {
            type: "config_error",
            message:
              "OPENAI_API_KEY が設定されていません。Vercelの環境変数で設定してください。",
          },
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
    console.error("OpenAI image proxy error:", error);
    return new Response(
      JSON.stringify({
        error: {
          type: "proxy_error",
          message: error.message || "画像生成中にエラーが発生しました",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
