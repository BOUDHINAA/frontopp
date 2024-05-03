import React from 'react';

const PictureModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-auto max-w-md p-6 bg-white rounded-lg shadow-lg">

        {/* Modal header */}
        <div className="text-xl font-semibold mb-4 text-red-900">Confirm Upload</div>
        {/* Modal content */}
        <div className="mb-4">Are you sure you want to upload this image?</div>
        {/* Modal actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className=" text-black px-4 bg-blue-gray-200 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PictureModal;
