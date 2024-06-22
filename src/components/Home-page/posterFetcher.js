const fetch = require('node-fetch');

// Your TMDb API key
const apiKey = '3b400d46d860ba7c351df26af82f99a8';

// Function to search for the movie or TV show and get the correct ID
async function searchMulti(title) {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
  const response = await fetch(searchUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    // Find an exact match by title
    const exactMatch = data.results.find(result => {
      const resultTitle = result.title || result.name; // Handle both movie and TV titles
      return resultTitle.toLowerCase() === title.toLowerCase();
    });

    if (exactMatch) {
      return exactMatch;
    }

    // Fallback to the first result
    return data.results[0];
  } else {
    throw new Error('Title not found');
  }
}

// Function to get the poster URL using the result
async function getPosterUrl(result) {
  const { id, media_type } = result;
  const detailUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}`;
  const response = await fetch(detailUrl);
  const data = await response.json();

  if (data.poster_path) {
    return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    throw new Error('Poster not found');
  }
}

// Main function to get the poster URL for a given title
async function fetchPosterURL(title) {
  try {
    // Search for the title and get the most relevant result
    const result = await searchMulti(title);

    // Get the poster URL using the result
    const posterUrl = await getPosterUrl(result);
    return posterUrl;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = fetchPosterURL;
