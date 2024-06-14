// src/firebaseUtils.js
import { db } from './firebaseConfig';
import {getDocs, addDoc, deleteDoc, doc, collection, updateDoc, increment,onSnapshot } from 'firebase/firestore';

const roomRef = collection(db, "Rooms");

// Function to subscribe to room updates
const subscribeToRooms = (callback) => {
    console.log("hello.........");
    return onSnapshot(roomRef, (snapshot) => {
        const rooms = [];
        snapshot.forEach(doc => {
            rooms.push({ id: doc.id, ...doc.data() });
        });
        callback(rooms);
    });
};

const GetRooms = async () => {
    const snapshot = await getDocs(roomRef);
    const rooms = [];
    snapshot.docs.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });
    
    return rooms;
}
const GetRoomCount = async () => {
    const rooms = await getDocs(roomRef);
    console.log("rooms: " + rooms.docs.length)
    return rooms.docs.length
}


// Function to create a room
const createRoom = async (roomName, maxPlayers) => {
    maxPlayers = parseInt(maxPlayers)
    await addDoc(roomRef, {
        name: roomName,
        maxPlayers: maxPlayers,
        players: 0
      });

  return roomRef.id; // Return the room ID for further use
};

// Function to add a player to a room
const addPlayerToRoom = async (roomId) => {

    const roomDocRef = doc(db, "Rooms", roomId);
    await updateDoc(roomDocRef, {
        players: increment(1)
    });
};

// Function to remove a player from a room
const removePlayerFromRoom = async (roomId, player) => {
    const roomDocRef = doc(db, "Rooms", roomId);
    await updateDoc(roomDocRef, {
        players: increment(-1)
    });
};

export {createRoom, addPlayerToRoom, removePlayerFromRoom, GetRooms, subscribeToRooms};




