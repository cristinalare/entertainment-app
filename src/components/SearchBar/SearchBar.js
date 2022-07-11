import './search.css';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Search({type}) {
    
    const [inputValue, setInputValue] = useState('');

    function getPlaceholderText(type) {
        if (type === 'movies') {
            return 'Search for movies';
        } else if (type === 'tvseries') {
            return 'Search for TV series';
        } else if (type === 'bookmarks') {
            return 'Search for bookmarked shows'
        } else {
            return 'Search for movies or TV series';  //for movies & tv series 
        }  
    }

    const navigate = useNavigate();
    const onSearchHandler = (type) => {
        const searchQuery = new URLSearchParams({
            name: inputValue
        }).toString();

        if (type) {
            navigate(`/${type}/search?${searchQuery}`);
        } else {
            navigate(`/search?${searchQuery}`);
        }
        setInputValue('');
    }

    return (
        <div className="search-container">
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF"/></svg>
            <input 
                className="heading-m"
                type='text' 
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder={getPlaceholderText(type)} 
                enterKeyHint='search'
                onKeyPress={event => event.key === 'Enter' && onSearchHandler(type)}
            />
        </div>  
    );
}

export default Search;