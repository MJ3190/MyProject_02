const fetch = require('node-fetch'); // Import node-fetch

exports.handler = async (event) => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Get API key from Netlify env variables
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // OpenAI endpoint

  try {
    // Parse user input (from query string or body)
    const userPrompt = event.queryStringParameters.prompt || "Hello!";
    
    // OpenAI API request payload
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Specify GPT-4o model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 150 // Adjust output length
      })
    });

    const data = await response.json();

    // Return the result from OpenAI
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data.choices[0].message.content.trim() })
    };

  } catch (error) {
    // Return error message
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate content", details: error.message })
    };
  }
};
