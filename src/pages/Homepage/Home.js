import React, {useEffect, useState, useRef} from "react";
import {useParams, useOutletContext } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';

function Home() {
    const [data, setData, movies, tvseries, bookmarks, all, trending] = useOutletContext();
    const [currentData, setCurrentData] = useState([]);

    const { type } = useParams(); // which page from the menu to render

    const getMainTitle = (type) => {
        switch(type) {
            case 'movies':
                return 'Movies';
            case 'tvseries':
                return 'TV Series';
            case 'bookmarks':
                return 'Bookmarked Movies'
            default:
                return 'Recommended for you'; //for movies & tv series (router 6 doesn't have optional path '?')
        }
    };

    // update currentData with the corresponding list for the page selected
    function getData() {
        let currentCategory;
        if (type==='movies') {
            currentCategory = movies;
        } else if (type==='tvseries') {
            currentCategory = tvseries;
        } else if (type==='bookmarks') {
            currentCategory = bookmarks;
        } else {
            currentCategory = all;
        }

        return currentCategory; 
    }

    // update the lists when data changes (when changing the page / toggling isBookmarked)
    useEffect(() => {
        const currentCategory = getData();
        setCurrentData(currentCategory);
    }, [type, bookmarks]);

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

    const trendingRef = useRef();
   
    const handleTrendingScroll = e => {
        e.preventDefault();
        
        const containerScrollPosition = trendingRef.current.scrollLeft;
        trendingRef.current.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
          behaviour: "smooth"
        });
    };

    // add the horizontal scroll for trending, when on the main page (!type)
    useEffect(() => {
        const trending = trendingRef.current;
        if (!type && trending) {
            trending.addEventListener('wheel', handleTrendingScroll, { passive: false });
            return () => {
                trending.removeEventListener('wheel', handleTrendingScroll, { passive: false });
            };
        }
      }, [type]);

    return (
        <div>
            {/* if on home, display trending */}
            {!type && (
                <div className="trending-section">
                    <h2 className="heading-l">Trending</h2>
                    <div className='trendings-container' ref={trendingRef}>
                    {
                        trending.map(movie => (
                            <Movie handleToggleBookmark={handleToggleBookmark} trending={true} movie={movie} key={`${movie.title}`} />
                        ))
                    }
                    </div>
                </div>
            )}
            <div className="list-container">
                <h2 className="heading-l">{getMainTitle(type)}</h2>
                {
                currentData.length > 0 ? (

                <div className='movies-container'>
                    { currentData.map(movie => (
                        <Movie handleToggleBookmark={handleToggleBookmark} movie={movie} key={`${movie.title}`} />
                    
                    )) }
                </div>
                ) : (
                    <p>No {getMainTitle(type)} available.</p>
                )}
            </div>
        </div>
    )
}

export default Home;