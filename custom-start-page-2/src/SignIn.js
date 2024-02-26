import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

function SignIn(props) {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
        setError(null);

        fetch("http://192.168.0.221/Custom-Start-Page-2/backend/backend_dev/signin.php", {
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
                throw new Error("Invalid username or password");
            }
        })
        .catch((error) => {
            setError(error);
        });
    }

    const saveSignUp = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        setError(null);

        fetch("http://192.168.0.221/Custom-Start-Page-2/backend/backend_dev/signup.php", {
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
                throw new Error("Invalid username or password");
            }
        })
        .catch((error) => {
            setError(error);
        })
    }



    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            {/* ... */}
            <Modal.Header >{/* Close button to remain OFF!!! for sake of them signing in */}
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
                {error && <p>{error.message}</p>}
            </Modal.Body>
            {/* ... */}
            <Modal.Footer>
                    <Button variant="warning" onClick={saveSignUp}>
                        Sign Up
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Sign In
                    </Button>
            </Modal.Footer>
        </Modal>
    )
} 
export default SignIn;