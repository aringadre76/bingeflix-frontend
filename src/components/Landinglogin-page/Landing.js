import React from 'react';
import Footer from '../Footer';
import LoginButton from './LoginButton';
import '../Styles/styles1.css'

const LandingPage = () => {
  return (
    <div className = "grid grid-rows-10 gap-1 bg-gray-600">
      <div className = "relative row-span-4 bg-cover bg-center" style = {{
        backgroundImage: "url('/netfliximage.jpg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.5)" 
      }}>
        {/* Back Rectangle*/}
        <div className="fixed top-0 left-0 w-full h-16 bg-black z-20">
        </div>
        {/* Company Title */}
        <div className = "fixed top-4 left-7 text-white text-xl font-bold z-30">
          BINGEFLIX
        </div>
        <LoginButton/>
        <div class="relative h-screen">
          <div class="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold"style={{top: '40%', left: '30px', right: '20px'}}>
            <span class="-translate-y-10 ">Get to your shows with one click, hassleless
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center items-center text-white text-xl font-bold"style={{top: '50%', left: '30px', right: '20px'}}>
          Watch anywhere, from anywhere.
        </div>
      </div>
      {/* Streaming Platforms */}
      <div className = "relative row-span-2 " style = {{backgroundColor: 'black'}}> 
        <div className="absolute text-white text-3xl font-bold" style={{ top: '30%', left: '20%', width: '40%', height: '15%'}}>
          Enjoy from any streaming platform
        </div>
        <div className="absolute text-white text-l font-bold" style={{ top: '60%', left: '20%',  width: '40%'}}>
          Watch from Netflix, Hulu, Disney+, HBO MAX, <br />
          Crunchyroll, and more.
        </div>
        <img
          src = "./platforms.jpeg"
          className="w-70 h-50 object-contain hide-on-iphone"
          style={{ position: 'absolute', top: '30%', left: '60%' }}
          alt="platforms" 
        />
      </div>
      {/* Streaming Platforms */}
      <div className = "relative row-span-3" style = {{
        backgroundImage: "url('/harden.jpeg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.3)" 
      }}> 
        <div className="relative text-white text-3xl font-bold" style={{ top: '40%', left: '20%', width: '25%', height: '20%'}}>
          Keep up with your favorite teams
        </div>
        <div className="relative text-white text-l font-bold hide-on-iphone" style={{ top: '40%', left: '20%',  width: '25%'}}>
          Watch games from any sport, keep up with league standings, watch full game highlights, and
          get notified when upcoming games are.
        </div>
        <img
          src = "./standings.jpeg"
          className="w-100 h-100 object-contain border-2 border-white hide-on-iphone"
          style={{ position: 'absolute', top: '30%', left: '50%' }}
          alt="standings" 
        />
        <img
          src = "./recap.jpeg"
          className="w-100 h-100 object-contain border-2 border-white hide-on-iphone"
          style={{ position: 'absolute', top: '30%', left: '58%' }}
          alt="recap"
        />
        <img
          src = "./fight.jpeg"
          className="w-100 h-100 object-contain border-2 border-white hide-on-iphone"
          style={{ position: 'absolute', top: '30%', left: '70%' }}
          alt="fight"
        />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;