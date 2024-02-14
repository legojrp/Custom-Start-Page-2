import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

function SignIn(props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
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
        formData.append('email', email);
        formData.append('password', password);

        fetch("http://192.168.0.244:3002/backend/signin.php", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            {/* ... */}
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        {/* ... */}
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* ... */}
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Submit
                    </Button>
                </Form>    
            </Modal.Body>
            {/* ... */}
        </Modal>
    )
} 
export default SignIn;