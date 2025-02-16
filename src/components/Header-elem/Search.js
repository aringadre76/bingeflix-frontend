// Search.js
import React, { useState } from 'react';

function Search({ onSearchComplete, onSearchTitle, onSearchShowType }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
    
        try {
            // First get the streaming link
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getLink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ searchText: searchInput })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Search result:", data);

            // Pass the data back to parent component
            onSearchComplete(data.link);
            onSearchTitle(data.name);
            onSearchShowType(data.showType);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <form id="search" className="flex-grow mx-4 relative" onSubmit={handleSearch}>
            <input
                type="text"
                name="query"
                placeholder="Search..."
                className="bg-gray-700 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:shadow-outline pr-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </form>
    );
}

export default Search;
