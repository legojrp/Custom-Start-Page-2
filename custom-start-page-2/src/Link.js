import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';

export default function Link(props) {
    return (
        <div>
                <Container style={{ width: '18rem' }} onClick={() => window.open(props.url, '_blank')}>
                    <img href={props.url + "/favicon.ico"} alt={props.name}></img>
                    <p> 
                        <a href={props.url} target="_blank">{props.name}</a> {/* opens the link in new tab */}
                    </p>
                </Container>
        </div>    
    );

}

export function LinkPile(props){

    return (
        <Container class="d-flex justify-content-center">
            {props.links}
        </Container>
    );

}

