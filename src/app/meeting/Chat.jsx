import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserList from './UserList';
import ChatWindow from './ChatWindow';


function Chat() {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log('socket, onlineUsers, selectedUsers', socket, onlineUsers, selectedUser)
  useEffect(() => {
    // Retrieve the token and userName from localStorage
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token && userName) {
      console.log('Token sent to server:', token);
      const newSocket = io('http://localhost:8008/user-namespace', {
        auth:  {token} 
      });
      console.log('new socket', newSocket)
      setSocket(newSocket);

      // Listen for online users list updates
      newSocket.on('updateUserList', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <UserList users={onlineUsers} onUserSelect={setSelectedUser} />
      {selectedUser && <ChatWindow socket={socket} selectedUser={selectedUser} />}
    </div>
  );
}

export default Chat;
