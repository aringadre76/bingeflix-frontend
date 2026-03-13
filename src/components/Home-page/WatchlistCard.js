import React, { useState, useEffect } from 'react';
import fetchDescription from './descriptionFetcher';
import fetchPosterURL from './posterFetcher';

const WatchlistCard = ({ item, editItem, deleteItem, index }) => {
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      const posterUrl = await fetchPosterURL(item.title);
      setImage(posterUrl);
      setIsLoading(false);
    };
    fetchImage();

    // Reset description when item changes
    setDescription(null);
    setShowDescription(false);
  }, [item.title]);

  const handleDescriptionToggle = async () => {
    if (!description) {
      const desc = await fetchDescription(item.title);
      setDescription(desc || item.reason || 'No description available');
    }
    setShowDescription(!showDescription);
  };

  return (
    <div 
      className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden card-hover cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {isLoading ? (
          // Loading Skeleton
          <div className="w-full h-full skeleton flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#333] border-t-[#e50914] animate-spin" />
          </div>
        ) : image ? (
          <>
            {/* Poster Image */}
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img 
                src={image} 
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
            </a>
            
            {/* Hover Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Red Glow Effect on Hover */}
            <div 
              className={`absolute inset-0 border-2 border-[#e50914] transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ boxShadow: isHovered ? 'inset 0 0 30px rgba(229, 9, 20, 0.3)' : 'none' }}
            />
          </>
        ) : (
          // No Image Fallback
          <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center border border-[#333]">
            <svg 
              className="w-12 h-12 text-[#333] mb-2" 
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
            <span className="text-[#555] text-xs">No Image</span>
          </div>
        )}

        {/* Type Badge (Movie/TV) */}
        {item.type && (
          <div className="absolute top-3 left-3 px-2 py-1 glass rounded text-xs text-white font-medium tracking-wide">
            {item.type === 'movie' ? 'MOVIE' : 'TV SHOW'}
          </div>
        )}

        {/* Delete Button */}
        {deleteItem && (
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteItem(item);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full glass delete-btn ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            title="Remove from watchlist"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Play Button on Hover */}
        <a 
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#e50914]/90 flex items-center justify-center hover:bg-[#e50914] hover:scale-110 transition-all duration-300">
            <svg 
              className="w-8 h-8 text-white ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-body text-white font-semibold text-base mb-2 line-clamp-2 leading-tight group-hover:text-[#e50914] transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description Toggle */}
        <button
          onClick={handleDescriptionToggle}
          className="text-xs text-gray-400 hover:text-[#e50914] transition-colors duration-300 flex items-center gap-1 mb-2"
        >
          <span>{showDescription ? 'Hide' : 'Show'} Description</span>
          <svg 
            className={`w-3 h-3 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Description */}
        <div 
          className={`expand-content ${showDescription ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">
            {description || 'Loading description...'}
          </p>
        </div>

        {/* Reason/Recommendation (if available) */}
        {item.reason && (
          <div className="mt-3 pt-3 border-t border-[#333]">
            <p className="text-xs text-gray-500 italic">
              &ldquo;{item.reason.substring(0, 80)}{item.reason.length > 80 ? '...' : ''}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e50914] to-[#b20710] transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />
    </div>
  );
};

export default WatchlistCard;
