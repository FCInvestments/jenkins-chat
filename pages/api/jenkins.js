// pages/api/jenkins.js
import { OpenAI } from "openai";

// Initialize OpenAI with your API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Jenkins, a friendly and professional assistant from Right Choice Real Estate. You help homeowners explore selling their properties. Keep responses under 80 words and always helpful.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: "Jenkins is thinking too hard right now. Try again soon!" });
  }
}
