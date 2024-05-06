import React from 'react';

const Navbar: React.FC = () => {
    return (
      <nav className="h-16 flex items-center justify-between p-5">
        <div className="flex items-center"> 
          <img src="./logo.png" alt="Logo" className="h-14 mr-3" />
          <span className="text-xl font-semibold text-white">Mateo Vision</span>
        </div>
      </nav>
    );
  }

export default Navbar;