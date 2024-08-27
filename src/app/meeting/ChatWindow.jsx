import React, { useState, useEffect } from 'react';

function ChatWindow({ socket, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  console.log('messages, message', messages, message)
  useEffect(() => {
    if (socket && selectedUser) {
      // Load the chat history with the selected user
      socket.emit('existChat', { receiver_name: selectedUser.userName });

      // Listen for new messages
      socket.on('loadNewChat', (data) => {
        console.log('data', data)
        if (data.sender_name === selectedUser.userName || data.receiver_name === selectedUser.userName) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });

      socket.on('loadChats', (data) => {
        setMessages(data.chats);
      });

      return () => {
        socket.off('loadNewChat');
        socket.off('loadChats');
      };
    }
  }, [socket, selectedUser]);

  const sendMessage = () => {
    const userName = localStorage.getItem("userName");
    if (message.trim() && socket && userName) {
      const chatMessage = { message, sender_name: userName, receiver_name: selectedUser.userName };
      socket.emit('newChat', chatMessage);
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setMessage('');
    }
  };

  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <h3>Chat with {selectedUser.userName}</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender_name}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '80%', padding: '10px' }}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage} style={{ width: '20%', padding: '10px' }}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
