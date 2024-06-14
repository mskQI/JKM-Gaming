import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {createRoom, addPlayerToRoom, removePlayerFromRoom, GetRooms, subscribeToRooms} from "./firebaseUtils";

const App = () => {
    
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [roomId, setRoomId] = useState('');
    const [player, setPlayer] = useState({ playerId: '', playerName: '' });
  
    useEffect(() => {
        // Subscribe to room updates
        const unsubscribe = subscribeToRooms(setRooms);

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleCreateRoom = () => {
      createRoom(roomName, maxPlayers)
        .then(id => setRoomId(id))
        .catch(error => console.error('Error creating room:', error));
    };
  
    const handleAddPlayer = () => {
      addPlayerToRoom("2jqmPF7MyhvgBXioqsFm")
        .catch(error => console.error('Error adding player:', error));
    };
  
    const handleRemovePlayer = () => {
      removePlayerFromRoom("2jqmPF7MyhvgBXioqsFm")
        .catch(error => console.error('Error removing player:', error));
    };
    const handleGetRooms = async () => {
        const roomArray  = await GetRooms();
        setRooms(roomArray);
        console.log("lenght is: "+roomArray)
        
       // alert(rooms);
    }
   
    const roomList = rooms.map((room, index)=> <h3 key={index}>{room.name}:{room.players}</h3>)


    return (
        <div className="App">
            {/* <MainPage /> */}           
             <div>
                <h1>Create Room</h1>
                <input value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Room Name" />
                <input value={maxPlayers} onChange={e => setMaxPlayers(e.target.value)} placeholder="Max Players" type="number" />
                <button onClick={handleCreateRoom}>Create Room</button>

                <h1>Manage Players</h1>
                  <button onClick={handleAddPlayer}>Add Player</button>
                <button onClick={handleRemovePlayer}>Remove Player</button>
                <button onClick={handleGetRooms}>Get rooms</button>
            </div>
            <div>{rooms.length}{roomList}
             
            </div>
        </div>
    );
};

export default App;