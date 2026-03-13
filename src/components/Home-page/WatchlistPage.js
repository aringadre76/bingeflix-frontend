// WatchlistPage.js
import React from 'react';
import WatchlistCard from './WatchlistCard';

const WatchlistPage = ({ watchlist, deleteItem, title = "Your Watchlist" }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-2">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-[#e50914] rounded-full"></div>
              <span className="text-gray-400 text-sm font-body">
                {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'}
              </span>
            </div>
          </div>
          
          {/* Filter/Sort Options (placeholder for future) */}
          <div className="flex gap-3">
            <button className="px-4 py-2 glass rounded-lg text-gray-300 text-sm hover:text-white transition-colors">
              Recently Added
            </button>
            <button className="px-4 py-2 glass rounded-lg text-gray-300 text-sm hover:text-white transition-colors">
              A-Z
            </button>
          </div>
        </div>
      </div>

      {/* Watchlist Grid */}
      <div className="container mx-auto px-6">
        {watchlist.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 mb-6 rounded-full glass flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
                />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
              YOUR WATCHLIST IS EMPTY
            </h3>
            <p className="text-gray-400 max-w-md">
              Start adding movies and shows to build your personal collection. 
              Search above to find your next binge.
            </p>
          </div>
        ) : (
          // Watchlist Grid
          <div className="watchlist-grid">
            {watchlist.map((item, index) => (
              <div 
                key={index} 
                className={`animate-fade-in animate-fade-in-delay-${(index % 5) + 1}`}
              >
                <WatchlistCard 
                  item={item} 
                  deleteItem={deleteItem} 
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative gradient at bottom */}
      <div className="mt-20 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
    </div>
  );
};

export default WatchlistPage;
