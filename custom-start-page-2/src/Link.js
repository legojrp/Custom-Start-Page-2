function Link(props) {
    return (
        <div>
            <label>
                <a href={props.url} target="_blank">{props.name}</a> {/* opens the link in new tab */}
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
