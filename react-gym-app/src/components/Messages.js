import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Auto-hide messages after 5 seconds
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setMessages(prev => prev.slice(1)); // Remove the first message
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const addMessage = (message, type = 'info') => {
    const newMessage = {
      id: Date.now(),
      text: message,
      type: type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const removeMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  if (messages.length === 0) return null;

  return (
    <div className="messages">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`msg ${message.type}`}
          onClick={() => removeMessage(message.id)}
          style={{ cursor: 'pointer' }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

// Hook to use messages
export const useMessages = () => {
  const showMessage = (message, type = 'info') => {
    // This would be connected to a context in a real app
    // For now, we'll use a simple event system
    window.dispatchEvent(new CustomEvent('showMessage', { 
      detail: { message, type } 
    }));
  };

  return { showMessage };
};

export default Messages;