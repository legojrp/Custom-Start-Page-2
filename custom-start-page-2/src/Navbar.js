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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className=''>
        <Navbar.Brand href="#home">Custom Start Page v2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="right-nav" id="basic-navbar-nav">
            <Button onClick={() => props.handle && props.handle("handleSettingShow")} className='m-1'>Settings</Button>
            <Button onClick={() => props.handle && props.handle("handleSigninShow")} className='m-1'>Sign In!</Button>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default CustomNav;