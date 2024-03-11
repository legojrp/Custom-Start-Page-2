import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react"; 
import { useJSONData } from './JSONDataContext';
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

    const {jsonData, setJSONData} = useJSONData();

    const save = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        fetch("https://flying-dog-wildly.ngrok-free.app/Custom-Start-Page-2/backend/backend_dev/save.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token : token, settings : jsonData}) })
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
        handleClose();
        setTimeout(() => {
    window.location.reload();
}, 500);

    }

    const [links, setLinks] = useState(null);

    useEffect(() => {
        if (!jsonData|| !jsonData.userData||!jsonData.userData.links ) {
            console.log(jsonData);
            return;
        }
        setLinks(jsonData.userData.links.map((link, index) => {
            return <ALink name={link.name} url={link.url} key={index}></ALink>;
        }))
        console.log(links);
    }, [jsonData]);


    return (
 
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title> Settings</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
            {/* if you notice it is a ternary, checking if there is data, otherwise show an error */}
            {jsonData ? 
            <>
        <Form>
            <ASetting
            name="searchEngine"
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
            label="Greeting"
            as="input"
            type="text"
            ></ASetting>
        </Form>

        {links}

            </>
            : <p>Sorry! Something went wrong try again later!</p>} 
            {/* if you notice the colon it is a ternary */}
        
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

const {jsonData, setJSONData} = useJSONData();

const onChange = (e) => {
    const { name, value } = e.target;
    if (jsonData != undefined) {
        setJSONData(prevJSON => {
            let data = {...prevJSON}; // create a copy of the previous state
            data.Settings[name] = value;
            return data; // return the updated state
        });
        
    }
}

    return (
        <Form.Group as={Row}>
            <Col sm="6" className="d-flex align-items-center">
                <Form.Label title="Hey!">{props.label}</Form.Label>
            </Col>
            <Col sm="6"> 
                <Form.Control onChange={onChange} as={props.as} type="props.type" name={props.name} value={jsonData && jsonData.Settings && jsonData.Settings[props.name]}>
                    {props.control}
                </Form.Control>
            </Col>
        </Form.Group>
    )
}

export { ASetting };

function ALink(props){
    // props:
    // name - name of the link
    // url - url of the linl
    
    const [editMode, setEditMode] = useState(false);

    const deleteSelf = () => {
        props.delete(props.id);
    }
    
       
    
    return (
    <>
        {/* This is if edit mode isnt on */}

        {editMode ? 
        <div className="d-flex justify-content-center align-items-center border" >
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                <input type="text" name="name" value={props.name}/>
                <input type="text" name="url" value={props.url}/>
            </div>
                <button onClick={() => setEditMode(false)}>Done</button>
                <button onClick={() => deleteSelf()}>Delete</button>
        </div>
        :
            <>
        {/* This is if edit mode is on */}
        <div className="d-flex justify-content-center align-items-center border" >
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                <p>{props.name}</p>
                <p>{props.url}</p>
            </div>

            <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
        
            </>
}
    </>

    )
}