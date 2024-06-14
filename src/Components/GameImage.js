import React from 'react';
import '../css/GameImage.css';

const GameImage = () => {
    return (
        <div className="game-image-container">
            <img src="../images/background-big.png" alt="Game Image" className="game-image" style={{height: "120rem"}} />
        </div>
    );
};

export default GameImage;