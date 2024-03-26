import React, { useState } from 'react';
import Search from "./Search";
import AiSearch from "./AiSearch";

function Center() {
    const [searchFocused, setSearchFocused] = useState(true); // starts with search focused and on top
    const [aiSearchFocused, setAiSearchFocused] = useState(false);
  
    const handleSearchFocus = () => { // when search is focused
        setSearchFocused(true); 
        setAiSearchFocused(false);
    };
  
    const handleAiSearchFocus = () => { // when ai search is focused
        setAiSearchFocused(true);
        setSearchFocused(false);        
    };
  

    const centerContainerStyle = { // center container
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    
    const searchContainerStyle = { // search container
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.5s ease, width 0.5s ease, height 0.5s ease, padding 0.5s ease, margin 0.5s ease',
        transform: !searchFocused ? 'translateY(200%)' : 'translateY(0)',
        width: searchFocused ? '75%' : '25%',
        height: searchFocused ? '25px' : '15px',
        padding: searchFocused ? '25px' : '15px',
        paddingLeft: searchFocused ? '20px' : '10px',
        margin: '5px',
        border: '0px none whitesmoke',
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
    };

    const aiSearchContainerStyle = { // ai search container
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.5s ease, width 0.5s ease, height 0.5s ease, padding 0.5s ease, margin 0.5s ease',
        transform: !searchFocused ? 'translateY(-80%)' : 'translateY(0)',
        width: aiSearchFocused ? '75%' : '25%',
        height: aiSearchFocused ? '25px' : '15px',
        padding: aiSearchFocused ? '25px' : '15px',
        paddingLeft: aiSearchFocused ? '20px' : '10px',
        margin: '5px',
        border: '0px none whitesmoke',
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
    };

    const searchStyle = { // search style
        transition: 'width 0.5s ease',
        width: '100%',
        border: '0px none whitesmoke',
        backgroundColor: 'whitesmoke',
    }
        
    return (
        <div className='text-center' style={centerContainerStyle}>
            <div className="search-container" style={searchContainerStyle}>
                <i class="bi bi-search" style={{ paddingRight: '5px'}}></i> {/* search icon */}
                <Search onFocus={handleSearchFocus} style={searchStyle}/> 
            </div>
            <div className="ai-search-container" style={aiSearchContainerStyle}>
                <i class="bi bi-stars" style={{ paddingRight: '5px'}}></i> {/* sparkle icon */}
                <AiSearch onFocus={handleAiSearchFocus} style={searchStyle}/>
            </div>
        </div>
    );
}


export default Center;