// WatchlistPage.js
import React from 'react';
import WatchlistCard from './WatchlistCard';

const WatchlistPage = ({watchlist, deleteItem}) => {

  return (
    <div className="bg-white container mx-auto mt-8 ">
      <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {watchlist.map(item => (
          <WatchlistCard item={item} deleteItem={deleteItem} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
