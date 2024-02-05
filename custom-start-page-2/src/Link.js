function Link(props) {
    return (
        <div>
            <label>
                <a href={props.href} target="_blank">{props.text}</a> {/* opens the link in new tab */}
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
