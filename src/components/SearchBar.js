import React, { useState } from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        console.log("Form submitted, searching for:", searchQuery);
        
        try {
            // First, get the streaming link
            const searchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getLink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ searchText: searchQuery })
            });

            if (!searchResponse.ok) {
                const errorText = await searchResponse.text();
                console.error('Search response not OK:', searchResponse.status, errorText);
                throw new Error(`Search error! status: ${searchResponse.status}`);
            }

            const searchResult = await searchResponse.json();
            console.log("Search result:", searchResult);

            // Only proceed to inject if we got valid search results
            if (searchResult.link && searchResult.name) {
                console.log("Found movie, adding to list:", searchResult);
                
                // Now add to user's list
                const injectResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/injectTest`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        moviesList: [searchResult.name],
                        linkie: searchResult.link
                    })
                });

                if (!injectResponse.ok) {
                    const errorText = await injectResponse.text();
                    console.error('Inject response not OK:', injectResponse.status, errorText);
                    throw new Error(`Inject error! status: ${injectResponse.status}`);
                }
                
                const injectResult = await injectResponse.json();
                console.log("Movie added successfully:", injectResult);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="...">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="..."
            />
            <button type="submit" className="...">
                Search
            </button>
        </form>
    );
};

export default SearchBar; 