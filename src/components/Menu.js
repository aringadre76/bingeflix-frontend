import React, { useState } from 'react';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <h2>Menu</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
      );
    }
    
export default Menu;

