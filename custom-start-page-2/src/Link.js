import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import {Row, Col} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import App from './App.js';
/**
 * Function to render a link component.
 *
 * @param {object} props - "name" and "url" 
 * @return {JSX.Element} Link component
 */
export default function Link(props) {

// props:
// name - name of the link
// url - url of the linl
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Row>
                <Col 
                    xs={12} 
                    className="border d-flex justify-content-center align-items-center rounded-5 px-2 py-2 ml-3 mr-3" // ok some border + rounding stuff here, centered h and v, and some padding and margins to add some space, + also width helps
                    style={{ marginTop: "10px", marginLeft: "20px", width:"auto", marginRight: "10px"}}
                    onClick={() => window.open(props.url, '_blank')}> {/* opens the link in new tab */}
                            <img className=" px-1 " src={props.url + "/favicon.ico"} alt="" width= "45"/>
                            <div className='px-1 '>{props.name}</div> {/* opens the link in new tab */}


                </Col>
            </Row>
        </div>  

    );

}

/**
 * Renders a pile of links in a container.
 *
 * @param {Object} props - the properties object containing links to be rendered, overflow if it is a overflow pile
 * @return {JSX.Element} the rendered link pile container
 */
export function LinkPile(props){
 // Yo you are lucky
 // you know why?
 // Because i documented this crap

    
    const [links, setLinks] = useState([]); // links array so they can be returned every render

    useEffect(() => { // on render, allocate links accordingly
        const screenWidth = window.innerWidth; // idk why this is above the if statement but dont question it it is just constants
        const numOfLinks = Math.round(((screenWidth / 100)) ** 1.15); // so thta it populates more links the wider the screen is 
        //desmos link: https://www.desmos.com/calculator/mnofgra6su

        setLinks(props.links); // set the links beforehand so if the if statement is not true it doesn't be null
        if (props.overFlow){ // if the prop is true
            setLinks( props.links.slice(0, numOfLinks)); // set the links to the calculated number above
            if (typeof props.overFlowHandle === 'function') { // if this isnt here react breaks
                props.overFlowHandle(props.links.slice(numOfLinks, props.links.length));  // set the overflow pile, and call the function to essentially make another link pile below the search bar
            }
        }
    }, []);
    

    return (
        <Container className="d-flex justify-content-center" // container holding the links, centered
            style={{ display: "flex", flexWrap: "wrap" }}>
            {links} {/* link pile rendered */}
        </Container>
    );

}

