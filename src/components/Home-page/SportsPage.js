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
    <div className="p-4">
      
      <SportsSearch addToWatchlist={addToWatchlist} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">Your watchlist is empty.</p>
          
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {watchlist.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg relative">
                <a href={item.link} target="_blank" rel="noreferrer">
                  <img src={item.logo} alt="Team Logo" className="w-32 h-32 object-contain" />
                </a>
                <button
                  onClick={() => deleteItem(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsPage;
