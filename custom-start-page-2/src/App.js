import Container from "react-bootstrap/esm/Container.js";
import CustomNav from "./Navbar.js";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";
import Center from "./Center.js";
import Link from "./Link.js";

import {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState([null]);
  const [linkPile, setLinkPile] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/backend/requests.php", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any other required headers
          },
          credentials: 'include', // Use 'include' if you need to send cookies
        });
        const result = await response.json();
        setData(result);
        console.log(result);
       
        for (let i = 0; i < data.userData.links.length; i++) {
          linkPile.push(<Link name={data.userData.links[i].name} url={data.userData.links[i].url}></Link>);
        }
      } catch (error) {
        console.log(error);
      }

    };
  
    fetchData();
  }, []);
  

  return (
    <div className="App">
      <CustomNav></CustomNav>
      <Container fluid className="d-flex flex-column justify-content-between" style={{ minHeight: '80vh' }}>
        <Row className="mt-4">
          <Col>
            {/* {linkPile} */}
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
          <div className="text-center">
            <Link href="https://www.google.com/" text="Google"></Link> {/* test to open link in new tab */}
            <h2>Above Content</h2>
            <p>Content above the centered component.</p>
          </div>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
