const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.OPENAI_API_KEY; // Access the env variable
  
  // Prepare a request to the OpenAI API
  const prompt = "Write a short greeting message";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
      max_tokens: 50,
      temperature: 0.7
    })
  });

  const data = await response.json();

  // Extract the generated text from the response
  const generatedText = data.choices && data.choices[0]?.message?.content || "No response";

  return {
    statusCode: 200,
    body: JSON.stringify({ message: generatedText })
  };
};
