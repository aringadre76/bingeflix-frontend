
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdnAcc = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownHeight, setDropdownHeight] = useState('0px');

    const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setDropdownHeight('auto');
    };

    const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setDropdownHeight('0px');
    };
  
    return (
        <div className={`relative rounded px-5 py-3.5  ${isDropdownOpen ? 'bg-black' : ''} `}  
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          style={{ top: '50px', width: '150px', height: '150px' }}
          >
        {/* Dropdown button */}
        <button className="text-white">
          My Account
        </button>
        
        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="absolute left-0 py-0 mt-2 bg-black shadow-lg w-full" style={{ height: dropdownHeight, overflow: 'hidden' }} >
            {/* Dropdown items */}
            <Link to="/under_construction" className="button hover:bg-gray-200"style={{ color: 'white'}}>Account</Link>
            <Link to="/under_construction" className="button hover:bg-gray-200"style={{ color: 'white'}}>Settings</Link>
            <Link to="/" className="button hover:bg-gray-200"style={{ color: 'maroon'}}>Logout</Link>
          </div>
        )}
      </div>
    );
};
  
export default DropdnAcc;
