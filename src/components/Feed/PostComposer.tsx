import React, { useState } from 'react';
import { Image, Video, Calendar, FileText, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostComposer: React.FC = () => {
  const { user } = useAuth();
  const [postText, setPostText] = useState('');
  const [showComposer, setShowComposer] = useState(false);
  const [postImage, setPostImage] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Image size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPostImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!postText.trim() && !postImage) {
      alert('Please add some content to your post');
      return;
    }

    setIsPosting(true);

    try {
      // Get existing posts
      const existingPosts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
      
      // Create new post
      const newPost = {
        id: Date.now().toString(),
        author: {
          name: user?.name || 'Unknown User',
          headline: user?.headline || 'Professional',
          profileImage: user?.profileImage || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        content: postText,
        image: postImage || undefined,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        createdAt: new Date().toISOString()
      };

      // Add to beginning of posts array
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem('linkedinPosts', JSON.stringify(updatedPosts));

      // Reset form
      setPostText('');
      setPostImage('');
      setShowComposer(false);

      // Trigger a custom event to refresh the feed
      window.dispatchEvent(new CustomEvent('newPost', { detail: newPost }));

      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }

    setIsPosting(false);
  };

  const removeImage = () => {
    setPostImage('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center space-x-3">
        <img
          src={user?.profileImage}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          onClick={() => setShowComposer(true)}
          className="flex-1 text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 transition-colors border border-gray-200"
        >
          Start a post
        </button>
      </div>

      {showComposer && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-start space-x-3 mb-4">
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600">Post to anyone</p>
            </div>
          </div>

          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full p-3 border-0 resize-none focus:outline-none text-lg placeholder-gray-500"
            rows={4}
            autoFocus
          />

          {postImage && (
            <div className="relative mt-4">
              <img
                src={postImage}
                alt="Post content"
                className="w-full rounded-lg max-h-96 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <Image className="w-5 h-5" />
                <span className="text-sm">Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Video className="w-5 h-5" />
                <span className="text-sm">Video</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Event</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <FileText className="w-5 h-5" />
                <span className="text-sm">Article</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setShowComposer(false);
                  setPostText('');
                  setPostImage('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isPosting}
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={(!postText.trim() && !postImage) || isPosting}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!showComposer && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <label className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Image className="w-5 h-5" />
            <span className="text-sm font-medium">Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e);
                setShowComposer(true);
              }}
              className="hidden"
            />
          </label>
          <button 
            onClick={() => setShowComposer(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Video className="w-5 h-5" />
            <span className="text-sm font-medium">Video</span>
          </button>
          <button 
            onClick={() => setShowComposer(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Event</span>
          </button>
          <button 
            onClick={() => setShowComposer(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Article</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostComposer;