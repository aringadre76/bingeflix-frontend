import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import LoginButton from './LoginButton';
import '../Styles/styles1.css'

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl gradient-orb" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-800/10 rounded-full blur-3xl gradient-orb-delayed" />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-display text-3xl text-white tracking-wider">BINGEFLIX</span>
          </div>
          <LoginButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/netfliximage.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="hero-title font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 tracking-wider">
            BINGEFLIX
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto font-light">
            Your shows, your way. One click away.
          </p>
          <p className="hero-content text-lg text-gray-400 mb-12">
            Watch anywhere, from anywhere.
          </p>
          
          <div className="hero-content flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-[#e50914] text-white font-semibold text-lg rounded hover:bg-[#b20710] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/30">
              Get Started
            </button>
            <button className="px-10 py-4 glass text-white font-semibold text-lg rounded hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Streaming Platforms Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 animate-fade-in">
              <h2 className="font-display text-5xl md:text-6xl text-white mb-6 tracking-wide">
                ALL YOUR STREAMING
              </h2>
              <h3 className="font-display text-4xl md:text-5xl text-[#e50914] mb-6 tracking-wide">
                IN ONE PLACE
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Watch from Netflix, Hulu, Disney+, HBO MAX, Crunchyroll, and more. 
                No more switching between apps. Your entire entertainment universe, unified.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 glass rounded-full text-sm text-gray-300">Netflix</span>
                <span className="px-4 py-2 glass rounded-full text-sm text-gray-300">Hulu</span>
                <span className="px-4 py-2 glass rounded-full text-sm text-gray-300">Disney+</span>
                <span className="px-4 py-2 glass rounded-full text-sm text-gray-300">HBO Max</span>
                <span className="px-4 py-2 glass rounded-full text-sm text-gray-300">+ more</span>
              </div>
            </div>
            <div className="lg:w-1/2 animate-fade-in animate-fade-in-delay-2">
              <img
                src="./platforms.jpeg"
                alt="Streaming Platforms"
                className="rounded-lg shadow-2xl shadow-red-900/20 hover:shadow-red-900/40 transition-shadow duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/harden.jpeg')" }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl text-white mb-4 tracking-wide">
              NEVER MISS A GAME
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Keep up with your favorite teams. Watch games from any sport, track league standings, 
              and get notified when upcoming games are about to start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-lg overflow-hidden card-hover">
              <img
                src="./standings.jpeg"
                alt="Standings"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl text-white mb-2 tracking-wide">LIVE STANDINGS</h3>
                <p className="text-gray-400 text-sm">Track your team's position in real-time</p>
              </div>
            </div>

            <div className="glass rounded-lg overflow-hidden card-hover">
              <img
                src="./recap.jpeg"
                alt="Highlights"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl text-white mb-2 tracking-wide">GAME RECAPS</h3>
                <p className="text-gray-400 text-sm">Watch full highlights and game summaries</p>
              </div>
            </div>

            <div className="glass rounded-lg overflow-hidden card-hover">
              <img
                src="./fight.jpeg"
                alt="Notifications"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl text-white mb-2 tracking-wide">SMART ALERTS</h3>
                <p className="text-gray-400 text-sm">Get notified before games start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-wide">
            READY TO BINGE?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of users who have simplified their streaming experience with Bingeflix.
          </p>
          <button className="px-12 py-5 bg-[#e50914] text-white font-semibold text-xl rounded hover:bg-[#b20710] transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/30">
            Start Watching Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
