import React from 'react';

const ShowDetailSignUP = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="mb-4">Join us on Opportunify to see full job offers details!</p>
        <div className="flex justify-center">
          <button className="bg-red-800 text-white px-4 py-2 rounded mr-4" onClick={onConfirm}>Register Now</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onClose}>Later on</button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailSignUP;
