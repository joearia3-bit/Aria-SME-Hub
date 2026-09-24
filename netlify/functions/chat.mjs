export default {
  async fetch(request, env) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("ARIA SME HUB AI is running.", {
        status: 200,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }

    try {
      const body = await request.json();
      const message = body.message;

      if (!message) {
        return new Response(
          JSON.stringify({
            error: "Please provide a message."
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      // Check that an AI binding exists
      if (!env.AI) {
        return new Response(
          JSON.stringify({
            error: "AI service is not connected yet."
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      // Send the user's question to Cloudflare Workers AI
      const response = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct",
        {
          messages: [
            {
              role: "system",
              content:
                "You are ARIA SME HUB AI, an assistant designed to help people in Papua New Guinea understand business, entrepreneurship, employment, skills development, SME opportunities, markets and practical ways to create income. Give clear, practical and responsible answers. The user interface is English, but understand Tok Pisin and other PNG-language input where possible. Respond mainly in English."
            },
            {
              role: "user",
              content: message
            }
          ]
        }
      );

      return new Response(
        JSON.stringify({
          success: true,
          reply: response.response
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};
