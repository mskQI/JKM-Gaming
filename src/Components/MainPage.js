import React, { useState, useEffect, useCallback } from 'react';
import NewFrontPage from './NewFrontPage';
import { Unity, useUnityContext } from 'react-unity-webgl';
import FrontPage from './FrontPage';

const MainPage = () => {
    const [showUnity, setShowUnity] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [unityMessage, setUnityMessage] = useState('');


    const [matchId, setMatchId] = useState("Room1");
    const [matchId2, setMatchId2] = useState("Room1's Match");
    const [username, setUsername] = useState("Player1");      
    const [username2, setUsername2] = useState("Player2");    
    const [playerCount, setPlayerCount] = useState(2);


    const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded } = useUnityContext({
        loaderUrl: "Build/WebGL_Builds.loader.js",
        dataUrl: "Build/WebGL_Builds.data",
        frameworkUrl: "Build/WebGL_Builds.framework.js",
        codeUrl: "Build/WebGL_Builds.wasm",
    });


    const handleStartGame = (option) => {
        setSelectedOption(option);
        setShowUnity(true);
        //console.log(JSON.stringify({ matchId, username, playerCount }));
    };


    const handleUnityMessage = useCallback((message) => {
        setUnityMessage(message);
        console.log("Message from Unity:", message);
        // Handle the message as needed
    }, []);


    const handleHideUnity = useCallback(() => {
        setShowUnity(false);
        setUnityMessage('');
        console.log("Unity component hidden");
        //handleSendMessage();
    }, []);


    useEffect(() => {
        if (isLoaded && selectedOption) {
            handleChoosePlayerMode(selectedOption);
        }
    }, [isLoaded, selectedOption]);


    useEffect(() => {
        window.EndUnityGame = handleHideUnity; // Make the function globally accessible
        addEventListener("ReactFunction", handleUnityMessage);


        return () => {
            removeEventListener("ReactFunction", handleUnityMessage);
            delete window.EndUnityGame;
        };
    }, [addEventListener, removeEventListener, handleUnityMessage, handleHideUnity]);


    function handleChoosePlayerMode(option) {
        switch (option) {
            case 'Option1':
                sendMessage("MatchMakingManager", "JoinMatch", JSON.stringify({ matchId2, username2 }));
                break;
            case 'Option2':
                sendMessage("MatchMakingManager", "CreateMatch", JSON.stringify({ matchId, username, playerCount }));
                break;
            case 'Option3':
                sendMessage("MatchMakingManager", "JoinMatch", JSON.stringify({ matchId2, username2 }));
                break;
            default:
                sendMessage("MatchMakingManager", "JoinMatch", JSON.stringify({ matchId2, username2 }));
        }
    }


 /*   function handleSendMessage() {
        // Get the Unity instance
        var unityInstance = document.querySelector("canvas").unityInstance;


        // Send a test message to Unity
        unityInstance.SendMessage("MatchMakingManager", "TestCreateMatch");
        unityInstance.SendMessage("MatchMakingManager", "TestJoinMatch");
    }*/


    return (
        <div>
            {showUnity ? (
                <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100vh" }} />) : (
                <FrontPage onStartGame={handleStartGame} />
                )}
        </div>
    );
};


export default MainPage;