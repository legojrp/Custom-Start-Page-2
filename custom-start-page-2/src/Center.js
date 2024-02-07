function Center (){
    const handleSearch = (event) => { // handleSearch decides how to open the link
        event.preventDefault(); // prevent form from submitting normally
        const searchText = event.target.q.value; // the text that is submitted

        if (searchText.startsWith('http')) { // if the link uses http or https (starts with http) assume it is a valid url
            window.open(searchText, '_blank'); // open the text as a url in a new tab
        } else if (searchText.includes('.')) { // if the text contains a . assume it has a domain, but no protocol
            window.open(`https://${searchText}`, '_blank'); // open text with added https protocol in a new tab
        } else { // if the text does not contain http or . assume it is a search
            window.open(`https://www.google.com/search?q=${searchText}`, '_blank'); // does a google search
        }
    };

    return (
        <div className="text-center">
            <form onSubmit={handleSearch}> {/* when submitted, handleSearch decides how to open the link*/}
                <input type="text" placeholder="Search" id="q" name="q" autoFocus />
            </form>
        </div>
    );

}

export default Center;