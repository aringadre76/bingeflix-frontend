import React, { useState, useEffect } from 'react';
import SportsSearch from './SportsSearch';

const getUserSports = async () => {
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
        if (result.success) {
            return result.sportsList;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return [];
};

const removeSport = async (teamName) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/removeSport`;
    const data = { sportTitle: teamName };

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
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

const SportsPage = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        getUserSports().then(async sports => {
            if (Array.isArray(sports)) {
                const updatedSports = await Promise.all(
                    sports.map(async (sport) => {
                        return { teamName: sport.teamName, link: sport.link, logo: sport.logo };
                    })
                );
                setWatchlist(updatedSports);
            }
        });
    }, []);

    const addToWatchlist = (item) => {
        setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
    };

    const deleteItem = (index) => {
        const item = watchlist[index];
        setWatchlist((prevWatchlist) => prevWatchlist.filter((_, i) => i !== index));
        removeSport(item.teamName);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <div className="container mx-auto px-6 py-16">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-4">
                        SPORTS
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-16 h-1 bg-[#e50914] rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Search and follow your favorite teams
                    </p>
                </div>

                {/* Sports Search Section */}
                <div className="glass rounded-2xl p-8 mb-12">
                    <SportsSearch addToWatchlist={addToWatchlist} />
                </div>

                {/* Sports Watchlist Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-display text-3xl text-white tracking-wide">
                                YOUR TEAMS
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-12 h-1 bg-[#e50914] rounded-full"></div>
                                <span className="text-gray-400 text-sm">
                                    {watchlist.length} {watchlist.length === 1 ? 'team' : 'teams'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {watchlist.length === 0 ? (
                        <div className="glass rounded-2xl p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h4 className="font-display text-2xl text-white mb-2 tracking-wide">
                                NO TEAMS YET
                            </h4>
                            <p className="text-gray-400">
                                Search for a team above to get started!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {watchlist.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden card-hover border border-[#333]"
                                >
                                    <div className="p-6 text-center">
                                        <a href={item.link} target="_blank" rel="noreferrer" className="block">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-[#0a0a0a] rounded-full flex items-center justify-center p-3 border border-[#333] group-hover:border-[#e50914] transition-colors duration-300">
                                                <img 
                                                    src={item.logo} 
                                                    alt="Team Logo" 
                                                    className="w-full h-full object-contain" 
                                                />
                                            </div>
                                            <h3 className="text-white font-semibold group-hover:text-[#e50914] transition-colors duration-200 line-clamp-2">
                                                {item.teamName}
                                            </h3>
                                        </a>
                                        
                                        <button
                                            onClick={() => deleteItem(index)}
                                            className="absolute top-3 right-3 w-8 h-8 bg-[#e50914]/80 hover:bg-[#e50914] text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
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
