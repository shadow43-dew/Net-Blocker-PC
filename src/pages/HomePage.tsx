import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';
import { Filter } from 'lucide-react';

const categories = [
  "All", "Anime", "Music", "Gaming", "Programming", "Movies", "Live", "Recently uploaded"
];

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = activeCategory === "All" 
    ? mockVideos 
    : mockVideos.filter(video => video.category === activeCategory);

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6 overflow-x-auto scrollbar-hide pb-2">
        <button className="flex items-center mr-4 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
          <Filter size={16} className="mr-2" />
          <span>Filters</span>
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full mr-2 transition-colors ${
              activeCategory === category 
                ? 'bg-white text-gray-900 font-medium' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;