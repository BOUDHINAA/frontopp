import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/layout/navbar';
import { Navbar1, Navbarjs } from '@/widgets/layout';

function OCRUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Handles file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Sends the file to the server for OCR and handles the response
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/OCR/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setExtractedText(response.data.jobInfo);
        setEditedText(response.data.jobInfo);
        setError('');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
      console.error('Error during OCR:', error);
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle text change in the input field
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  // Handle confirm update
  const handleConfirmUpdate = () => {
    setExtractedText(editedText);
    setIsEditing(false);
  };

  return (
    <>
      <Navbarjs />
      <form className="mx-auto  w-full mt-12 lg:w-5/12 border border-gray-300 rounded-lg shadow-lg p-8">
        <div className="font-bold mb-12 flex">Upload an image or a screenshot to extract job offer information:</div>
        
        <div className="mb-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <p className="text-sm text-gray-500 mb-8">
            Supported image formats: JPG, PNG, BMP, TIFF
          </p>
        </div>
        
        <button
    onClick={handleUpload}
    type="button"
    className="bg-red-800 text-white px-10 py-1 rounded w-full"
>
    Upload and Extract
</button>


        {error && <p className="text-red-800 mt-4">{error}</p>}
        
        {extractedText && (
          <div className="mt-8">
            <div className="flex justify-between items-start">
            <h2 className="font-bold">Extracted Job Information:</h2>
            <div className="text-right">
            <button
                    onClick={handleEditClick}
                    type="button"
                    className="bg-gray text-white px-2 py-2 mt-2 rounded-full"
                  >
                    ✏️
                  </button>
            </div>
        </div>
        
            <div className="mt-4 ">
              {isEditing ? (
                <>
                  <textarea
                    className="w-full border border-gray-300 p-20"
                    value={editedText}
                    onChange={handleTextChange}
                  />
                  <button
    onClick={handleConfirmUpdate}
    type="button"
    className="bg-green-500 text-white px-2 py-1 mt-8 rounded mx-auto block"
>
    Confirm changes
</button>

                </>
              ) : (
                <>
                  <p>{extractedText}</p>
                 
                </>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default OCRUploader;
