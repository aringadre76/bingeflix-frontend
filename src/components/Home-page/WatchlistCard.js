import React, { useState, useEffect } from 'react';
import fetchDescription from './descriptionFetcher';
import fetchPosterURL from './posterFetcher';

const WatchlistCard = ({ item, editItem, deleteItem }) => {
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const posterUrl = await fetchPosterURL(item.title);
      setImage(posterUrl);
    };
    fetchImage();
  }, [item.title]);

  const handleDescriptionToggle = async () => {
    if (!description) {
      const desc = await fetchDescription(item.title);
      setDescription(desc);
    }
    setShowDescription(!showDescription);
  };

  return (
    <div className="border border-gray-300 rounded-md p-2 relative flex flex-col items-center">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex justify-center">
        {image ? (
          <img src={image} alt={item.title} className="w-full mb-2" />
        ) : (
          <div className="w-24 h-36 mb-2 bg-gray-200 flex items-center justify-center">Loading...</div>
        )}
      </a>
      <h3 className="text-base font-semibold mb-1 text-center">{item.title}</h3>
      <button
        onClick={handleDescriptionToggle}
        className="text-xs text-blue-500 underline mb-2"
      >
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>
      {showDescription && (
        <p className="text-xs mb-2 text-center">
          {description || 'Loading description...'}
        </p>
      )}
      <div className="absolute bottom-0 right-0 flex gap-2">
        <button onClick={() => deleteItem(item)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
