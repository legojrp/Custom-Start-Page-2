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
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Button onClick={() => props.handle && props.handle("handleSettingShow")}>Settings</Button>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default CustomNav;