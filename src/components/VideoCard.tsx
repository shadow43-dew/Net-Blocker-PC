import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ThumbsUp, Clock } from 'lucide-react';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    publishedAt: string;
    channel: {
      id: string;
      name: string;
      avatar: string;
    };
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    } else {
      return `${views} views`;
    }
  };

  return (
    <div className="video-card group">
      <Link to={`/video/${video.id}`} className="block relative rounded-lg overflow-hidden aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="video-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200"></div>
        <div className="video-duration absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-medium text-white rounded-sm transition-colors duration-200">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-3 bg-purple-600 rounded-full">
            <Play fill="white" size={20} />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-gray-900/80 p-1.5 rounded-full" aria-label="Add to watch later">
            <Clock size={16} />
          </button>
          <button className="bg-gray-900/80 p-1.5 rounded-full" aria-label="Like">
            <ThumbsUp size={16} />
          </button>
        </div>
      </Link>
      <div className="mt-3 flex">
        <Link to={`/profile/${video.channel.id}`} className="shrink-0 mr-3">
          <img 
            src={video.channel.avatar} 
            alt={video.channel.name} 
            className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-purple-500 transition-colors"
          />
        </Link>
        <div>
          <Link to={`/video/${video.id}`} className="font-medium text-white line-clamp-2 hover:text-purple-400 transition-colors">
            {video.title}
          </Link>
          <Link to={`/profile/${video.channel.id}`} className="text-sm text-gray-400 hover:text-purple-400 transition-colors mt-1 block">
            {video.channel.name}
          </Link>
          <div className="text-xs text-gray-500 mt-1">
            {formatViews(video.views)} • {video.publishedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;