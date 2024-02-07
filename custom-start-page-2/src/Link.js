import Card from 'react-bootstrap/Card';
function Link(props) {
    return (
        <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text> 
                        <a href={props.url} target="_blank">{props.name}</a> {/* opens the link in new tab */}
                    </Card.Text>
                </Card>
        </div>    
    );

}
export default Link;

function LinkPile(){

    return (
        <div>
            <p>LinkPile</p>
        </div>
    );

}
