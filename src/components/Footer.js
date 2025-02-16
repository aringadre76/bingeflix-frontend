import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center px-4">
                <p className="text-sm md:text-base">© 2024 BingeFlix. All rights reserved.</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                    <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Netflix</a>
                    <a href="https://www.hulu.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Hulu</a>
                    <a href="https://www.amazon.com/Prime-Video" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Prime Video</a>
                </div>

                {/* About Developer Section */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                    <p className="text-sm font-semibold mb-2">Developed by Arin Gadre</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://github.com/aringadre76" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a>
                        <a href="https://github.com/aringadre76/bingeflix-frontend" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Frontend Repo</a>
                        <a href="https://github.com/aringadre76/bingeflix-backend" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Backend Repo</a>
                        <a href="https://www.linkedin.com/in/arin-gadre/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

