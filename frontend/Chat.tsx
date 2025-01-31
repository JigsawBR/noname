import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const Chat = ({ matchId }: { matchId: string }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.emit('join_room', matchId);
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [matchId]);

  const sendMessage = () => {
    socket.emit('send_message', { room: matchId, text: message });
    setMessage('');
  };

  return (
    <div className="chat">
      {messages.map((msg, index) => (
        <div key={index}>{msg.text}</div>
      ))}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};