import React from 'react';

const ModalConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="mb-4">Are you sure you want to delete this application?</p>
        <div className="flex justify-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={onConfirm}>Yes</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
