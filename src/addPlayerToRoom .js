const addPlayerToRoom = async (roomId, player) => {
    const roomRef = db.collection('rooms').doc(roomId);
    await roomRef.update({
      players: firebase.firestore.FieldValue.arrayUnion(player)
    });
    console.log(`Player added to room: ${roomId}`);
  };
  