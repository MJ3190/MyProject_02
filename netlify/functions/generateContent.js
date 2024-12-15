const fetch = require("node-fetch");

exports.handler = async (event) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Replace with "gpt-3.5-turbo" if needed
                messages: [{ role: "user", content: "Hello, what is 2+2?" }],
                max_tokens: 50,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API error:", errorText);
            return { statusCode: response.status, body: `OpenAI API Error: ${errorText}` };
        }

        const data = await response.json();
        console.log("API Response:", data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: data.choices[0]?.message?.content || "No content" }),
        };
    } catch (error) {
        console.error("Function error:", error);
        return {
            statusCode: 500,
            body: `Function Error: ${error.message}`,
        };
    }
};
