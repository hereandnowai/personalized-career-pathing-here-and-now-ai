
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-secondary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src={BRAND_CONFIG.brand.logo.title} 
            alt={`${BRAND_CONFIG.brand.organizationShortName} Logo`} 
            className="h-10 md:h-12 object-contain" 
          />
        </Link>
        <nav className="flex items-center space-x-4">
           <Link to="/employee" className="text-primary hover:text-yellow-300 transition-colors duration-200 text-sm sm:text-base">
            My Career Path
          </Link>
           <Link to="/admin" className="text-primary hover:text-yellow-300 transition-colors duration-200 text-sm sm:text-base">
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
