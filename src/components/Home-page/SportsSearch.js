import React, { useState } from 'react';

const addSport = async (sportName, logo, link) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/addSport`;
  const data = {
    sport: {  // Wrap sportName inside sportsList
      sportName,
      logo,
      link
    }
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



const SportsSearch = ({ addToWatchlist }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [logo, setLogo] = useState(null);
  const [firstResult, setFirstResult] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const newSEID = "942486b4223714211";
    const newSearchAPI = "AIzaSyD4R1nD6HOBqPK_0e6wsmKkwLaAH4Lsapo";
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${newSearchAPI}&cx=${newSEID}&q=espn ${query}`;
    const imageSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${newSearchAPI}&cx=${newSEID}&q=${query} logo&searchType=image`;

    try {
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      const firstResultData = searchData.items && searchData.items[0];

      const imageResponse = await fetch(imageSearchUrl);
      const imageData = await imageResponse.json();
      const firstImage = imageData.items && imageData.items[0];

      if (firstResultData) {
        setResult(firstResultData.link);
        setFirstResult(firstResultData);
        

      } else {
        setResult('No results found');
        setFirstResult(null);
      }

      if (firstImage) {
        setLogo(firstImage.link);
      } else {
        setLogo(null);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResult('An error occurred. Please try again later.');
      setLogo(null);
      setFirstResult(null);
    }
  };

    const extractCleanTeamName = (title, query) => {
        if (!title) return query;
    
    // Try to extract just the team name from the title
    let teamName = title;
    
    // Remove common prefixes
    teamName = teamName.replace(/^(ESPN|MLB|NFL|NBA|NHL|NCAA)\s*/i, '');
    
    // Remove common suffixes and everything after them
    teamName = teamName.replace(/\s*[-|]\s*(ESPN|MLB|NFL|NBA|NHL|NCAA).*$/i, '');
    teamName = teamName.replace(/\s*[-|]\s*.*$/i, '');
    
    // Remove common words that indicate it's an article, not a team name
    teamName = teamName.replace(/\s*(Scores?|Stats?|Highlights?|News|Updates?|Schedule|Roster|Standings?|Results?|Analysis|Preview|Recap|Report|Breaking|Latest|Today|This Week|Season|Playoffs?|Championship|Cup|League|Division|Conference|Tournament|Series|Game|Match|Race|Event).*$/i, '');
    
    // Remove extra whitespace and trim
    teamName = teamName.replace(/\s+/g, ' ').trim();
    
    if (!teamName || teamName.length < 2) {
      teamName = query;
    }
    
    return teamName;
  };

  const handleAddToWatchlist = () => {
    if (result && logo) {
      // Extract a clean team name from the API response
      const teamName = extractCleanTeamName(firstResult?.title, query);
      
      addToWatchlist({ teamName: teamName, link: result, logo });
      addSport(teamName, logo, result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Search for Teams</h2>
      <form className="w-full max-w-md mb-6" onSubmit={handleSearch}>
        <div className="flex items-center border-2 border-blue-200 rounded-lg py-3 px-4 bg-white shadow-sm focus-within:border-blue-400 focus-within:shadow-md transition-all duration-200">
          <input
            type="text"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg"
            placeholder="Enter team name (e.g., Lakers, Patriots)"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>
      
      {result && (
        <div className="w-full max-w-md">
          {logo && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Found Team</h3>
              <div className="text-center mb-4">
                <img src={logo} alt="Team Logo" className="w-32 h-32 object-contain mx-auto mb-4" />
                <p className="text-gray-600 text-sm mb-4">Click the logo to visit the team's page</p>
              </div>
              <button
                onClick={handleAddToWatchlist}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!result || !logo}
              >
                Add to Watchlist
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SportsSearch;
