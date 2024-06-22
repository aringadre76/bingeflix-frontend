

import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header-elem/Header';
import '../Styles/styles1.css'

const Construction = () => {

    const images = [
        "/not_found.jpg"
    ];
    
    const descriptions = [
        "The page you are looking for is under construction."
      ];


    const [currentImage, setCurrentImage] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }, 7000);
    
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);
    return (
        <div className = "grid grid-rows-1 gap-1 bg-gray-600" style={{ height: '100vh', backgroundColor: 'lightblue' }}>
            <div className="relative grid grid-rows-1 gap-1 bg-gray-600">
            <Header/>
                <div className="relative row-span-1 bg-cover bg-center"style={{ height: '1000px'}}> {/* Position the overlay here */}
                    {images.map((src, index) => (
                        <div key={index} className={`absolute w-full h-full ${index === currentImage ? 'visible' : 'hidden'}`} >
                            <img
                            src={src}
                            alt={` ${index}`}
                            className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
                        </div>
                    ))}
                    {/* Movie Title and Description */}
                    <img
                    src = "./404.png"
                    className="object-contain border-white hide-on-iphone z-100"
                    style={{ position: 'absolute', top: '20%', left: '25%', height: '20%'}}
                    alt="404_image_"
                    />    
                    <div className="absolute z-60 text-white font-bold text-4xl"
                         
                        style={{ top: '40%', width: '50%', left: '30%' }}>
                        404 Under Construction
                    </div>
                    
                    <div className="absolute z-60 text-white font-bold text-l" 
                        style={{ top: '45%', width: '50%', left: '30%' }}>
                        {descriptions[currentImage]}
                    </div>
                    <div  style = {{
                        backgroundImage: "url('/netfliximage.jpg')",
                        backgroundBlendMode: "multiply",
                        backgroundColor: "rgba(247, 119, 185, 0.8)",
                        width: '100%'
                    }}>
                    
                    
                </div>
                <Footer />

                </div>
            </div>

        </div>
    );
};

export default Construction;
