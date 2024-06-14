import { db } from './firebase';

const createRoom = async (roomName, maxPlayers) => {
  const roomRef = db.collection('rooms').doc();
  await roomRef.set({
    name: roomName,
    maxPlayers: maxPlayers,
    players: []
  });
  console.log(`Room created with ID: ${roomRef.id}`);
};
