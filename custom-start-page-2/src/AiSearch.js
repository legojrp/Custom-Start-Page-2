function AiSearch(props){ // contains search bar
    const handleSearch = (event) => { // handleSearch decides how to open the link
        event.preventDefault(); // prevent form from submitting normally
        const searchText = event.target.q.value; // the text that is submitted
        window.open(`https://www.phind.com/search?q=${searchText}`, '_blank');
    };

    return (
        <form onSubmit={handleSearch}> {/* when submitted, handleSearch decides how to open the link*/}
            <input type="text" placeholder="Ai Search" id="q" name="q" autoComplete="off" style={props.style} onFocus={props.onFocus}/>
        </form>
    );


}

export default AiSearch;