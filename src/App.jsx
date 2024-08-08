import { useState, useEffect, useRef } from 'react';

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

function App() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);
  const [peerConnections, setPeerConnections] = useState({});
  const [currentBreakoutRoomId, setCurrentBreakoutRoomId] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [breakoutRooms, setBreakoutRooms] = useState([]);
  const [isBreakoutRoom, setIsBreakoutRoom] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRefs = useRef({});

  const connectSocket = () => {
    const socketConnection = new WebSocket('wss://89.116.159.133:3000');
  
    socketConnection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);
      switch (data.type) {
        case 'room-joined':
          handleRoomJoined(data);
          break;
        case 'new-participant':
          handleNewParticipant(data);
          break;
        case 'update-breakout-rooms':
          updateBreakoutRooms(data.breakoutRooms);
          break;
        case 'offer':
          handleOffer(data.offer, data.sender);
          break;
        case 'answer':
          handleAnswer(data.answer, data.sender);
          break;
        case 'ice-candidate':
          handleIceCandidate(data.candidate, data.sender);
          break;
        case 'participant-left':
          removeParticipant(data.name);
          break;
        case 'meeting-ended':
          handleMeetingEnded();
          break;
        default:
          break;
      }
    };
  
    socketConnection.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    return socketConnection;
  };
  
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const joinRoom = async () => {
    if (roomId && name) {
      setIsInCall(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
  
        const socketConnection = connectSocket();
        setSocket(socketConnection);
  
        socketConnection.onopen = () => {
          socketConnection.send(JSON.stringify({ type: 'join-room', roomId, name }));
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera and microphone. Please check permissions.');
      }
    }
  };

  const createBreakoutRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'create-breakout-room', roomId }));
    }
  };

  const joinBreakoutRoom = (breakoutRoomId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setCurrentBreakoutRoomId(breakoutRoomId);
      // Close existing peer connections
      Object.values(peerConnections).forEach(pc => pc.close());
      setPeerConnections({});
      setRemoteStreams({});
      socket.send(JSON.stringify({ type: 'join-breakout-room', roomId, breakoutRoomId, name }));
    }
  };

  const returnToMainRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setCurrentBreakoutRoomId(null);
      // Close existing peer connections
      Object.values(peerConnections).forEach(pc => pc.close());
      setPeerConnections({});
      setRemoteStreams({});
      socket.send(JSON.stringify({ type: 'return-to-main-room', roomId, name }));
    }
  };

  const endBreakoutRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (currentBreakoutRoomId) {
        socket.send(JSON.stringify({ type: 'end-breakout-room', roomId, breakoutRoomId: currentBreakoutRoomId }));
        setCurrentBreakoutRoomId(null);
      } else {
        socket.send(JSON.stringify({ type: 'end-breakout-room', roomId }));
      }
    }
  };

  const endMeeting = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'end-meeting', roomId }));
    }
  };

  const handleRoomJoined = (data) => {
    updateRoomHeader(data.roomId, data.isBreakoutRoom);
    updateParticipants(data.participants);
    setIsBreakoutRoom(data.isBreakoutRoom);
  
    data.participants.forEach(participant => {
      if (participant.name !== name) {
        createPeerConnection(participant.name);
      }
    });
  };

  const handleNewParticipant = (data) => {
    console.log('New participant joined:', data.name);
    if (data.name !== name) {
      createPeerConnection(data.name);
    }
  };

  const createPeerConnection = (participantName) => {
    if (peerConnections[participantName]) {
      console.log(`Peer connection to ${participantName} already exists`);
      return peerConnections[participantName];
    }
    console.log(`Creating peer connection to ${participantName}`);

    const pc = new RTCPeerConnection(configuration);
    setPeerConnections((prev) => ({ ...prev, [participantName]: pc }));

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        socket.send(
          JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate,
            roomId,
            target: participantName,
          })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log(`Received track from ${participantName}:`, event.track.kind);

      const remoteStream = remoteStreams[participantName] || new MediaStream();

      remoteStream.addTrack(event.track);

      setRemoteStreams((prev) => ({ ...prev, [participantName]: remoteStream }));

      if (!remoteVideoRefs.current[participantName]) {
        remoteVideoRefs.current[participantName] = document.createElement('video');
        remoteVideoRefs.current[participantName].srcObject = remoteStream;
        remoteVideoRefs.current[participantName].autoplay = true;
        remoteVideoRefs.current[participantName].playsInline = true;
        remoteVideoRefs.current[participantName].id = `video-${participantName}`;

        const container = document.createElement('div');
        container.id = `container-${participantName}`;
        container.appendChild(remoteVideoRefs.current[participantName]);

        const nameTag = document.createElement('div');
        nameTag.innerText = participantName;
        container.appendChild(nameTag);

        document.getElementById('remoteVideos').appendChild(container);
      }
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state change:', pc.connectionState);
      if (pc.connectionState === 'failed') {
        console.error('Connection failed for peer:', participantName);
      }
    };

    pc.onnegotiationneeded = () => {
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          socket.send(
            JSON.stringify({
              type: 'offer',
              offer: pc.localDescription,
              roomId,
              target: participantName,
              sender: name,
            })
          );
        })
        .catch((e) => console.error('Error during negotiation:', e));
    };

    return pc;
  };

  const handleOffer = (offer, sender) => {
    console.log(`Handling offer from ${sender}`);
    const pc = peerConnections[sender] || createPeerConnection(sender);

    pc.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => pc.createAnswer())
      .then((answer) => pc.setLocalDescription(answer))
      .then(() => {
        socket.send(
          JSON.stringify({
            type: 'answer',
            answer: pc.localDescription,
            roomId,
            target: sender,
            sender: name,
          })
        );
      })
      .catch((e) => console.error('Error handling offer:', e));
  };

  const handleAnswer = (answer, sender) => {
    console.log(`Handling answer from ${sender}`);

    const pc = peerConnections[sender];
    
    if (pc) {
      pc.setRemoteDescription(new RTCSessionDescription(answer))
        .catch((e) => console.error('Error handling answer:', e));
    }
  };

  const handleIceCandidate = (candidate, sender) => {
    console.log(`Handling ICE candidate from ${sender}`);
    const pc = peerConnections[sender];
    if (pc) {
      pc.addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error('Error adding ICE candidate:', e));
    }
  };

  const removeParticipant = (participantName) => {
    if (peerConnections[participantName]) {
      peerConnections[participantName].close();
      setPeerConnections((prev) => {
        const updated = { ...prev };
        delete updated[participantName];
        return updated;
      });
    }
    const videoElement = document.getElementById(`video-${participantName}`);
    if (videoElement) {
      videoElement.srcObject = null;
      videoElement.parentNode.remove();
    }
  };

  const handleMeetingEnded = () => {
    setIsInCall(false);
    localStream.getTracks().forEach((track) => track.stop());
    setLocalStream(null);
    Object.values(peerConnections).forEach((pc) => pc.close());
    setPeerConnections({});
    setRemoteStreams({});
    setParticipants([]);
  };

  const updateRoomHeader = (roomId, isBreakoutRoom) => {
    const header = document.getElementById('room-header');
    if (isBreakoutRoom) {
      header.textContent = `Breakout Room: ${roomId}`;
    } else {
      header.textContent = `Meeting: ${roomId}`;
    }
  };

  const updateParticipants = (participants) => {
    console.log('Updating participants:', participants);
    setParticipants(participants.map(participant => ({
      name: participant.name,
      id: participant.id
    })));
  };

  const updateBreakoutRooms = (breakoutRooms) => {
    console.log('Updating breakout rooms:', breakoutRooms);
    setBreakoutRooms(breakoutRooms);
  };

  return (
    <div className="App">
      <h1 id="room-header" className="text-2xl font-bold">
        Meeting Room
      </h1>
      {!isInCall ? (
        <div id="room-selection" className="flex flex-col items-center">
          <input
            type="text"
            id="roomId"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mb-2 p-2 border"
          />
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 p-2 border"
          />
          <button onClick={joinRoom} className="px-4 py-2 bg-blue-500 text-white">
            Join Room
          </button>
        </div>
      ) : (
        <div id="video-call" className="flex flex-col items-center">
          <video id="localVideo" autoPlay muted className="mb-4" ref={localVideoRef}></video>
          <div id="remoteVideos" className="flex flex-wrap">
            {Object.keys(remoteStreams).map((key) => (
              <div key={key} id={`container-${key}`} className="flex flex-col items-center">
                <video id={`video-${key}`} autoPlay playsInline ref={(el) => (remoteVideoRefs.current[key] = el)}></video>
                <div>{key}</div>
              </div>
            ))}
          </div>
          {!isBreakoutRoom && (
            <>
              <button id="create-breakout" className="px-4 py-2 bg-green-500 text-white mb-2" onClick={createBreakoutRoom}>
                Create Breakout Room
              </button>
              <button id="end-meeting" onClick={endMeeting} className="px-4 py-2 bg-red-500 text-white">
                End Meeting
              </button>
            </>
          )}
          <div id="breakout-rooms" className="mb-2">
            {breakoutRooms.map((room) => (
              <button key={room} onClick={() => joinBreakoutRoom(room)} className="px-4 py-2 bg-yellow-500 text-white mb-2">
                Join Breakout Room: {room}
              </button>
            ))}
          </div>
          <button id="end-breakout" className="px-4 py-2 bg-orange-500 text-white mb-2" onClick={endBreakoutRoom}>
            End Breakout Room
          </button>
          <button id="return-main-room" className="px-4 py-2 bg-gray-500 text-white mb-2" onClick={returnToMainRoom}>
            Return to Main Room
          </button>
          <ul id="participants" className="list-disc">
            {participants.map(participant => (
              <li key={participant.id}>{participant.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
