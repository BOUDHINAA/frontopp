import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Footer, Navbar } from "@/widgets/layout";
import { AiTwotonePhone } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import PostsList from '@/Containers/PostsList';
import Modal from './Modal.jsx';
import { Card, Container } from '@mui/material';
import AddPost from '@/Containers/AddPost';

import Chat from '../pages/Chat';
import Divider from '@mui/material/Divider';
import PictureModal from "./PictureModal.jsx";
import { AiFillEdit } from "react-icons/ai";
import ModalupdatePcompany from "./ModalupdatePcompany.jsx";

export function Profilecompany() {
  const [isHovered, setIsHovered] = useState(false); // State variable to track hover state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pId } = useParams();
  const [profile, setProfile] = useState(null);
   const [posts, setPosts] = useState([]);
   const [displayPostForm, setDisplayPostForm] = useState(false);
   const toggleDisplayPostForm = () => {
     setDisplayPostForm((prev) => !prev);
   };
   const [openModal, setOpenModal] = useState(false);

    const handledeletePost = (postId) => {
      axios.delete(`/status/${postId}`).then((data) => {
        setPosts(posts.filter((e) => e._id !== postId));
      });
    };

      const handleAddPost = (postData) => {
        setPosts((prev) => [...posts, postData]);
      };


  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [showchat, setShowchat] = useState(false); // Pour contrôler la visibilité du chatbot

  const toggleSocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
  };

  

  useEffect(() => {
    const fetchProfileCompany = async () => {
      try {
        const response = await axios.get(`/user/getProfileCompanyById/${pId}`);
        setProfile(response.data.profile); // Assuming response.data contains profile company information
        return response.data.profile._id;
      } catch (error) {
        console.error('Error fetching profile company:', error);
      }
    };

    const fetchPosts = async (id) => {
      try {
        const response = await axios.get(`/status/profile-posts/${id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
     fetchProfileCompany().then((id) => {
       fetchPosts(id);
     });

    fetchProfileCompany();
  }, [pId]);
  const formatPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Apply formatting by adding spaces after every two digits
    const formatted = cleaned.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
    return formatted;
  };
 
  const togglechat = () => {
    setShowchat((prev) => !prev); // Bascule entre affichage et non-affichage du chat
  }
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file change event
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsModalOpen(true); // Open the modal after selecting a file
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      ///alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`/user/profileCompany_image/${pId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data.message); // Log the success message

      // Update the profile image URL in the profile state variable
      setProfile(prevProfile => ({
        ...prevProfile,
        profile_picture: response.data.profile_picture // Assuming response contains the new profile picture URL
      }));

     /// alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setIsModalOpen(false); // Close the modal after upload
    }

  };

  const [showMore, setShowMore] = useState(false);

  return (
    <>
    <Navbar />
    
      <div className="bg-[url('/img/bono.png')]">
        {profile ? (
          <div>
            <section className="relative block h-[50vh] ">
              <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/bono.png')] bg-cover bg-center scale-105" />
              <div className="absolute top-0 h-full w-full   bg-cover bg-center" />
            </section>
            <section className="relative  py-16 bg-gray-100">
            <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-100">
          <div className="container mx-auto  ">
            <div className="flex flex-col lg:flex-row justify-between  items-center">
              <div className="relative flex gap-6 items-start  ">
              <div className="-mt-20 w-40">
              <label htmlFor="fileInput" className="cursor-pointer">
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
    >
      <Avatar

  src={profile ? `http://localhost:3000/user/profileCompany_image/${pId}?${Date.now()}` : ""}

          alt="Profile picture"
        variant="circular"
        className="h-full w-full mb-16"
      />
      {isHovered && ( // Conditionally render text when hovered
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <span>Click to upload image</span>
        </div>
      )}
    </div>
    <input
      id="fileInput"
      type="file"
      onChange={handleFileChange}
      className="hidden"
    />
  </label>
</div>
                      <div className="flex flex-col mt-2">
                        <Typography variant="h4" color="blue-gray">
                          {profile.name}
                        </Typography>
                        <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profile.email}</Typography>
                    
                      </div>
                    
                      <div className="ml-auto   mt-10">
                        <button onClick={() => setOpenModal(true)}>
                           <AiFillEdit className="text-black bg-white ml-1 rounded text-xl " /></button> {/* Fix: Use setOpenModal */}
                      
    </div>
     </div>
                    <div className="mt-10 mb-10 flex lg:flex-col justify-between lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
  <div className="flex gap-4 -mt-10 ml-4">
    <Button className="  font-bold  text-red-900 bg-blue-gray-100 rounded-full">Connect</Button>
    <Button className="bg-blue-gray-100 text-red-900 Lato rounded-full">Message</Button>
  </div>
</div>

               
<div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                  </div>  
              </div>
            </div>
            <div>
              <button className="bg-gray-200 text-black  mt-8 px-6   border mr-1 shadow-md  ml-4 text-lg">Edit profile</button>
            </div>




    <div className="container mx-auto p-4  -my-14  bg-[url('/img/bono.png')]">
              <div className="flex  ">
              <div className="w-1/4  bg-white p-4 shadow-md mr-14 rounded-xl">
              <div className="container space-y-2 ">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px  h-4  text-gray-600 w-4  " />
                      <Typography className="font-medium text-blue-gray-500">{profile.address}</Typography>

                    </div>
                    <hr className="my-2" />

                    <div className="flex items-center gap-2">
                    <AiOutlineIdcard className="-mt-px h-4 w-4 text-gray-600" />
                      <Typography className="font-medium text-blue-gray-500">{profile.domainOfActivity} Specialized</Typography>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center gap-2">
                      <AiTwotonePhone className="-mt-px h-4 w-4 text-blue-gray-500" />
                      <Typography className="font-medium text-blue-gray-500">{formatPhoneNumber(profile.phoneNumber)}</Typography>
                    </div>    
                    <hr className="my-2" />
                    <div className="flex  mt-2">
          <Button className=" bg-[#B22222] text-white" onClick={toggleSocialMedia}>Check Social Media</Button>
        </div>
        {showSocialMedia && (
          <div className="container mx-auto p-4 ">
            <hr className="mb-2" />
            <div className="flex items-center gap-2">
              <BsFacebook className="-mt-px h-4 w-4 text-gray-600"/>
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                ) : (
                  "Facebook"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <AiFillTwitterCircle className="-mt-px h-4 w-4 text-gray-600" />
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                ) : (
                  "Twitter"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <AiFillGithub className="-mt-px h-4 w-4 text-gray-600" />
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                ) : (
                  "LinkedIn"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
          </div>
        )}
        </div>
</div>
<div className="container mx-auto w-2/3 bg-white shadow-md rounded-2xl">
      <div className="flex items-center mt-8 mb-2">
        <h1 className="text-2xl font-bold mt-1 mx-6 text-[#B22222]">Infos</h1>
        <Divider sx={{ height: 8, backgroundColor: ' 	#B22222', flexGrow: 1, borderRadius: '8px' }} className="mr-12" />
      </div>
      <div className="ml-8 mt-4 text-blue-gray-700">
      
      </div>
    </div>

                </div>
              </div>
              
              </div>
              </div>
            </section>

            <div className="flex justify-end">
                  <Button
                    style={{ backgroundColor: '#b41615' }}
                    onClick={toggleDisplayPostForm}
                  >
                    Add new post
                  </Button>
                </div>
         
          <div>
                {displayPostForm && (
          <Container className=" bg-gray-100">
            <Card sx={{ border: '1px solid #f9f9f9', pt: '1rem' }}>
              <AddPost currentProfile={profile} handleAddPost={handleAddPost} />
            </Card>
          </Container>
        )}
        <PostsList
          posts={posts}
          profile={profile}
          handledeletePost={handledeletePost}
        ></PostsList>

        <div>
         
          <Modal open={openModal} onClose={() => setOpenModal(false)} />
        </div>

      </div>
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
      <PictureModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  onConfirm={handleUpload} 
/>

<div>
<ModalupdatePcompany isOpen={openModal} onClose={() => setOpenModal(false)} />

       </div>
        <div>
          <Footer />
          <Button
  onClick={togglechat}
  
>
  {showchat ? 'X' : 'Chat'}
</Button>
{showchat && (
  <div className="fixed bottom-12 right-4 w-72 h-96 bg-white shadow-lg rounded-lg flex flex-col">
    <Chat />
  </div>
)}
        </div>

      </div>
    </>
  );
}

export default Profilecompany;