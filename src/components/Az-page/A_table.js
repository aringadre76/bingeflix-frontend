import React from 'react';

const A_table = () => {
  const list1 = ['Avatar', 'Avengers', 'Inception', 'Interstellar', 'Jurassic Park', 'The Lion King', 'Toy Story'];
  const list2 = ['Black Panther', 'Blade Runner', 'Frozen', 'Gladiator', 'Mad Max', 'Moana', 'Wonder Woman'];
  const list3 = ['Back to the Future', 'Finding Nemo', 'Iron Man', 'Jumanji', 'Shrek', 'Spider-Man', 'Up'];

  const renderList = (title, movies) => (
    <div className="list-column z-50">
      <div className="list-title">{title}</div>
      <ul className="movie-list">
        {movies.sort().map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">
      {renderList('List 1', list1)}
      {renderList('List 2', list2)}
      {renderList('List 3', list3)}
    </div>
  );
}

export default A_table;
