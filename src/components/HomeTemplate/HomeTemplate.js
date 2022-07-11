import React, {useEffect, useState} from "react";
import Search from '../SearchBar/SearchBar';
import {useParams, Outlet } from 'react-router-dom';
import './homeTemplate.css';


function HomeTemplate() {
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvseries, setTvseries] = useState([]);
    const [all, setAll] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [trending, setTrending] = useState([]);
    
    const { type } = useParams();

    // retrieve data from localStorage or fetch if none
    useEffect(() => {
        const jsonStorage = localStorage.getItem('data');
        let items = [];
        if (jsonStorage) {
            items = JSON.parse(jsonStorage);
        } 
        if (items.length > 0) {
            setData(items);
        } else {
            getItemsData();
        }
    }, []);

    // set localStorage
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    // update arrays when data changes
    useEffect(() => {
        // reset arrays before updating
        setAll([]);
        setMovies([]);
        setTvseries([]);
        setBookmarks([]);
        setTrending([]);
        handleData(data);
    }, [data]);

    async function getItemsData() {
        try {
            const requestUrl = `/data.json`;
            const response = await fetch(requestUrl, {
                method: 'GET',
            });
            const jsonItems = await response.json();
            setData(jsonItems);
        } catch(e) {
            console.log(e);
        }
    }

    const handleData = (data) => {
        // populating the corresponding arrays
        //ideally, I would have fetched the data based on the category, the first time the user clicked on a category
        if (data.length) {
            for (let item of data) {
                setAll((prev) => ([...prev, item]));
                if (item.category === 'Movie') {
                    setMovies((prev) => ([...prev, item]));
                } else if (item.category === 'TV Series') {
                    setTvseries((prev) => ([...prev, item]));
                }
               
                if (item.isTrending) {
                    setTrending((prev) => ([...prev, item]));
                }
                if (item.isBookmarked) {
                    setBookmarks((prev) => ([...prev, item]));
                }
            } 
        }
    }
    
    return (
            <div>
                <Search type={type}/>
                {
                    tvseries.length && movies.length && all.length && trending.length && bookmarks &&
                    <Outlet context={[data, setData, movies, tvseries, bookmarks, all, trending]} />
                }
            </div>
    );
}

export default HomeTemplate;