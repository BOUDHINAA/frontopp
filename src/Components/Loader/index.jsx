import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
