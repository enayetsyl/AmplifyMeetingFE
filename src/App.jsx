import React, { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [breakoutRooms, setBreakoutRooms] = useState([]);
  const localVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnections = useRef({});

  useEffect(() => {
    if (inRoom) {
      socketRef.current = new ReconnectingWebSocket('wss://89.116.159.133:3000');

      socketRef.current.onopen = () => {
        console.log('WebSocket connection opened');
        socketRef.current.send(JSON.stringify({ type: 'join-room', roomId, name }));
      };

      socketRef.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log('Received message:', data);
        // Handle message types...
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      socketRef.current.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
    }
  }, [inRoom, roomId, name]);

  const joinRoom = async () => {
    if (roomId && name) {
      setInRoom(true);
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera and microphone. Please check permissions.');
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Zoom-like App</h1>
      {!inRoom && (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-2"
          />
          <button onClick={joinRoom} className="bg-blue-500 text-white p-2">Join Room</button>
        </div>
      )}
      {inRoom && (
        <div>
          <video ref={localVideoRef} autoPlay muted className="w-1/2 h-auto mb-4"></video>
          <div id="remoteVideos" className="flex flex-wrap"></div>
          <button onClick={() => socketRef.current.send(JSON.stringify({ type: 'create-breakout-room', roomId }))} className="bg-green-500 text-white p-2">Create Breakout Room</button>
          <div className="flex flex-col">
            {breakoutRooms.map(room => (
              <button key={room} onClick={() => socketRef.current.send(JSON.stringify({ type: 'join-breakout-room', roomId, breakoutRoomId: room, name }))} className="bg-yellow-500 text-black p-2 m-2">{`Join Breakout Room: ${room}`}</button>
            ))}
          </div>
          <button onClick={() => socketRef.current.send(JSON.stringify({ type: 'end-breakout-room', roomId }))} className="bg-orange-500 text-white p-2">End Breakout Room</button>
          <button onClick={() => socketRef.current.send(JSON.stringify({ type: 'end-meeting', roomId }))} className="bg-red-500 text-white p-2">End Meeting</button>
        </div>
      )}
    </div>
  );
};

export default App;
