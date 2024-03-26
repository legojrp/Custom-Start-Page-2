import React from 'react';
import { useJSONData } from './JSONDataContext';


function Search(props){ // contains search bar
    const {jsonData, setJSONData} = useJSONData();
    const handleSearch = (event) => { // handleSearch decides how to open the link
        event.preventDefault(); // prevent form from submitting normally
        const searchText = event.target.q.value; // the text that is submitted

        if (searchText.startsWith('http')) { // if the link uses http or https (starts with http) assume it is a valid url
            window.open(searchText, '_blank'); // open the text as a url in a new tab
        } else if (searchText.includes('.')) { // if the text contains a . assume it has a domain, but no protocol
            window.open(`https://${searchText}`, '_blank'); // open text with added https protocol in a new tab
        } else { // if the text does not contain http or . assume it is a search
            window.open(`https://www.${jsonData.Settings.searchEngine}.com/search?q=${searchText}`, '_blank'); // does a google search
        }

    };

    return (
        <form onSubmit={handleSearch} style={{ width: '100%' }}> {/* when submitted, handleSearch decides how to open the link*/}
            <input type="text" placeholder="" id="q" name="q" autoFocus autoComplete="off" style={props.style} onFocus={props.onFocus}/>
        </form>
    );
    
}

export default Search;