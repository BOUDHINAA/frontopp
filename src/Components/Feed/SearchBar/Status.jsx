import React, { useState, useEffect } from 'react';
import Loader from '@/Components/Loader'; // Import your Loader component
import axios from 'axios';
import { Card, CardContent, Typography, Chip, Avatar, Button, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Status = ({ initialPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); // Number of posts to display initially

  useEffect(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch all the posts
      const postsResponse = await axios.get('/status');
      const posts = postsResponse.data;

      // Fetch the user profiles
      const profilesResponse = await axios.get('search/all');
      const profiles = profilesResponse.data;

      // Add the username to each post
      const postsWithUsername = posts.map((post) => {
        // Find the profile that matches the userProfileId of the post
        const profile = profiles.find(
          (profile) => profile._id.toString() === post.userProfileId,
        );

        // If a matching profile is found, add the username to the post
        if (profile) {
          return { ...post, username: profile.name };
        }

        // If no matching profile is found, return the post as is
        return post;
      });

      setPosts(postsWithUsername);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setDisplayCount(displayCount + 4); // Display 4 more posts when scrolled to the bottom
  };

  if (loading) {
    return <Loader />; // Display your Loader component while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="container mx-auto px-4">
      {posts.slice(0, displayCount).map(
        (
          post,
          index, // Only display the first 'displayCount' posts
        ) => (
          <div
            key={index}
            className="bg-red-500 shadow overflow-hidden sm:rounded-lg my-4 p-6"
          >
            <div className="px-4 py-5 sm:px-6">
              <Avatar
                src={`http://localhost:3000/user/profileCompany_image/${localStorage.getItem(
                  'pId',
                )}`}
                alt="Profile picture"
                variant="square"
                sx={{ width: 80, height: 80 }}
              />
              <Typography variant="h4" component="div">
                 {post.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.createdAt).toUTCString()}
              </Typography>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <Typography variant="h5">{post.content}</Typography>
              {post.tags.map((tag, index) => (
                <Chip key={index} label={`#${tag}`} variant="outlined" sx={{ m: 0.5 }} />
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Status;
