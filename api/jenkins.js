export default async function handler(req, res) {
  const { message } = req.body;
  const reply = "Thanks for reaching out to Right Choice Real Estate! I'm Jenkins, your assistant. What property are you looking to sell?";
  res.status(200).json({ reply });
}
