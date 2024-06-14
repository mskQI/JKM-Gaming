const removePlayerFromRoom = async (roomId, player) => {
    const roomRef = db.collection('rooms').doc(roomId);
    await roomRef.update({
      players: firebase.firestore.FieldValue.arrayRemove(player)
    });
    console.log(`Player removed from room: ${roomId}`);
  };
  