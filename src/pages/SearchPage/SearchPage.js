import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams, useOutletContext } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';

function SearchPage() {
    const [data, setData, movies, tvseries, bookmarks, all] = useOutletContext();
    const { type } = useParams(); // which page from the menu to render

    const {search} = useLocation();
    const queryParams = useMemo(() => { 
        return new URLSearchParams(search)
    }, [search]);

    const [results, setResults] = useState([]);
    const [searchString, setSearchString] = useState('');

    // set the search string from the queryParams
    useEffect(() => {
        function getResults() {
            const showsToFind = queryParams.get('name');
            setSearchString(showsToFind);
            const filteredData = resultsData(showsToFind);
            setResults(filteredData);
        }

        getResults();
    }, [queryParams]);

    // display results when the searchString is set
    // useEffect(() => {
    //     displayResults(searchString);
    // }, [searchString]);

    function resultsData(showsToFind) {
        let category = [];
        if (type === 'movies') {
            category = movies;
        } else if (type==='tvseries') {
            category = tvseries;
        } else if (type==='bookmarks') {
            category = bookmarks;
        } else {
            category = all;
        }

        const filteredData = category.filter(item => item.title.toLowerCase().includes(showsToFind.toLowerCase()));
        return filteredData;
    }

    const handleToggleBookmark = (element) => {
        const newData = [...data];
        newData.forEach(data => {
            // find the element
            if (data.title === element.title) {
                // toggle isBookmarked
                if (data.isBookmarked) {
                    data.isBookmarked = false; 
                } else {
                    data.isBookmarked = true;
                }
            }
        });
        
        setData([...newData]);
    }

    if (!results || !searchString) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="list-container">
            <h2 className="heading-l">Found {results.length} results for '{searchString}'</h2>
            <div className='movies-container'>
            {
                results.map(movie => (
                    <Movie handleToggleBookmark={handleToggleBookmark} movie={movie} key={`${movie.title}`} />
                ))
            }
            </div>
        </div>
    )
}

export default SearchPage;