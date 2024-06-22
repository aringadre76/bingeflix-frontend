

import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header-elem/Header'
import WatchlistPage from './WatchlistPage';
import '../Styles/styles1.css'
import SportsPage from './SportsPage';

/* import Header from './H_Header';*/


const fetchUserMovies = async () => {
    const url = 'http://localhost:4000/getUserMovies';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include authentication tokens if needed, for example:
                // 'Authorization': 'Bearer yourTokenHere'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Full response data:', data);  // This will log the full data object

        // If you want to see the movies array in a readable format:
        console.log('Movies array:', data.movies);  // Log the movies array directly
        console.log('Movies array as string:', JSON.stringify(data.movies, null, 2));  // Pretty print the movies array

        return data.movies;  // Assuming the movies are correctly located under the 'movies' key
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];  // Return empty array on error
    }
};


const fetchUserRecs = async (update = false) => {
    const url = update ? 'http://localhost:4000/getUserRecs?update=true' : 'http://localhost:4000/getUserRecs';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.recs;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
};

const removeMovie = async (movieTitle) => {
    const url = 'http://localhost:4000/removeMovie';
    const data = {
        movieTitle
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

const Home = () => {
    //const data = fetchUserMovies();
    //let data = fetchUserMovies();
    //console.log('data: ' + data);
    const [watchlist, setWatchlist] = useState([
        // { title: 'Blade Runner', type: 'Movie', image: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg', url: 'https://www.amazon.com/Blade-Runner-Harrison-Ford/dp/B000SW4DLM' },
        // { title: 'Adventure Time', type: 'Show', image: 'https://resizing.flixster.com/p4bNRltTA96oMxss5CJVBj0YvSU=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjIwNDEwMy53ZWJw', url: 'https://www.cartoonnetwork.com/video/adventure-time/index.html' },
    ]);

    useEffect(() => {
        fetchUserMovies().then(movies => {
            if (Array.isArray(movies)) {
                setWatchlist(currentWatchlist => {
                    const currentTitles = new Set(currentWatchlist.map(item => item.title));
                    const newMovies = movies.filter(movie => !currentTitles.has(movie.title));
                    return [
                        ...currentWatchlist,
                        ...newMovies.map(movie => ({
                            title: movie.title,
                            type: 'Movie',
                            image: movie.image || '',
                            url: movie.link
                        }))
                    ];
                });
            } else {
                console.error('Expected movies to be an array, received:', movies);
            }
        });
    }, []);
    const [recsList, setRecsList] = useState([]);
    const [initialFetch, setInitialFetch] = useState(false);

    // Recommendations
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const movies = await fetchUserRecs(initialFetch);
                if (movies.length === 0 && !initialFetch) {
                    // If no recommendations and this is the first fetch, fetch updated recommendations
                    const updatedMovies = await fetchUserRecs(true);
                    if (Array.isArray(updatedMovies)) {
                        setRecsList(updatedMovies.map(movie => ({
                            title: movie.title,
                            url: movie.link,
                        })));
                    } else {
                        console.error('Expected recommendations to be an array, received:', updatedMovies);
                    }
                } else {
                    if (Array.isArray(movies)) {
                        setRecsList(movies.map(movie => ({
                            title: movie.title,
                            url: movie.link,
                        })));
                    } else {
                        console.error('Expected recommendations to be an array, received:', movies);
                    }
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setInitialFetch(true); // Mark the initial render as completed
            }
        };

        if (!initialFetch) {
            fetchRecommendations();
        }

    }, [initialFetch]);

    const addToWatchlist = async ({ title, type, image, url }) => {
        const item = { title, type, image, url };
        setWatchlist(prevWatchlist => [...prevWatchlist, item]);

        // Fetch updated recommendations
        const updatedRecs = await fetchUserRecs(true);
        setRecsList(updatedRecs);
    };

    const deleteItem = async (item) => {
        const index = watchlist.indexOf(item);
        if (index !== -1) {
            console.log("Deleting item:", item);  // Log the item that is about to be deleted

            // Call the removeMovie API to delete the movie from the database
            try {
                const result = await removeMovie(item.title);
                if (result && result.success) {
                    console.log("Movie removed successfully from backend:", result.message);

                    // Only update the local state if the backend update was successful
                    const newWatchlist = watchlist.filter((_, i) => i !== index);
                    setWatchlist(newWatchlist);
                    const updatedRecs = await fetchUserRecs(true);
                    setRecsList(updatedRecs);
                } else {
                    console.log("Failed to remove the movie from the backend.");
                }
            } catch (error) {
                console.error("Error removing movie from backend:", error);
            }
        }
    };


    const images = [
        "/dune2.webp",
        "/panda.webp",
        "/kong.webp",
    ];

    const descriptions = [
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
        "Po must train a new warrior when he's chosen to become the spiritual leader of the Valley of Peace. However, when a powerful shape-shifting sorceress sets her eyes on his Staff of Wisdom, he suddenly realizes he's going to need some help. Teaming up with a quick-witted corsac fox, Po soon discovers that heroes can be found in the most unexpected places.",
        "Godzilla and the almighty Kong face a colossal threat hidden deep within the planet, challenging their very existence and the survival of the human race.",
    ];

    const titles = [
        "Dune 2",
        "Kung Fu Panda 4",
        "Gozilla x Kong: The New Empire",
    ]

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);
    return (
        <div>
            {/*<div className="relative grid grid-rows-7 gap-1 bg-gray-600">*/}
            <div className="relative grid grid-rows-1 gap-1 bg-gray-600">
                <Header addToWatchlist={addToWatchlist} />
                <div className="relative row-span-1 bg-cover bg-center" style={{ height: '1000px' }}> {/* Position the overlay here */}
                    {images.map((src, index) => (
                        <div key={index} className={`absolute w-full h-full ${index === currentImage ? 'visible' : 'hidden'}`} >
                            <img
                                src={src}
                                alt={` ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Dark overlay to make the image darker */}
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
                            <button className="z-60 absolute bg-white text-xl font-bold text-white-200 w-12 h-12 "
                                onClick={() => setCurrentImage(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
                                style={{ top: '50%', left: '1%', borderRadius: '100px' }}>
                                <img src="./ARROW.png"
                                    className="w-70 h-50 object-contain"
                                    style={{ position: 'absolute', top: '20%', left: '0%' }}
                                    alt="platforms" />
                            </button>
                            <button className="z-60 absolute bg-white text-xl font-bold text-white-200 w-12 h-12 "
                                onClick={() => setCurrentImage(prevIndex => (prevIndex + 1) % images.length)}
                                style={{ top: '50%', right: '1%', borderRadius: '100px' }}>
                                <img src="./ARROW.png"
                                    className="w-70 h-50 object-contain mirrored"
                                    style={{ position: 'absolute', top: '20%', left: '0%' }}
                                    alt="platforms" />
                            </button>
                        </div>
                    ))}
                    {/* Movie Title and Description */}

                    <div className="absolute z-60 text-white font-bold text-4xl"
                        style={{ top: '30%', width: '50%', left: '5%' }}>
                        {titles[currentImage]}
                    </div>

                    <div className="absolute z-60 text-white font-bold text-l"
                        style={{ top: '60%', width: '50%', left: '5%' }}>
                        {descriptions[currentImage]}
                    </div>

                    <button className="z-60 absolute bg-white text-xl font-bold text-white-200 w-28 h-12 "
                        style={{ top: '50%', left: '5%', borderRadius: '10px' }}>
                        Watch
                    </button>
                    <button className="z-60 absolute bg-gray-600 text-xl font-bold text-gray-200 w-48 h-12"
                        style={{ top: '50%', left: 'calc(5% + 150px)', borderRadius: '10px' }}>
                        More Details
                    </button>

                </div>
                {/* Watchlist */}
                {/*Overflow Scroll, remove entire style to remove*/}
                <div className="flex justify-center items-center min-h-screen text-black bg-white z-200" style={{
                    overflow: 'auto', // Enable scrolling
                    border: '1px solid #ccc', // Optional: Add border for visibility
                    padding: '1rem' // Optional: Add padding for better spacing
                }}>
                    <div className="text-center w-full">
                        <p className="text-xl font-bold mb-4">Watchlist</p>
                        <WatchlistPage watchlist={watchlist} addToWatchlist={addToWatchlist} deleteItem={deleteItem} />
                    </div>
                </div>
                {/* Recommendations */}
                <div className="flex justify-center items-center h-screen text-black bg-white">
                    <div className="text-center">
                        <p className="text-xl font-bold">Recommendations</p>
                        <WatchlistPage watchlist={recsList} />
                    </div>
                </div>

                <SportsPage />
                <Footer />
            </div>

        </div>
    );
};

export default Home;
