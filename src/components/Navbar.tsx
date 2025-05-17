import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, Upload, User, X } from 'lucide-react';
import GoLiveLogo from './GoLiveLogo';
import UploadModal from './UploadModal';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would navigate to search results
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 py-2 px-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuClick}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <GoLiveLogo className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent hidden md:block">
                Go Live
              </span>
            </Link>
          </div>

          <div className={`${showSearch ? 'flex absolute inset-0 bg-gray-900 z-20 px-4' : 'hidden md:flex'} items-center flex-1 max-w-2xl mx-4`}>
            {showSearch && (
              <button 
                className="p-2 mr-2" 
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            )}
            <form onSubmit={handleSearchSubmit} className="flex flex-1">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 bg-gray-800 border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-700 hover:bg-gray-600 px-4 rounded-r-full border border-l-0 border-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
              
          <div className="flex items-center space-x-2">
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => setShowSearch(true)}
              aria-label="Search"
            >
              <Search size={24} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => setShowUploadModal(true)}
              aria-label="Upload"
            >
              <Upload size={24} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={24} />
            </button>
            <Link 
              to="/profile/demo-user" 
              className="p-1 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      </nav>

      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </>
  );
};

export default Navbar;