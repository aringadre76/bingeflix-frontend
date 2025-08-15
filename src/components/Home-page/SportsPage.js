import React, { useState, useEffect } from 'react';
import SportsSearch from './SportsSearch';

const getUserSports = async () => {
  console.log("Get user sports called");

  const url = `${process.env.REACT_APP_BACKEND_URL}/getUserSports`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("GET USER SPORTS RESULTS: ", result);

    if (result.success) {
      console.log("Sports List in USERSPROTS:", result.sportsList);
      return result.sportsList
      // Process the sports list as needed, for example:
      // displaySportsList(result.sportsList);
    } else {
      console.error('Failed to retrieve sports:', result.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const removeSport = async (teamName, logo, link) => {
  console.log("REMOVE SPORT:", teamName );
  console.log("REMOVE SPORT:", logo );
  console.log("REMOVE SPORT:", link );

  const url = `${process.env.REACT_APP_BACKEND_URL}/removeSport`;
  const data = {
      sportTitle: teamName
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


const SportsPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    getUserSports().then(async sports => {
        console.log("FIRST");
        console.log("SPORTS IS in useEffect: ", sports);
        if (Array.isArray(sports)) {
            console.log("SECOND");
            const updatedSports = await Promise.all(
              sports.map(async (sport) => {
                // const { link, logo } = await handleSearch(sport.teamName);
                return { teamName: sport.teamName, link: sport.link, logo: sport.logo };
              })
            );
    
            setWatchlist(updatedSports);
        } else {
            console.error('Expected movies to be an array, received:', sports);
        }
    });
  }, []);

  const addToWatchlist = (item) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, item]);

  };

  const deleteItem = (index) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((_, i) => i !== index));
    console.log("DELETE ITEM: ", watchlist[index].teamName);
    removeSport(watchlist[index].teamName, watchlist[index].logo, watchlist[index].link);
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-white">
      <div className="text-center w-full max-w-7xl px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sports</h1>
          <p className="text-lg text-gray-600 mb-8">Search and follow your favorite teams</p>
          
          {/* Sports Search Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 shadow-lg">
            <SportsSearch addToWatchlist={addToWatchlist} />
          </div>
        </div>

        {/* Sports Watchlist Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Teams</h2>
          {watchlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No teams in your watchlist yet.</p>
              <p className="text-gray-400">Search for a team above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchlist.map((item, index) => (
                <div key={index} className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  <div className="p-6 text-center">
                    <a href={item.link} target="_blank" rel="noreferrer" className="block">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center p-2 hover:bg-gray-100 transition-colors duration-200">
                        <img src={item.logo} alt="Team Logo" className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {item.teamName}
                      </h3>
                    </a>
                    
                    <button
                      onClick={() => deleteItem(index)}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                      title="Remove team"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportsPage;
