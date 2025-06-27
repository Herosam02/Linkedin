import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface PostCardProps {
  post: Post;
  onUpdate?: (postId: string, updates: Partial<Post>) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    
    setLiked(newLiked);
    setLikes(newLikes);

    // Update the post
    if (onUpdate) {
      onUpdate(post.id, { liked: newLiked, likes: newLikes });
    }
  };

  const handleComment = () => {
    if (comment.trim()) {
      const newComments = comments + 1;
      setComments(newComments);
      setComment('');
      
      // Update the post
      if (onUpdate) {
        onUpdate(post.id, { comments: newComments });
      }

      // Here you could also save the actual comment content
      console.log('New comment:', comment);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${post.author.name} on LinkedIn`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${post.content}\n\n- ${post.author.name}`);
      alert('Post content copied to clipboard!');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === 'now') return 'now';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'now';
      if (diffInMinutes < 60) return `${diffInMinutes}m`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
      return `${Math.floor(diffInMinutes / 1440)}d`;
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 hover:shadow-sm transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.profileImage}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
              {post.author.name}
            </h3>
            <p className="text-sm text-gray-600">{post.author.headline}</p>
            <p className="text-xs text-gray-500">{formatTimestamp(post.timestamp)}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg max-h-96 object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      {(likes > 0 || comments > 0 || post.shares > 0) && (
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              {likes > 0 && (
                <>
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-white fill-current" />
                  </div>
                  <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {comments > 0 && <span>{comments} {comments === 1 ? 'comment' : 'comments'}</span>}
              {post.shares > 0 && <span>{post.shares} {post.shares === 1 ? 'share' : 'shares'}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              liked
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            <Send className="w-5 h-5" />
            <span className="font-medium">Send</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-start space-x-3">
            <img
              src={user?.profileImage || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
              alt="Your profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleComment}
                disabled={!comment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;