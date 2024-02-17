import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

function SignIn(props) {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setShow(false);
        props.handle("handleSigninHide");
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

    const save = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch("http://192.168.0.244:3002/backend/signin.php", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                window.location.href = `?token=${data.token}`;
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
            else {
                alert(data.status);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            {/* ... */}
            <Modal.Header closeButton>
            <Modal.Title> Sign In!</Modal.Title>
    </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicUsername" className='p-1'>
                        {/* ... */}
                        <Form.Control 
                            type="username" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className='p-1'>
                        {/* ... */}
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </Form.Group>
                </Form>    
            </Modal.Body>
            {/* ... */}
            <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Submit
                    </Button>
            </Modal.Footer>
        </Modal>
    )
} 
export default SignIn;