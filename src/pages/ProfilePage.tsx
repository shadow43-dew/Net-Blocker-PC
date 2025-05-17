import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockChannels, mockVideos } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import { 
  Bell, 
  MessageSquare, 
  Search,
  Grid,
  List
} from 'lucide-react';

const tabs = ["Videos", "Playlists", "Community", "Channels", "About"];

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("Videos");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const channel = mockChannels.find(c => c.id === username) || mockChannels[0];
  const channelVideos = mockVideos.filter(video => video.channel.id === channel.id);
  
  return (
    <div className="container mx-auto">
      {/* Channel Banner */}
      <div className="relative">
        <div 
          className="w-full h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-800"
        >
          {channel.banner && (
            <img 
              src={channel.banner} 
              alt={`${channel.name}'s banner`} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      
      {/* Channel Info */}
      <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-12 mb-6 px-4 relative z-10">
        <img 
          src={channel.avatar} 
          alt={channel.name} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-900 bg-gray-900"
        />
        
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray-400 mt-1">
            {channel.subscribers} subscribers • {channelVideos.length} videos
          </p>
          <p className="text-gray-400 text-sm mt-1 line-clamp-1 max-w-md">
            {channel.description}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 md:ml-auto">
          <button 
            className={`px-6 py-2 rounded-full font-medium ${
              isSubscribed 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
            onClick={() => setIsSubscribed(!isSubscribed)}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
          {isSubscribed && (
            <button className="ml-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <Bell size={18} />
            </button>
          )}
          <button className="ml-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
      
      {/* Channel Navigation */}
      <div className="border-b border-gray-800 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Channel Content */}
      <div>
        {activeTab === "Videos" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <input
                  type="search"
                  placeholder="Search in channel..."
                  className="w-full py-2 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-md ${viewMode === 'grid' ? 'bg-gray-700' : 'bg-gray-800'}`}
                >
                  <Grid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-md ${viewMode === 'list' ? 'bg-gray-700' : 'bg-gray-800'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {channelVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {channelVideos.map(video => (
                  <div key={video.id} className="flex bg-gray-800 rounded-lg overflow-hidden">
                    <Link to={`/video/${video.id}`} className="w-48 h-32 shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/video/${video.id}`} className="font-medium text-white hover:text-purple-400 line-clamp-2">
                        {video.title}
                      </Link>
                      <div className="text-xs text-gray-400 mt-1">
                        {video.views.toLocaleString()} views • {video.publishedAt}
                      </div>
                      <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                        {video.description || "No description available."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {channelVideos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">No videos found</p>
              </div>
            )}
          </>
        )}
        
        {activeTab !== "Videos" && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">This section is coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;