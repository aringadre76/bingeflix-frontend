import React from 'react';
import Footer from '../Footer';

const LandingPage = () => {
  return (

    <div>

      <div className="relative">
        <div className="absolute top-0 left-0 z-10 m-4">
          <h1 className="text-white text-2xl font-bold">
            BINGEFLIX
          </h1>
        </div>
        <div className="absolute top-0 right-7 z-10 m-4">
          <a href={`${process.env.BACKEND_URL}/auth/google`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
             login 1
          </a>

        </div>
      </div>

      {/* Shows */}
      <div
        className="h-screen custom-background flex justify-center items-center"
        style={{
          backgroundImage: 'url(netfliximage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className='text-center'>
          <h1 className='font-bold mb-4 text-white text-5xl'>
            Get to your show with one click, no hassle
          </h1>
        </div>
      </div>

      {/* Sports */}
      <div
        className="h-screen custom-background2 flex justify-center items-center"
        style={{
          backgroundImage: 'url(Harden.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className='text-center'>
          <h1 className='font-bold mb-4 text-white text-5xl'>
            Follow your favorite sports teams
          </h1>
        </div>
      </div>

      {/* Formula 1 */}
      <div
        className="h-screen custom-background2 flex justify-center items-center"
        style={{
          backgroundImage: 'url(formula1.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className='text-center'>
          <h1 className='font-bold mb-4 text-white text-5xl'>
            Keep up with all races, no matter what time zone
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;


