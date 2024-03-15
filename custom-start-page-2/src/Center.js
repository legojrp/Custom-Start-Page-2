import React, {useState} from 'react';
import Search from "./Search";
import AiSearch from "./AiSearch";

function Center() {
    const [searchFocused, setSearchFocused] = useState(true);
    const [aiSearchFocused, setAiSearchFocused] = useState(false);
  
    const handleSearchFocus = () => {
        setSearchFocused(true);
        setAiSearchFocused(false);
    };
  
    const handleAiSearchFocus = () => {
        setAiSearchFocused(true);
        setSearchFocused(false);
    };
  
    const handleSwap = () => {
      setSearchFocused(!searchFocused);
      setAiSearchFocused(!aiSearchFocused);
    };
    
    const searchContainerStyle = {
        transition: 'transform 0.5s ease',
        transform: !searchFocused ? 'translateY(150%)' : 'translateY(0)',
    };
    
    const aiSearchContainerStyle = {
        transition: 'transform 0.5s ease',
        transform: aiSearchFocused ? 'translateY(-66%)' : 'translateY(0)',
    };

    const SearchStyle = {
        transition: 'width 0.5s ease, height 0.5s ease, padding 0.5s ease, margin 0.5s ease',
        width: searchFocused ? '75%' : '25%',
        height: searchFocused ? '25px' : '15px',
        padding: searchFocused ? '25px' : '15px',
        margin: '5px',
        border: '0px none whitesmoke',
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
    }

    const aiSearchStyle = {
        transition: 'width 0.5s ease, height 0.5s ease, padding 0.5s ease, margin 0.5s ease',
        width: aiSearchFocused ? '75%' : '25%',
        height: aiSearchFocused ? '25px' : '15px',
        padding: aiSearchFocused ? '25px' : '15px',
        margin: '5px',
        border: '0px none whitesmoke',
        backgroundColor: 'whitesmoke',
        borderRadius: '25px',
    }
    
    return (
        <div className='text-center'>
            <div className="search-container" style={searchContainerStyle}>
                <Search onFocus={handleSearchFocus} style={SearchStyle}/>
            </div>
            <div className="ai-search-container" style={aiSearchContainerStyle}>
                <AiSearch onFocus={handleAiSearchFocus} style={aiSearchStyle} />
            </div>
        </div>
    );
}


export default Center;