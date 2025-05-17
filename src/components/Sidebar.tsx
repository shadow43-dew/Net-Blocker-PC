import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Flame, 
  Clock, 
  ThumbsUp, 
  Film, 
  Music, 
  Gamepad2, 
  Code, 
  Book, 
  GraduationCap,
  Award,
  Tv,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, to, isOpen }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center py-3 px-4 rounded-lg hover:bg-gray-700/50 transition-all ${
        isOpen ? 'justify-start space-x-4' : 'justify-center'
      }`}
    >
      <div className="text-gray-300">{icon}</div>
      {isOpen && <span className="text-gray-300">{text}</span>}
    </Link>
  );
};

const SidebarSection: React.FC<{ title: string; isOpen: boolean; children: React.ReactNode }> = ({ 
  title, 
  isOpen, 
  children 
}) => {
  if (!isOpen) return <>{children}</>;
  
  return (
    <div className="mb-4">
      <h3 className="px-4 mb-2 text-sm font-semibold text-gray-400 uppercase">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 z-20 transition-all duration-300 overflow-y-auto scrollbar-hide ${
        isOpen ? 'w-64' : 'w-20'
      } pt-16`}
    >
      <div className="py-2">
        <SidebarSection title="Main" isOpen={isOpen}>
          <SidebarItem icon={<Home size={24} />} text="Home" to="/" isOpen={isOpen} />
          <SidebarItem icon={<Flame size={24} />} text="Trending" to="/category/trending" isOpen={isOpen} />
          <SidebarItem icon={<Clock size={24} />} text="History" to="/history" isOpen={isOpen} />
          <SidebarItem icon={<ThumbsUp size={24} />} text="Liked Videos" to="/liked" isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="Categories" isOpen={isOpen}>
          <SidebarItem icon={<Tv size={24} />} text="Anime" to="/category/anime" isOpen={isOpen} />
          <SidebarItem icon={<Film size={24} />} text="Movies" to="/category/movies" isOpen={isOpen} />
          <SidebarItem icon={<Music size={24} />} text="Music" to="/category/music" isOpen={isOpen} />
          <SidebarItem icon={<Gamepad2 size={24} />} text="Gaming" to="/category/gaming" isOpen={isOpen} />
          <SidebarItem icon={<Code size={24} />} text="Programming" to="/category/programming" isOpen={isOpen} />
          <SidebarItem icon={<Book size={24} />} text="Books" to="/category/books" isOpen={isOpen} />
          <SidebarItem icon={<GraduationCap size={24} />} text="Education" to="/category/education" isOpen={isOpen} />
          <SidebarItem icon={<Award size={24} />} text="Sports" to="/category/sports" isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="Settings" isOpen={isOpen}>
          <SidebarItem icon={<Settings size={24} />} text="Settings" to="/settings" isOpen={isOpen} />
          <SidebarItem icon={<HelpCircle size={24} />} text="Help" to="/help" isOpen={isOpen} />
        </SidebarSection>
        
        {isOpen && (
          <div className="px-4 py-4 mt-4 text-xs text-gray-400">
            <p className="mb-2">© 2025 Go Live</p>
            <p>Terms • Privacy • Policy & Safety</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;