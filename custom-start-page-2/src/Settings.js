import { Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react"; 
import { useJSONData } from './JSONDataContext';
function Settings({ show, setShow }){ // to be inside the modal for settings

    const settingsContainerStyle = {
        overflowY: 'scroll',
        overflowX: 'hidden',
        transition: 'width 0.5s ease',
        width: show ? '40vw' : '0px',
        backgroundColor: 'whitesmoke',
    }

    const settingsStyle = {
        display: show ? 'block' : 'none',
        transition: 'display 0.5s allow-discrete', 
    }

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
        setShow(false);
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
            return <ALink name={link.name} url={link.url} key={index} id={index}></ALink>;
        }))
        console.log(links);
    }, [jsonData]);

    const newLink = () => {
        if (jsonData != undefined) {
            setJSONData(prevJSON => {
                let data = {...prevJSON}; // create a copy of the previous state
                data.userData.links.push({name: "", url: ""});
                return data; // return the updated state
            });
        }
    }    

    return (
        <div style={settingsContainerStyle}>
            <div style={settingsStyle}>
                <p>Settings</p>
                
            
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
                            <option value="Google">Google</option>
                            <option value="DuckDuckGo">DuckDuckGo</option> 
                            <option value="Bing">Bing</option>
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
                <Button variant="primary" onClick={newLink} className='m-1'>Add Link</Button>
                {links}
                

                    </>
                    : <p>Sorry! Something went wrong try again later!</p>} 
                    {/* if you notice the colon it is a ternary */}
                
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={save}>
                    Save Changes
                </Button>
            </div>

        </div>
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
    const {jsonData, setJSONData} = useJSONData();
    // const containerRef = useRef(null);

    // useEffect(() => {
    //     return () => {
    //         if (containerRef.current) {
    //             ReactDOM.unmountComponentAtNode(containerRef.current);
    //         }
    //     };
    // }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (jsonData != undefined) {
            setJSONData(prevJSON => {
                let data = {...prevJSON}; // create a copy of the previous state
                data.userData.links[props.id][name] = value;
                return data; // return the updated state
            });
            
        }
    }

    const deleteSelf = () => {
        if (jsonData != undefined) {
            setJSONData(prevJSON => {
                let data = {...prevJSON}; // create a copy of the previous state
                data.userData.links.splice(props.id, 1);
                return data; // return the updated state
            });

            setEditMode(false);            
        }
    }


    const linkStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
    }
    
    const editLinkStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
    }
    
    return (
        <>
            {editMode ? 
                // This is if edit mode is on
                <div style={editLinkStyle}>
                    <input type="text" name="name" value={jsonData.userData.links[props.id].name} onChange={onChange}/>
                    <input type="text" name="url" value={jsonData.userData.links[props.id].url} onChange={onChange}/>
                    <div>
                        <button onClick={() => setEditMode(false)}>Done</button>
                        <button onClick={() => deleteSelf()}>Delete</button>
                    </div>
                </div>
            :
                // This is if edit mode isnt on
            <div style={linkStyle}>
                <p>{jsonData.userData.links[props.id] && jsonData.userData.links[props.id].name}</p>
                <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
            }
        </>

    )
}