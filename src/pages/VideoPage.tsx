import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVideos, mockComments, mockUser } from '../data/mockData';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

interface CommentProps {
  comment: {
    id: string;
    text: string;
    likes: number;
    publishedAt: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className="flex mb-5">
      <Link to={`/profile/${comment.user.id}`} className="shrink-0 mr-3">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.name} 
          className="h-10 w-10 rounded-full"
        />
      </Link>
      <div className="flex-1">
        <div className="flex items-center">
          <Link to={`/profile/${comment.user.id}`} className="font-medium text-white mr-2">
            {comment.user.name}
          </Link>
          <span className="text-xs text-gray-400">{comment.publishedAt}</span>
        </div>
        <p className="mt-1 text-gray-200">{comment.text}</p>
        <div className="flex items-center mt-2 text-gray-400">
          <button 
            className={`flex items-center hover:text-white ${liked ? 'text-purple-500' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp size={16} className="mr-1" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center ml-4 hover:text-white">
            <ThumbsDown size={16} />
          </button>
          <button className="ml-4 hover:text-white">Reply</button>
        </div>
      </div>
    </div>
  );
};

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [videoLikes, setVideoLikes] = useState(0);
  const [comments, setComments] = useState(mockComments);
  
  const video = mockVideos.find(v => v.id === id);
  
  if (!video) {
    return <div className="text-center py-10">Video not found</div>;
  }

  React.useEffect(() => {
    setVideoLikes(video.likes);
  }, [video.likes]);

  const relatedVideos = mockVideos
    .filter(v => v.id !== id && v.category === video.category)
    .slice(0, 6);

  const handleLike = () => {
    if (liked) {
      setVideoLikes(videoLikes - 1);
      setLiked(false);
    } else {
      if (disliked) {
        setDisliked(false);
      }
      setVideoLikes(videoLikes + 1);
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      if (liked) {
        setLiked(false);
        setVideoLikes(videoLikes - 1);
      }
      setDisliked(true);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c${comments.length + 1}`,
      text: commentText,
      likes: 0,
      publishedAt: 'Just now',
      user: mockUser,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-8/12 lg:pr-6">
          {/* Video Player */}
          <div className="relative bg-black aspect-video rounded-lg overflow-hidden mb-4">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-purple-600 rounded-full opacity-70">
                <span className="sr-only">Play video</span>
                {/* This would be an actual video player in a real implementation */}
              </div>
            </div>
          </div>

          {/* Video Info */}
          <h1 className="text-xl md:text-2xl font-bold mb-3">{video.title}</h1>
          
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center">
              <Link to={`/profile/${video.channel.id}`} className="shrink-0 mr-3">
                <img 
                  src={video.channel.avatar} 
                  alt={video.channel.name} 
                  className="h-12 w-12 rounded-full"
                />
              </Link>
              <div>
                <Link to={`/profile/${video.channel.id}`} className="font-medium text-white hover:text-purple-400 transition-colors">
                  {video.channel.name}
                </Link>
                <div className="text-sm text-gray-400">
                  1.2M subscribers
                </div>
              </div>
              <button 
                className={`ml-4 px-4 py-2 rounded-full font-medium ${
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
            </div>
            
            <div className="flex items-center mt-4 sm:mt-0 space-x-2">
              <div className="flex bg-gray-800 rounded-full">
                <button 
                  className={`flex items-center px-4 py-2 rounded-l-full ${liked ? 'text-purple-400' : 'text-white'} hover:bg-gray-700 transition-colors`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={18} className="mr-2" />
                  <span>{videoLikes}</span>
                </button>
                <div className="w-px bg-gray-700 h-full"></div>
                <button 
                  className={`flex items-center px-4 py-2 rounded-r-full ${disliked ? 'text-purple-400' : 'text-white'} hover:bg-gray-700 transition-colors`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={18} />
                </button>
              </div>
              
              <button className="flex items-center px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Share2 size={18} className="mr-2" />
                <span>Share</span>
              </button>
              
              <button className="flex items-center px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Download size={18} className="mr-2" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-300">
                {video.views.toLocaleString()} views • {video.publishedAt}
              </div>
              <button 
                className="text-gray-300 hover:text-white"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            {showDescription && (
              <div className="mt-4 text-gray-200">
                <p>
                  {video.description || "This is a sample video description that would typically provide more information about the content of the video, the creator, and any relevant links or resources."}
                </p>
                <div className="mt-2 text-sm text-gray-400">
                  <div>Category: {video.category}</div>
                  <div>Tags: anime, entertainment, trending</div>
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold">{comments.length} Comments</h3>
              <button className="ml-4 flex items-center text-gray-400 hover:text-white">
                <MessageSquare size={16} className="mr-2" />
                <span>Sort by</span>
              </button>
            </div>

            {/* Comment Form */}
            <div className="flex mb-6">
              <img 
                src={mockUser.avatar} 
                alt="Your avatar" 
                className="h-10 w-10 rounded-full mr-3"
              />
              <form onSubmit={handleComment} className="flex-1">
                <div className="border-b border-gray-700 pb-1 focus-within:border-purple-500">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-transparent outline-none text-white"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-400 hover:text-white mr-2"
                    onClick={() => setCommentText('')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`px-4 py-2 rounded-full ${
                      commentText.trim()
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <span className="mr-2">Comment</span>
                    <Send size={16} className="inline" />
                  </button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div>
              {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="lg:w-4/12">
          <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
          <div className="space-y-4">
            {relatedVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;