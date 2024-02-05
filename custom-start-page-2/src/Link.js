function Link(props) {
    return (
        <div>
            <label>
                <a href={props.href}>{props.text}</a>
            </label>
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
