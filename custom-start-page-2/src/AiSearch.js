function AiSearch(props){ // contains search bar
    const handleSearch = (event) => { // handleSearch decides how to open the link
        event.preventDefault(); // prevent form from submitting normally
        const searchText = event.target.q.value; // the text that is submitted
        window.open(`https://www.phind.com/search?q=${searchText}`, '_blank'); // uses phind because it allows for search through link
    };

    return (
        <form onSubmit={handleSearch} style={{ width: '100%' }}> {/* when submitted, handleSearch decides how to open the link*/}
            <input type="text" placeholder="" id="q" name="q" autoComplete="off" style={props.style} onFocus={props.onFocus}/>
        </form>
    );


}

export default AiSearch;