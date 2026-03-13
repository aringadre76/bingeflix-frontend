import React, { useState } from 'react';

const addSport = async (sportName, logo, link) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/addSport`;
    const data = {
        sport: {
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
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        const newSEID = process.env.REACT_APP_GOOGLE_CSE_ID;
        const newSearchAPI = process.env.REACT_APP_GOOGLE_API_KEY;
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
        } finally {
            setIsLoading(false);
        }
    };

    const extractCleanTeamName = (title, query) => {
        if (!title) return query;
        
        let teamName = title;
        
        teamName = teamName.replace(/^(ESPN|MLB|NFL|NBA|NHL|NCAA)\s*/i, '');
        teamName = teamName.replace(/\s*[-|]\s*(ESPN|MLB|NFL|NBA|NHL|NCAA).*$/i, '');
        teamName = teamName.replace(/\s*[-|]\s*.*$/i, '');
        teamName = teamName.replace(/\s*(Scores?|Stats?|Highlights?|News|Updates?|Schedule|Roster|Standings?|Results?|Analysis|Preview|Recap|Report|Breaking|Latest|Today|This Week|Season|Playoffs?|Championship|Cup|League|Division|Conference|Tournament|Series|Game|Match|Race|Event).*$/i, '');
        teamName = teamName.replace(/\s+/g, ' ').trim();
        
        if (!teamName || teamName.length < 2) {
            teamName = query;
        }
        
        return teamName;
    };

    const handleAddToWatchlist = () => {
        if (result && logo) {
            const teamName = extractCleanTeamName(firstResult?.title, query);
            addToWatchlist({ teamName: teamName, link: result, logo });
            addSport(teamName, logo, result);
            setQuery('');
            setResult(null);
            setLogo(null);
            setFirstResult(null);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden focus-within:border-[#e50914] transition-colors">
                    <input
                        type="text"
                        className="flex-1 bg-transparent text-white px-6 py-4 focus:outline-none placeholder-gray-500"
                        placeholder="Search for a team (e.g., Lakers, Warriors, Yankees)..."
                        value={query}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-4 bg-[#e50914] text-white font-semibold hover:bg-[#b20710] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </form>

            {result && logo && (
                <div className="mt-8 glass rounded-xl p-8 animate-fade-in">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-[#1a1a1a] rounded-full flex items-center justify-center p-4 mb-6 border border-[#333]">
                            <img src={logo} alt="Team Logo" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="font-display text-2xl text-white mb-2 tracking-wide">
                            {extractCleanTeamName(firstResult?.title, query)}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Click below to add this team to your watchlist
                        </p>
                        <button
                            onClick={handleAddToWatchlist}
                            className="px-8 py-3 bg-[#e50914] text-white font-semibold rounded hover:bg-[#b20710] transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SportsSearch;
