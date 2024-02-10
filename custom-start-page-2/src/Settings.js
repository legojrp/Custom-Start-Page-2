import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function Settings(props){ // to be inside the modal for settings
    
    const [show, setShow] = useState(false);
    


    const handleClose = () => {
        setShow(false);
        props.handle("handleSettingHide");
    }

    const handleShow = () => setShow(true);

    useEffect (() => {
        if (props.forceShow) {
            handleShow();
        }
        else {
            handleClose();
        }
    }, [props.forceShow]);


    return (

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title> Settings</Modal.Title>
    </Modal.Header>
    <Modal.Body>
            {props.data ? "" : <p>Sorry! Something went wrong try again later!</p>}
            Settings
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
        
    )
} 
export default Settings;