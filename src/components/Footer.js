import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>© 2024 BingeFlix. All rights reserved.</p>
                <div className="mt-2">
                    <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">Netflix</a>
                    <a href="https://www.hulu.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">Hulu</a>
                    <a href="https://www.amazon.com/Prime-Video" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">Prime Video</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

