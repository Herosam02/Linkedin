import React, { useState, useEffect } from 'react';
import PostComposer from './PostComposer';
import PostCard from './PostCard';
import { mockPosts } from '../../utils/mockData';
import { Post } from '../../types';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    try {
      // Get user posts from localStorage
      const userPosts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
      
      // Combine user posts with mock posts
      const allPosts = [...userPosts, ...mockPosts];
      
      // Sort by creation date (newest first)
      allPosts.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();

    // Listen for new posts
    const handleNewPost = () => {
      loadPosts();
    };

    window.addEventListener('newPost', handleNewPost);

    return () => {
      window.removeEventListener('newPost', handleNewPost);
    };
  }, []);

  const handlePostUpdate = (postId: string, updates: Partial<Post>) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );

    // Update in localStorage if it's a user post
    try {
      const userPosts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
      const updatedUserPosts = userPosts.map((post: Post) => 
        post.id === postId ? { ...post, ...updates } : post
      );
      localStorage.setItem('linkedinPosts', JSON.stringify(updatedUserPosts));
    } catch (error) {
      console.error('Error updating post in localStorage:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl">
        <PostComposer />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PostComposer />
      <div className="space-y-0">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onUpdate={handlePostUpdate}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;