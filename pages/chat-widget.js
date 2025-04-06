import { useState } from 'react';

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    const res = await fetch('/api/jenkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2 style={{ color: '#8cc63e' }}>Chat with Jenkins</h2>
      <div style={{ minHeight: 100, background: '#e4e4e4', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>{msg.text}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage} style={{ marginLeft: 10, backgroundColor: '#8cc63e', color: 'white' }}>Send</button>
    </div>
  );
}
