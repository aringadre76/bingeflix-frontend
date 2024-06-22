

import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header-elem/Header';

import '../Styles/styles1.css'

const Genre = () => {

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
        <div className = "grid grid-rows-3 gap-1 bg-gray-600">
            <div className="relative grid grid-rows-2 gap-1 bg-gray-600">
            <Header/>
                <div className="relative row-span-1 bg-cover bg-center"style={{ height: '1000px'}}> {/* Position the overlay here */}
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
                                style={{top: '50%', left: '1%', borderRadius: '100px' }}>
                                    <img src = "./ARROW.png"
                                    className="w-70 h-50 object-contain"
                                    style={{ position: 'absolute', top: '20%', left: '0%' }}
                                    alt="platforms" />
                            </button>
                            <button className="z-60 absolute bg-white text-xl font-bold text-white-200 w-12 h-12 "
                                onClick={() => setCurrentImage(prevIndex => (prevIndex + 1) % images.length)}
                                style={{top: '50%', right: '1%', borderRadius: '100px' }}>
                                    <img src = "./ARROW.png"
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
                        style={{top: '50%', left: '5%', borderRadius: '10px' }}>
                        Watch
                    </button>
                    <button className="z-60 absolute bg-gray-600 text-xl font-bold text-gray-200 w-48 h-12"
                        style={{ top: '50%', left: 'calc(5% + 150px)', borderRadius: '10px'}}>
                        More Details
                    </button>
                </div>
                {/* Recommendations */}
                <div className = "grid grid-rows-8 gap-1 bg-gray-600">
                    <div className = "relative row-span-8" style = {{
                        backgroundImage: "url('/netfliximage.jpg')",
                        backgroundBlendMode: "multiply",
                        backgroundColor: "rgba(247, 119, 185, 0.8)",
                        width: '100%'
                    }}> 
                        <div className="relative text-white text-3xl font-bold" style={{ top: '30%', left: '10%', width: '40%', height: '20%'}}>
                        A-Z List
                        </div>
                        <div className="relative text-white text-3xl font-bold hide-on-iphone" style={{ top: '25%', left: '15%',  width: '25%'}}>
                        Your watchlists
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
};

export default Genre;
