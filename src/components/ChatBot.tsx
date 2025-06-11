import { useState, useRef, useEffect } from 'react';

const BOT_NAME = 'MediBot';
const BOT_AVATAR = '🤖';
const USER_AVATAR = '🧑';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm ${BOT_NAME}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [unread, setUnread] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (!collapsed && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setUnread(false);
    }
    // If collapsed and a new bot message arrives, set unread
    if (collapsed && messages.length > 1 && messages[messages.length - 1].role === 'bot') {
      setUnread(true);
    }
  }, [messages, collapsed]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setBotTyping(true);

    // Simulate typing animation
    setTimeout(async () => {
      // Send to API route
      const res = await fetch('api/auth/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
      setBotTyping(false);
    }, 800);
  };

  return (
    <div
      style={{
        width: 340,
        border: '1.5px solid #1976d2',
        padding: 0,
        borderRadius: 18,
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: '#f8fbff',
        boxShadow: '0 4px 24px #1976d233',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        zIndex: 1000,
        transition: 'box-shadow 0.2s',
        ...(collapsed ? { height: 60, width: 180, cursor: 'pointer', overflow: 'hidden' } : {}),
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
          color: '#fff',
          padding: '14px 20px',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          position: 'relative',
          minHeight: 32,
        }}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <span style={{ fontSize: 28 }}>{BOT_AVATAR}</span>
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>{BOT_NAME}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.8 }}>
          {collapsed ? 'Expand' : 'Online'}
        </span>
        <span style={{
          marginLeft: 10,
          fontSize: 18,
          userSelect: 'none',
          transition: 'transform 0.2s',
          transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
        {unread && collapsed && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 18,
              background: '#ff1744',
              color: '#fff',
              borderRadius: '50%',
              width: 18,
              height: 18,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              boxShadow: '0 0 0 2px #fff',
              animation: 'pulse 1s infinite',
            }}
          >
            !
          </span>
        )}
      </div>
      {!collapsed && (
        <>
          {/* Chat Area */}
          <div style={{ maxHeight: 320, overflowY: 'auto', padding: '18px 16px 8px 16px', background: '#f8fbff' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  marginBottom: 10,
                  animation: msg.role === 'bot' ? 'fadeIn 0.5s' : undefined,
                }}
              >
                <span style={{ fontSize: 22, margin: '0 8px' }}>
                  {msg.role === 'user' ? USER_AVATAR : BOT_AVATAR}
                </span>
                <div
                  style={{
                    background: msg.role === 'user' ? '#1976d2' : '#e3f2fd',
                    color: msg.role === 'user' ? '#fff' : '#1976d2',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '10px 16px',
                    maxWidth: 210,
                    fontSize: 15,
                    boxShadow: '0 1px 4px #1976d211',
                    marginLeft: msg.role === 'user' ? 0 : 8,
                    marginRight: msg.role === 'user' ? 8 : 0,
                    transition: 'background 0.2s',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {botTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{BOT_AVATAR}</span>
                <div style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '10px 16px',
                  fontSize: 15,
                  width: 50,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}>
                  <span className="dot-typing" style={{
                    display: 'inline-block',
                    width: 24,
                    textAlign: 'left',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      background: '#1976d2',
                      borderRadius: '50%',
                      marginRight: 2,
                      animation: 'blink 1s infinite alternate',
                    }}></span>
                    <span style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      background: '#1976d2',
                      borderRadius: '50%',
                      marginRight: 2,
                      animation: 'blink 1s 0.2s infinite alternate',
                    }}></span>
                    <span style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      background: '#1976d2',
                      borderRadius: '50%',
                      animation: 'blink 1s 0.4s infinite alternate',
                    }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input Area */}
          <div style={{
            display: 'flex',
            borderTop: '1px solid #e3f2fd',
            padding: '10px 12px',
            background: '#fff',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: 10,
                border: 'none',
                borderRadius: 8,
                outline: 'none',
                fontSize: 15,
                background: '#f4f6f8',
                marginRight: 8,
              }}
              placeholder={`Ask ${BOT_NAME}...`}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Send
            </button>
          </div>
        </>
      )}
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes blink {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #ff174488; }
          70% { box-shadow: 0 0 0 6px #ff174400; }
          100% { box-shadow: 0 0 0 0 #ff174400; }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
