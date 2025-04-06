// pages/api/jenkins.js

console.log("🔔 Jenkins bot triggered by incoming SMS");

let sessions = {};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const from = req.body.From || 'unknown';
  const body = req.body.Body?.trim().toLowerCase();

  // Initialize session
  if (!sessions[from]) {
    sessions[from] = { step: 0, data: {} };
  }

  const session = sessions[from];

  const sendTwiml = (message) => {
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message}</Message></Response>`);
  };

  const reset = () => {
    sessions[from] = { step: 0, data: {} };
  };

  const steps = [
    {
      question: "Hi, this is Jenkins from Right Choice Real Estate. Are you looking to sell a property? (Yes/No)",
      field: "wantsToSell"
    },
    {
      question: "Great! What's the property address?",
      field: "address"
    },
    {
      question: "What's the condition of the property? (Excellent/Good/Fair/Poor)",
      field: "condition"
    },
    {
      question: "Do you currently live there or is it vacant?",
      field: "occupancy"
    },
    {
      question: "What's your ideal asking price?",
      field: "price"
    },
    {
      question: "Thanks! Lastly, what's the best time to call you?",
      field: "callbackTime"
    }
  ];

  // Conversation Flow
  if (session.step >= steps.length) {
    sendTwiml("Thanks for the info! A team member will contact you shortly. 🏡");
    console.log("LEAD DATA:", sessions[from].data);
    reset();
    return;
  }

  const currentStep = steps[session.step];

  if (session.step > 0) {
    session.data[steps[session.step - 1].field] = body;
  }

  sendTwiml(currentStep.question);
  session.step++;
}
