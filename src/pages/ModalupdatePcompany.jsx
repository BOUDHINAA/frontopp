import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Input, Button, Typography } from "@material-tailwind/react";

function ModalupdatePcompany({ isOpen, onClose }) {
  const { pId } = useParams(); // Assuming pId is obtained from the route params
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    domainOfActivity: '',
    matriculeFiscale: '',
    description: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    domainOfActivity: '',
    matriculeFiscale: '',
    description: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  });
  useEffect(() => {
    const fetchProfileJob = async () => {
      try {
        const response = await axios.get(`/user/getProfileCompanyById/${pId}`);
        const profileData = response.data.profile;
        setFormData(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileJob();
  }, [pId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate input
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (!/^[a-zA-Z]+$/.test(value.trim())) {
          errorMessage = 'Name must contain only alphabetic letters';
        } else if (value.trim().length < 5) {
          errorMessage = 'Name must be at least 5 characters long';
        } else {
          errorMessage = '';
        }
        break;
      case 'address':
        if (!/^[a-zA-Z]+$/.test(value.trim())) {
          errorMessage = 'address must contain only alphabetic letters';
        } else if (value.trim().length < 5) {
          errorMessage = 'address must be at least 5 characters long';
        } else {
          errorMessage = '';
        }
        break;       
      case 'domainOfActivity':
        errorMessage = value.trim() ? '' : 'domainOfActivity cannot be empty';
        break;
        case 'matriculeFiscale':
          if (value.trim() === '') {
            errorMessage = 'matriculeFiscale cannot be empty';
          } else if (!/^\d+$/.test(value)) {
            errorMessage = 'matriculeFiscale must contain only digits';
          } else if (value.trim().length > 9) {
            errorMessage = 'matriculeFiscale cannot exceed 9 digits';
          } else {
            errorMessage = '';
          }
          break;
          break;
          case 'phoneNumber':
            if (value.trim() === '') {
              errorMessage = 'Phone number cannot be empty';
            } else if (!/^\d+$/.test(value)) {
              errorMessage = 'Phone number must contain only digits';
            } else if (value.trim().length > 9) {
              errorMessage = 'Phone number cannot exceed 9 digits';
            } else {
              errorMessage = '';
            }
            break;
          case 'description':
            if (!/^[a-zA-Z]+$/.test(value.trim())) {
              errorMessage = 'address must contain only alphabetic letters';
            } else if (value.trim().length < 5) {
              errorMessage = 'address must be at least 5 characters long';
            } else {
              errorMessage = '';
            }
            break;       
      case 'twitter':
        errorMessage = value.trim() ? '' : 'twitter cannot be empty';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`/user/updateProfileCompany/${pId}`, formData);
      console.log(response.data); // Log response data
      onClose(); // Close the modal after successful update
      window.location.reload();

    } catch (error) {
      console.error('Error updating profile:', error);
      // Set validation errors received from the backend
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      {isOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
       <div className="fixed inset-0 bg-black opacity-50"></div>
       <div className="relative w-full max-w-4xl mx-auto my-24">
         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
           <div className="flex items-start justify-between p-5  rounded-t -mb-12">
             <h3 className="text-3xl font-semibold">Update Profile</h3>
             <button
               className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
               onClick={onClose}
             >
               <span className="text-black opacity-50">×</span>
             </button>
          </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" font-medium" >
                Name
              </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-style"
                      />
                      {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" font-medium" >
                        Address:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-style"
                      />
          {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" mt-1 font-medium" >
                        Phone Number:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="input-style"
                      />
                        {errors.phoneNumber && <Typography variant="small" color="red">{errors.phoneNumber}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" mt-1 font-medium" >
                        Domain of Activity:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter domain of activity"
                        name="domainOfActivity"
                        value={formData.domainOfActivity}
                        onChange={handleChange}
                        className="input-style"
                      />
                 {errors.domainOfActivity && <Typography variant="small" color="red">{errors.domainOfActivity}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" mt-1 font-medium" >
                        Matricule Fiscale:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter matricule fiscale"
                        name="matriculeFiscale"
                        value={formData.matriculeFiscale}
                        onChange={handleChange}
                        className="input-style"
                      />
              {errors.matriculeFiscale && <Typography variant="small" color="red">{errors.matriculeFiscale}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className="mt-1 font-medium" >
                        Description:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input-style"
                      />
    {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}

                    </div>
                    {/*
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" mt-1 font-medium" >
                        Facebook:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter Facebook"
                        name="facebook"
                        value={formData.socialMedia.facebook}
                        onChange={handleChange}
                        className="input-style"
                      />
                          {errors.socialMedia.facebook && <Typography variant="small" color="red">{errors.socialMedia.facebook}</Typography>}

                    </div>
      */}
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className=" mt-1 font-medium" >
                        Twitter:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter Twitter"
                        name="twitter"
                        value={formData.socialMedia.twitter}
                        onChange={handleChange}
                        className="input-style"
                      />
                     {errors.twitter && <Typography variant="small" color="red">{errors.twitter}</Typography>}
                    </div>
                    <div className="flex flex-col gap-6">
                    <Typography variant="small" color="blue-gray" className="mt-1 font-medium" >
                        Linkedin:
                      </Typography>
                      <Input
                        size="regular"
                        placeholder="Enter Linkedin"
                        name="linkedin"
                        value={formData.socialMedia.linkedin}
                        onChange={handleChange}
                        className="input-style"
                      />
                          {errors.linkedin && <Typography variant="small" color="red">{errors.socialMedia.linkedin}</Typography>}
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blue-gray-200 rounded-b ">
                    <button
                      className="bg-red-500 text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear rounded  transition-all duration-150 "
                      type="button"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 active:bg-emerald-600 bg-blue-gray-500 text-white  font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalupdatePcompany;
