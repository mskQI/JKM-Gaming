import React, { useState } from 'react';
import Logo from '../images/logo.png';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


const FrontPage = ({ onStartGame }) => {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleStartGame = () => {
        if (selectedOption) {
            onStartGame(selectedOption);
        }
    };
    
    const handleInfo1 = () => {
        setModalContent(`
            <h3>Three Webdevelopers and a little idea.</h3>
            <p>Jeff 30, Mark 31 and Kirstine 36.</p>
            <p>Came together and had an idea to make a game,</p>
            <p>With the help and guidance, from Thomas Volden a professor and student at ITU. </p>
        `);
        setIsModalOpen(true);
    };

    const handleInfo2 = () => {
        setModalContent(`
            <h3>How to play:</h3>
            <p>Choose a class</p>
            <p>Pick an Ability</p>
            <p>Fight your opponent</p>
            <p>Get chests</p>
            <p>Pick More abilities</p>
            <h2>DON'T DIE</h2>
        `);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };
    
    const styles = {
        outerContainer: {
            position: 'relative',
            height: '100vh',
            backgroundColor: '#000000',
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            position: 'relative',
        },
        centerContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        smallLogo: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            height: '80px',
        },
        largeLogo: {
            width: '1000px',
            height: '500px',
        },
        button: {
            padding: '20px 180px',
            fontSize: '20px',
            cursor: 'pointer',
            backgroundColor: '#158c0b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
        },
        infoButton: {
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#158c0b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        infoButtonLeft: {
            left: '100px',
        },
        infoButtonRight: {
            right: '100px',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            textAlign: 'center',
            padding: '10px 0',
        },
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            maxWidth: '500px',
            width: '80%',
            textAlign: 'center',
        },
        closeButton: {
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
        },
    };



    const [selectedOption, setSelectedOption] = useState('Quick match');
      
    const handleSelect = (eventKey) => {
          setSelectedOption(eventKey);
    };
  
    
    const dropdownContainerStyle = {
        display: 'flex',
        width: '200px', // Adjust this value to your desired width
        
      };
    
      const buttonStyle = {
        width: '120px', // Adjust the button width as needed
        textAlign: 'center',
      };
    
      const toggleStyle = {
        width: '30px', // Adjust the toggle width to match the remaining space
      };
    
      const dropdownMenuStyle = {
        width: '700px', // Ensure the menu matches the button width
      };

    return (
        <div style={styles.outerContainer}>
            <img src={Logo} alt="Lille Logo" style={styles.smallLogo} />
            <div style={styles.container}>
                {/* <button style={{ ...styles.infoButton, ...styles.infoButtonLeft }} onClick={handleInfo1}>About The Creators</button> */}
                <div style={styles.centerContent}>
                    <img src={Logo} alt="Stort Logo" style={{width: "50%"}} />


                    {/* <Dropdown as={ButtonGroup} onSelect={handleSelect} style={dropdownContainerStyle}>
                        <Button variant="success" style={buttonStyle}>{selectedOption}</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" style={toggleStyle} />

                        <Dropdown.Menu style={dropdownMenuStyle}>
                            <Dropdown.Item onClick={  onStartGame('Option1')} eventKey="2v2">2v2</Dropdown.Item>
                            <Dropdown.Item onClick={  onStartGame('Option2')}  eventKey="3v3">3v3</Dropdown.Item>
                            <Dropdown.Item  onClick={  onStartGame('Option3')} eventKey="5v5">5v5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>*/}
                    <Button onClick={handleStartGame} variant="success" style={buttonStyle}>Play</Button> 
                   <div>
                        <select style={styles.button} onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                            <option value="Quick match">Quick match</option>
                            <option value="Option1">join</option>
                            <option value="option2">create</option>
                            <option value="Option3">join</option>
                        </select>
                        <button style={styles.button} onClick={handleStartGame}>Play</button>
                    </div>

                </div>
                {/* <button style={{ ...styles.infoButton, ...styles.infoButtonRight }} onClick={handleInfo2}>Game Rules</button> */}
            </div>
            <footer style={styles.footer}>
                <p>&copy; Copyright JKM Games Aps. {currentYear}</p>
            </footer>
            {isModalOpen && (
                <div style={styles.modalOverlay} onClick={closeModal}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <div dangerouslySetInnerHTML={{ __html: modalContent }} />
                        <button style={styles.closeButton} onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrontPage;
