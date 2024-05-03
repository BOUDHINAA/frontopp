import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '@/widgets/layout/Navbar';
import Loader from '../Loader';

function ProfileDetailPage() {
  const { _id } = useParams();
  console.log('profile._id:', _id);

  // State variables to hold profile data, error, and following status
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/consult/profile-detail/${_id}`);
        console.log('Profile data:', response.data); 
        // Update state with the fetched profile data
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile details:', error);
        // Handle error if fetch fails
        setError(error);
      }
    };

    // Call fetchProfile function when the component mounts
    fetchProfile();
  }, [_id]); // Dependency array ensures useEffect runs when _id changes

  // Function to handle follow/unfollow button click
  const handleFollow = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `/consult/follow/${_id}`,
        { userProfileId: _id },
        {
          // Send _id as userProfileId
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('Follow request successful');
      setIsFollowing(true);
      // Update profile data after follow action
      setProfile((prevProfile) => ({
        ...prevProfile,
        followers: [...prevProfile.followers, prevProfile._id],
      }));
    } catch (error) {
      console.error('Error following profile:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profile) {
    return <div><Loader /> </div>;
  }

  return (
    <>
      <Navbar />

      <div>{/* Display profile details */}</div>
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {profile.name }
        {profile.address}
        <div className="px-4 py-4">
          {/* Follow button */}
          <div className="flex gap-2 px-2">
            <button
              className={`flex-1 rounded-full bg-red-600 dark:bg-red-800 text-white dark:text-white antialiased font-bold hover:bg-red-800 dark:hover:bg-blue-900 px-4 py-2`}
              onClick={handleFollow}
              disabled={isFollowing}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
        {/* Display follower count */}
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <span>
              <strong className="text-black dark:text-white">
                {profile?.followers?.length}
              </strong>{' '}
              Followers
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetailPage;
