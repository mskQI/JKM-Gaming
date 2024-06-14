import React from 'react';
import '../css/Logo.css';
import Logo from '../images/logo.png';


const LogoImage = () => {
    return (
        <div className="logo-container" style={{height: "200px"}}>
            <img src={Logo} alt="Game Logo" className="logo"/>
        </div>
    );
};

export default LogoImage;