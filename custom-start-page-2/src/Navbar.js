import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function CustomNav() {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Button onClick={handleShow}>Settings</Button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Put settings here */}

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>

    </Modal>
    </Navbar>
  );
}

export default CustomNav;