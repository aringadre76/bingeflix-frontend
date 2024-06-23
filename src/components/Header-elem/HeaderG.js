
// Header.js
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Search from './Search';
import DropdnAcc from './Dropdown/Dropdn_Acc';
import DropdnSchedule from './Dropdown/Dropdn_Schedule';

const ConditionalComponent = ({ path, children }) => {
  const location = useLocation();

  if (location.pathname !== path) {
    return null; // Hide the component if pathname does not match
  }

  return (
    <div>
      {children}
    </div>
  );
};

const injectMovie = async (userName, email, moviesList, linkie) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/injectTest`;
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
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

const GHeader = ({ addToWatchlist }) => {
  const location = useLocation();
  const [link, setLink] = useState('');  // Initialize state for the link
  const [name, setName] = useState(''); //Initialize the title
  const [showType, setShowType] = useState(''); // Add state for showType
  const [isGoToLinkVisible, setGoToLinkVisible] = useState(true);
  const [areButtonsVisible, setButtonsVisible] = useState(true);

  const pathname = location.pathname.slice(1)


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
  };
  
  const handleShowTypeReceived = (receivedShowType) => {
    setShowType(receivedShowType);
  };
  const handleName = (receivedName) => {
      setName(receivedName);
  }
  const handleGoToLinkClick = () => {
    window.open(link, '_blank');
    setGoToLinkVisible(false);
  };
  
  const links = [
    { path: '/home', label: 'Home' },
    { path: '/seasons/construction', label: 'Seasons' },
    { path: '/recommend/construction', label: 'Recommendations' },
    { path: '/sports', label: 'Sports' },
    { path: '/lists/construction', label: 'A-Z Lists' },
    { path: '/under_construction', label: 'About' }
  ];

  return (
    <nav className="absolute top-0 w-full bg-transparent p-4 z-20">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        {/* Clickable Website Logo */}
        <a href="/home" className="flex items-center z-30" >
          <img src="logo.png" alt="Logo" className="h-12 md:h-16 w-auto mr-2 cursor-pointer"/>
          <span className="text-white text-xl md:text-3xl font-semibold">BINGEFLIX {pathname}</span>
        </a>
        {/* Search Bar, now with a proper callback for receiving the link */}
        <ConditionalComponent path="/home">
        <Search onSearchComplete={handleLinkReceived} onSearchTitle={handleName} onSearchShowType={handleShowTypeReceived}/>
        </ConditionalComponent>
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

export default GHeader;
