import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header-elem/Header'
import WatchlistPage from './WatchlistPage';
import '../Styles/styles1.css'
import SportsPage from './SportsPage';

const fetchUserMovies = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/getUserMovies`;

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
        return data.movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

const fetchUserRecs = async (update = false) => {
    const url = update ? `${process.env.REACT_APP_BACKEND_URL}/getUserRecs?update=true` : `${process.env.REACT_APP_BACKEND_URL}/getUserRecs`;

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
    const url = `${process.env.REACT_APP_BACKEND_URL}/removeMovie`;
    const data = { movieTitle };

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

const Home = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [recsList, setRecsList] = useState([]);
    const [initialFetch, setInitialFetch] = useState(false);

    // Fetch user's movies
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
            }
        });
    }, []);

    // Fetch recommendations
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const movies = await fetchUserRecs(initialFetch);
                if (movies.length === 0 && !initialFetch) {
                    const updatedMovies = await fetchUserRecs(true);
                    if (Array.isArray(updatedMovies)) {
                        setRecsList(updatedMovies.map(movie => ({
                            title: movie.title,
                            url: movie.link,
                        })));
                    }
                } else {
                    if (Array.isArray(movies)) {
                        setRecsList(movies.map(movie => ({
                            title: movie.title,
                            url: movie.link,
                        })));
                    }
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setInitialFetch(true);
            }
        };

        if (!initialFetch) {
            fetchRecommendations();
        }
    }, [initialFetch]);

    const addToWatchlist = async ({ title, type, image, url }) => {
        const item = { title, type, image, url };
        setWatchlist(prevWatchlist => [...prevWatchlist, item]);
        const updatedRecs = await fetchUserRecs(true);
        setRecsList(updatedRecs);
    };

    const deleteItem = async (item) => {
        const index = watchlist.indexOf(item);
        if (index !== -1) {
            const newWatchlist = watchlist.filter((_, i) => i !== index);
            setWatchlist(newWatchlist);
            try {
                await removeMovie(item.title);
                fetchUserRecs(true).then(updatedRecs => {
                    setRecsList(updatedRecs);
                });
            } catch (error) {
                console.error("Error removing movie:", error);
            }
        }
    };

    // Hero carousel data
    const heroData = [
        {
            image: "/dune2.webp",
            title: "Dune: Part Two",
            description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
        },
        {
            image: "/panda.webp",
            title: "Kung Fu Panda 4",
            description: "Po must train a new warrior when he's chosen to become the spiritual leader of the Valley of Peace."
        },
        {
            image: "/kong.webp",
            title: "Godzilla x Kong",
            description: "Godzilla and the almighty Kong face a colossal threat hidden deep within the planet."
        }
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroData.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [heroData.length]);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navigation */}
            <Header addToWatchlist={addToWatchlist} />

            {/* Hero Carousel Section */}
            <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
                {heroData.map((hero, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={hero.image}
                            alt={hero.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-transparent" />
                    </div>
                ))}

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center z-10">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl">
                            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4 tracking-wider animate-fade-in">
                                {heroData[currentImage].title}
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed animate-fade-in animate-fade-in-delay-1">
                                {heroData[currentImage].description}
                            </p>
                            <div className="flex gap-4 animate-fade-in animate-fade-in-delay-2">
                                <button className="px-8 py-3 bg-[#e50914] text-white font-semibold rounded hover:bg-[#b20710] transition-all duration-300 hover:transform hover:-translate-y-1 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Watch Now
                                </button>
                                <button className="px-8 py-3 glass text-white font-semibold rounded hover:bg-white/10 transition-all duration-300">
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    onClick={() => setCurrentImage(prev => (prev === 0 ? heroData.length - 1 : prev - 1))}
                >
                    <svg className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    onClick={() => setCurrentImage(prev => (prev + 1) % heroData.length)}
                >
                    <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {heroData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                index === currentImage ? 'w-8 bg-[#e50914]' : 'w-4 bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Watchlist Section */}
            <section className="py-16 bg-[#0a0a0a]">
                <div className="container mx-auto px-6">
                    <WatchlistPage watchlist={watchlist} deleteItem={deleteItem} title="Your Watchlist" />
                </div>
            </section>

            {/* Recommendations Section */}
            <section className="py-16 bg-[#0d0d0d]">
                <div className="container mx-auto px-6">
                    <WatchlistPage watchlist={recsList} title="Recommended For You" />
                </div>
            </section>

            {/* Sports Section */}
            <section className="py-16 bg-[#0a0a0a]">
                <SportsPage />
            </section>

            <Footer />
        </div>
    );
};

export default Home;
