import Container from "react-bootstrap/esm/Container.js";
import CustomNav from "./Navbar.js";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";
import Center from "./Center.js";
import Link, { LinkPile } from "./Link.js";
import Settings from "./Settings.js";
import {useState, useEffect} from 'react';
import SignIn from "./SignIn.js";
import { useJSONData } from './JSONDataContext';

function App() {

  const [linkPile, setLinkPile] = useState(null); // link pile array
  const [overFlow, setOverFlow] = useState(null);
  const {jsonData, setJSONData} = useJSONData();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const fetchData = async () => {
      
      try { // try to fetch
        const response = await fetch("https://flying-dog-wildly.ngrok-free.app/Custom-Start-Page-2/backend/backend_dev/requests.php", { // actually fetching
          method: 'POST',
          body: JSON.stringify({token: token}),
        });
        
        const result = await response.json(); // json text
        setJSONData(result);
          let links = []; // array to be links
          for (let i = 0; i < result.userData.links.length; i++) {
            links.push(<Link name={result.userData.links[i].name} url={result.userData.links[i].url} key={links.length}></Link>); // push links from link.js
          }
          setLinkPile(links);

      } catch (error) { // errors to the console
        console.log(error);
      }

    };
  
    fetchData();
  }, []);
  
  const overFlowHandle = (overFlowLinks) => {
    setOverFlow(overFlowLinks);
  } 

  useEffect(() => {
  }, [linkPile]);
  
  useEffect(() => {
    
  }, [overFlow]);


const handle = (action) => {
  if (action === "handleSettingShow") {
    setSettingsShow(true);
  }
  else if (action === "handleSettingHide") {
    setSettingsShow(false);
  }
  else if (action === "handleSigninShow") {
    setSigninShow(true);
  }
  else if (action === "handleSigninHide") {
    setSigninShow(false);
    console.log("Signin Hide");
  }



}

const [settingsShow, setSettingsShow] = useState(false);

const [signinShow, setSigninShow] = useState(false);



  return (
    <div className="App">
      <CustomNav handle={handle}></CustomNav>
      <Container fluid className="d-flex flex-column justify-content-between" style={{ minHeight: '80vh' }}>
        <Row className="mt-4">
          <Col>
          {linkPile !== null ? ( // Render LinkPile only when linkPile is not null
              <LinkPile links={linkPile} overFlowHandle={overFlowHandle} overFlow={true}></LinkPile>
            ) : (
              <div>Loading links...</div>
            )}
            </Col>
        </Row>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
          <Col xs={12} md={6}>
            {/* Your centered component goes here */}
            <div className="text-center">
              <Center></Center>
            </div>

          </Col>
        </Row>
        <Row className="mt-4">
        <Col>
          {overFlow !== null ? ( // Render LinkPile only when linkPile is not null
                <LinkPile links={overFlow} overFlow={false}></LinkPile>
              ) : (
                <div>Loading links...</div>
              )
          }
          
        </Col>
      </Row>
      </Container>

      <Settings forceShow={settingsShow} handle={handle}></Settings>
      <SignIn forceShow={signinShow} handle={handle}></SignIn>
    </div> 
  );
 
}

export default App;
