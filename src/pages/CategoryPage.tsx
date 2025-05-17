import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';

const categoryBanners: Record<string, string> = {
  anime: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg",
  gaming: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
  music: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
  programming: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  movies: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
  trending: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
};

interface CategoryHeaderProps {
  name: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name }) => {
  const normalizedName = name.toLowerCase();
  const bannerUrl = categoryBanners[normalizedName] || "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg";
  
  return (
    <div className="relative mb-8">
      <div className="h-40 md:h-56 w-full overflow-hidden rounded-lg">
        <img 
          src={bannerUrl} 
          alt={`${name} category`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white">{name}</h1>
        <p className="text-gray-300 mt-2">
          Discover the best {name.toLowerCase()} content
        </p>
      </div>
    </div>
  );
};

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  
  if (!name) {
    return <div className="text-center py-10">Category not found</div>;
  }

  // Filter videos by category (case insensitive)
  const categoryVideos = mockVideos.filter(
    video => video.category.toLowerCase() === name.toLowerCase()
  );
  
  return (
    <div className="container mx-auto">
      <CategoryHeader name={name} />
      
      {categoryVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">No videos found in this category</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;