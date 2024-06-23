// Search.js
import React, { useState } from 'react';

function Search({ onSearchComplete, onSearchTitle, onSearchShowType }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
    
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/injectTest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchText: searchInput })
        });
        const data = await response.json();
        console.log("data: " + data)
        onSearchComplete(data.link); // Assuming the backend sends back an object with a 'msg' property
        onSearchTitle(data.name);
        onSearchShowType(data.showType); // Pass the showType to the parent
    };

    return (
        <form id="search" className="flex-grow mx-4 relative" onSubmit={handleSearch}>
            <input
                type="text"
                name="query"
                placeholder="Search..."
                className="bg-gray-700 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:shadow-outline pr-10"
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </form>
    );
}

export default Search;
