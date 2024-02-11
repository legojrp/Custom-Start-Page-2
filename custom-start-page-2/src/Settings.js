import { Modal, Button, Form, Row, Col } from "react-bootstrap";
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

    const [settings, setSettings] = useState(null);

    useEffect(() => {
        if (props.data) {
            setSettings(props.data);
        }
    });

    const save = () => {
        props.save(settings);
        handleClose();
        setTimeout(() => {
    window.location.reload();
}, 500);

    }

    return (

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title> Settings</Modal.Title>
    </Modal.Header>
    <Modal.Body>
            {/* if you notice it is a ternary, checking if there is data, otherwise show an error */}
            {props.data ? 
            
        <Form>
            <ASetting
            name="searchEngine"
            set={setSettings}
            value={settings}
            label="Search Engine"
            as="select"
            control={
                <>
                    <option value="Bing">Bing</option>
                    <option value="Google">Google</option>
                    <option value="DuckDuckGo">DuckDuckGo</option> 
                </>
            }
            ></ASetting>
            <ASetting
            name="greeting"
            set={setSettings}
            value={settings}
            label="Greeting"
            as="input"
            type="text"
            ></ASetting>
        </Form>

            :<p>Sorry! Something went wrong try again later!</p>} {/* if you notice the colon it is a ternary */}
            
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={save}>
            Save Changes
        </Button>
    </Modal.Footer>

</Modal>
        
    )
} 
export default Settings;

function ASetting(props){
// props:

// name - name of the setting
// onChange - function to change the setting
// value - value of the setting
// label - label of the setting
// as - type of the setting
// control - control of the setting

const [settings, setSettings] = useState(null);

const onChange = (e) => {
    const { name, value } = e.target;
    if (settings != undefined) {
        setSettings(prevSettings => {
            let data = {...prevSettings}; // create a copy of the previous state
            data.Settings[name] = value;
            return data; // return the updated state
        });
    }
}
useEffect(() => {
    setSettings(props.value);
}, [props.value]);
    
    return (
        console.log(settings && settings.Settings && settings.Settings[props.name]),
        <Form.Group as={Row}>
            <Col sm="6" className="d-flex align-items-center">
                <Form.Label title="Hey!">{props.label}</Form.Label>
            </Col>
            <Col sm="6"> 
                <Form.Control onChange={onChange} as={props.as} type="props.type" name={props.name} value={settings && settings.Settings && settings.Settings[props.name]}>
                    {props.control}
                </Form.Control>
            </Col>
        </Form.Group>
    )
}

export { ASetting };