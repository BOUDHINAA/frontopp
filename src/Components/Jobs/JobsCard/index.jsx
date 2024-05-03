import React from 'react';

const JobCard = ({ job }) => {
  return (
    <a href={job.url} rel="noopener noreferrer" target="_blank">
      <div
        style={{
          maxHeight: '15rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-ellipsis"
      >
        {/* <img
        src={job.logo}
        alt={`${job.company_name} Logo`}
        className="w-16 h-16 mx-auto mb-4"
      /> */}
        <h2 className="text-xl font-semibold">{job.company_name}</h2>
        <p className="text-gray-600">{job.role}</p>
        <p className="text-gray-500">{job.location}</p>
        <p className="text-sm mt-2">
          Company Size: {job.company_num_employees || 'Not provided'}
        </p>
        <p className="text-sm mt-1">Remote: {job.remote ? 'Yes' : 'No'}</p>
        {/* <p
          dangerouslySetInnerHTML={{ __html: job.text }}
          className="text-gray-700 mt-4 text-ellipsis"
        ></p> */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Learn more
        </a>
      </div>
    </a>
  );
};

export default JobCard;
