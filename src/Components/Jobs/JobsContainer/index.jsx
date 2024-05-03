// JobListContainer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios (npm install axios)
import JobCard from '../JobsCard';
import Loader from '@/Components/Loader';
// Assuming you've already created the JobCard component

const JobListContainer = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScroll = (e) => {
    if (loading) return;
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const bottom = offsetHeight + scrollTop >= scrollHeight - 200;
    if (bottom) setPage(page + 1);
  };
  const fetchJobs = async (isPageChange) => {
    setLoading(true);
    try {
      const response = await axios.get(`/jobs/?page=${page}&search=${searchQuery}`);
      setJobs((prev) =>
        isPageChange ? (prev ? [...prev, ...response.data] : response.data) : response.data,
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };
  useEffect(() => {
    fetchJobs(true);
  }, [page]);
  useEffect(() => {
    fetchJobs(false);
  }, [searchQuery]);
  return (
    <div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {!loading && !jobs?.length && <p style={{display:'flex', height:'10rem', alignItems:'center',justifyContent:'center'}}>No data was found</p>}
      {jobs?.length ? (
        <div
          style={{ maxHeight: '50rem', overflowY: 'scroll' }}
          onScroll={handleScroll}
          className="grid gap-4 grid-cols-1 p-5"
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        loading && <Loader />
      )}
    </div>
  );
};

export default JobListContainer;
