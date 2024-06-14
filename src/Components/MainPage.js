import React, { useState, useEffect, useCallback } from 'react';
import NewFrontPage from './NewFrontPage';
import { Unity, useUnityContext } from 'react-unity-webgl';

const MainPage = () => {
    const [showUnity, setShowUnity] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [unityMessage, setUnityMessage] = useState('');

    const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded } = useUnityContext({
        loaderUrl: "Build/WebGL_Builds.loader.js",
        dataUrl: "Build/WebGL_Builds.data",
        frameworkUrl: "Build/WebGL_Builds.framework.js",
        codeUrl: "Build/WebGL_Builds.wasm",
    });

    const handleStartGame = (option) => {
        setSelectedOption(option);
        setShowUnity(true);
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
                sendMessage("ReactCommunicator", "ChoosePlayerMode", 4);
                break;
            case 'Option2':
                sendMessage("ReactCommunicator", "ChoosePlayerMode", 6);
                break;
            case 'Option3':
                sendMessage("ReactCommunicator", "ChoosePlayerMode", 10);
                break;
            default:
                sendMessage("ReactCommunicator", "ShowMessage", 2);
        }
    }

    function handleSendMessage() {
        sendMessage("ReactCommunicator", "ShowMessage", "something that is a string!");
    }

    return (
        <div>
            {showUnity ? (
                <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100vh" }} />) : (
                <NewFrontPage onStartGame={handleStartGame} />
                )}
        </div>
    );
};

export default MainPage;