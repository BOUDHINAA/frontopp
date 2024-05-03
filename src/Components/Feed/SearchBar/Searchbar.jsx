import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let timeoutId = null;

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/search/users?query=${query}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log('Search results:', response.data); // Log the response data
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const delayedSearch = (query) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => handleSearch(query), 300); // 300 milliseconds delay
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log('Search query:', value); 
    setSearchQuery(value);
    delayedSearch(value);
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <div className="relative">
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={handleChange} // Trigger search on input change
        />
        <button
          type="button"
          onClick={() => handleSearch(searchQuery)} // Trigger search on button click
          className="absolute inset-y-0 right-2.5 top-1/2 transform -translate-y-1/2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
        >
          Search
        </button>
      </div>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {searchResults.map((profile) => (
          <li key={[profile._id, profile.lastname]} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={`http://localhost:3000/user/profileJS_image/${profile._id}`}
                  alt="profile picture"
                  onError={(e) => {
                    e.target.src = `http://localhost:3000/user/profileCompany_image/${profile._id}`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  <Link
                    to={
                      profile.lastname
                        ? `/profile/${profile._id}`
                        : `/Profilecompany/${profile._id}`
                    }
                    className="text-red-500 hover:underline"
                  >
                    {profile.name} {profile.lastname}
                  </Link>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
