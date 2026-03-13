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
        <form id="search" className="relative w-full" onSubmit={handleSearch}>
            <input
                type="text"
                name="query"
                placeholder="Search movies & shows..."
                className="bg-[#1a1a1a] text-white px-4 py-2.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] border border-[#333] placeholder-gray-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoComplete="off"
            />
            <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    );
}

export default Search;
