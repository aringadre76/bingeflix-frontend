// Header.js
import React, { useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import Search from './Search';

import DropdnAcc from './Dropdown/Dropdn_Acc';
import DropdnSchedule from './Dropdown/Dropdn_Schedule';

const injectMovie = async (userName, email, moviesList, linkie) => {
    const url = 'http://localhost:4000/injectTest';
    const data = {
      userName,
      email,
      moviesList, 
      linkie
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("result: "  + result);
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
};

const Header = ({ addToWatchlist }) => {
    const [link, setLink] = useState('');  // Initialize state for the link
    const [name, setName] = useState(''); // Initialize the title
    const [showType, setShowType] = useState(''); // Add state for showType
    const [isGoToLinkVisible, setGoToLinkVisible] = useState(true);
    const [areButtonsVisible, setButtonsVisible] = useState(true);
    const location = useLocation();

    
    const links = [
        { path: '/home', label: 'Home' },
        { path: '/seasons/construction', label: 'Seasons' },
        { path: '/recommend/construction', label: 'Recommendations' },
        { path: '/sports', label: 'Sports' },
        { path: '/lists/construction', label: 'A-Z Lists' },
        { path: '/under_construction', label: 'About' }
    ];
  
    const handleAddToWatchlist = () => {
        const title = name;
        const type = showType;
        const image = "https://via.placeholder.com/150";
        const url = link;
        console.log('type in header: ' + showType)
        addToWatchlist({ title, type, image, url });
        injectMovie('JohnDoe', 'johndoe@example.com', [title], url);
        setButtonsVisible(false);
    };

    // Function to handle the link received from the Search component
    const handleLinkReceived = (receivedLink) => {
        setLink(receivedLink);  // Update the link state with the received link
        setGoToLinkVisible(true);
        setButtonsVisible(true);
    };

    const handleName = (receivedName) => {
        setName(receivedName);
    };

    const handleShowTypeReceived = (receivedShowType) => {
        setShowType(receivedShowType);
    };

    const handleGoToLinkClick = () => {
        window.open(link, '_blank');
        setGoToLinkVisible(false);
    };

    return (
        <nav className="absolute top-0 z-10 w-full bg-transparent p-4">
            <div className="container mx-auto flex items-center justify-between flex-wrap">
                {/* Clickable Website Logo */}
                <a href="/home" className="flex items-center">
                    <img src="logo.png" alt="Logo" className="h-12 md:h-16 w-auto mr-2 cursor-pointer"/>
                    <span className="text-white text-xl md:text-3xl font-semibold">BINGEFLIX</span>
                </a>

                {/* Search Bar, now with a proper callback for receiving the link */}
                <Search onSearchComplete={handleLinkReceived} onSearchTitle={handleName} onSearchShowType={handleShowTypeReceived} />

                {/* Display the link as a button if it exists */}
                {link && areButtonsVisible && (
                    <div className="flex-grow-0 mr-4 flex space-x-2"> {/* Added flex and space-x-2 to manage spacing */}
                        {isGoToLinkVisible && (
                            <button
                                onClick={handleGoToLinkClick}
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in duration-200"
                            >
                                Go to Link
                            </button>
                        )}
                        
                        <button 
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in duration-200"
                            onClick={handleAddToWatchlist}
                        >
                            Add to Watchlist
                        </button>
                    </div>
                )}

                {/* Menu Items (including 'Popular', etc.) should be wrapped in a flex container */}
                <div className="flex items-center space-x-4">
                {links.map(link => (
                link.path !== location.pathname && (
                    <div key={link.path}>
                    <NavLink to={link.path} activeClassName="active" className="text-white hover:text-gray-400">
                        {link.label}
                    </NavLink>
                    </div>
                )
                ))}
                <DropdnSchedule />
                <DropdnAcc />

                </div>            
                </div>
        </nav>
    );
};

export default Header;
