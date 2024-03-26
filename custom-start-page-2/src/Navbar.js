import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Settings from "./Settings.js";



function CustomNav(props) {
   const [handle, setHandle] = useState(undefined);

   useEffect(() => {
       setHandle(props.handle);
   });


  return (
    <Navbar expand="lg" style={{backgroundColor: 'whitesmoke', height: '10vh', boxShadow: '0px 2px 5px gray'}}>
      <Container className=''>
        <Navbar.Brand href="#home">Start Page</Navbar.Brand>
        <div className="right-nav" id="basic-navbar-nav">
            <Button onClick={() => props.handle && props.handle("handleSettingShow")} className='m-1'>Settings</Button>
            <Button onClick={() => props.handle && props.handle("handleSigninShow")} className='m-1'>Sign In!</Button>
        </div>

      </Container>
    </Navbar>
  );
}

export default CustomNav;