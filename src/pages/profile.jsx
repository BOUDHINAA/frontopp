import { Avatar, Typography, Button ,input} from "@material-tailwind/react";
import company from "./company.png";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Banner from "./Banner.png";
import { BiSolidCake } from "react-icons/bi";
import { Footer, Navbar } from "@/widgets/layout";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiTwotonePhone } from "react-icons/ai";
import Modal from "./Modal.jsx";
import Chat from '../pages/Chat';
import { BiBell } from "react-icons/bi"; // Importez une icône de notification, par exemple BiBell de react-icons
import PictureModal from "./PictureModal.jsx";
import { AiFillEdit } from "react-icons/ai";
import  "./Modal.css";
import { Navbarjs } from "@/widgets/layout";
import { AiOutlineArrowRight } from "react-icons/ai";
import PostsList from "@/Containers/PostsList/index.jsx";
import { Card, Container } from "@mui/material";
import AddPost from "@/Containers/AddPost/index.jsx";
import { useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Pages } from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
export function Profile() {

  const [showPictureModal, setShowPictureModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State variable to track hover state
  const [showchat, setShowchat] = useState(false); // Pour contrôler la visibilité du chatbot

  // Function to open modal
  const openPictureModal = () => {
    setShowPictureModal(true);
  };
  const { userId } = useParams();
  // Function to close modal
  const closePictureModal = () => {
    setShowPictureModal(false);
  }; const [showNotificationMessage, setShowNotificationMessage] = useState(false); // State variable to control the visibility of the notification message
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState(""); // State variable to store the notification message content

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/Interview/notifications/${userId}`);
        const notifications = response.data;
        const unreadCount = notifications.filter(notification => !notification.read).length;
        setUnreadNotifications(unreadCount);
        // Display all notification messages
        if (notifications.length > 0) {
          const messages = notifications.map(notification => notification.message);
          setNotificationMessage(messages); // Set notificationMessage to messages array
          setShowNotificationMessage(true);
        } else {
          setNotificationMessage([]); // Initialize notificationMessage as an empty array
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);
  

  const handleNotificationClick = () => {
    setShowNotificationMessage(!showNotificationMessage); // Toggle the visibility of the notification message
  };

  
  const [openModal, setOpenModal] = useState(false);
  
  const [profile, setprofile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setShowPictureModal(true); // Open the picture modal after selecting a file

  };

  const handleUpload = async () => {
    if (!selectedFile) {
      //alert('Please select an image file');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      const response = await axios.post(`/user/profileJobSeeker_image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Image uploaded successfully:', response.data);
  
      // Update the profile image URL in the profile state variable
      setprofile(prevProfile => ({
        ...prevProfile,
        profile_picture: response.data.profile_picture // Assuming response contains the new profile picture URL
      }));
  
  //    alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };
  
  const [isInputFocused, setInputFocused] = useState(false);

  const [showBirthdate, setShowBirthdate] = useState(false);

  const handleButtonClick = () => {
    setShowBirthdate(!showBirthdate);
  };
  const [posts, setPosts] = useState([]);
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const toggleDisplayPostForm = () => {
    setDisplayPostForm((prev) => !prev);
  };
 // const userData = JSON.parse(localStorage.getItem('userData'));
// Fonction pour formater le numéro de téléphone
const formatPhoneNumber = (phoneNumber) => {
  // Supprimer tout ce qui n'est pas un chiffre
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  // Appliquer le formatage en ajoutant un espace après chaque groupe de trois chiffres
  const formatted = cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/,'$1 $2 $3 $4');
  return formatted;
};

 // Function to format the birthdate
 const formatBirthdate = (birthdate) => {
  const date = new Date(birthdate);
  return date.toLocaleDateString(); // Adjust the format as needed
};

 // const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const updateDescription = async () => {
    try {
      const response = await axios.put(`/user/profileJobSeeker_description/${userId}`, {
        description: description
      });
      console.log(response.data.message); // Log success message
      handleUpdateDescription();
    } catch (error) {
      console.error('Error:', error.message); // Log error message
    }
  };
  const handleUpdateDescription = () => {
    // Update logic for handling description update
    // Update state to hide the edit button after description update
    setOpenModal(false);
   
    setEditVisible(false);
  };
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`/user/getProfileJobSeekerById/${userId}`);
        const profile = response.data.profile;
        setprofile(profile); // Assuming response.data contains user information
        return profile._id;
      } catch (error) {
        console.error('Error fetching user:', error);
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

    fetchprofile().then((id) => {
      fetchPosts(id);
    });
  }, [userId]);
  const handleAddPost = (postData) => {
    setPosts((prev) => [...posts, postData]);
  };
  const handledeletePost = (postId) => {
    axios.delete(`/status/${postId}`).then((data) => {
      setPosts(posts.filter((e) => e._id !== postId));
    });
  };


  //const [description, setDescription] = useState(profile.description || '');
  const [description, setDescription] = useState('');

  // Set the initial value of description when the profile is available
  useEffect(() => {
    if (profile) {
      setDescription(profile.description);
    }
  }, [profile]);


  const [isEditVisible, setEditVisible] = useState(false);

  const handleEditButtonClick = () => {
    setEditVisible(!isEditVisible);
  };


  const [gitUrl, setGitUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
const handleUpdateGitUrl = async () => {
  try {
    const response = await axios.put(`/user/profileJobSeeker_git/${userId}`, {
      git_url: gitUrl // Use gitUrl state here
    });
    console.log(response.data.message); // Log success message
    setIsEditing(false);

  } catch (error) {
    console.error('Error:', error.message); // Log error message
  }
};


const [tempDescription, setTempDescription] = useState('');
const [selectedTechnology, setSelectedTechnology] = useState('');
  const [technologies, setTechnologies] = useState([]);

  const handleSelectChange = async (event) => {
    const selectedTech = event.target.value;
    if (selectedTech !== '') {
      try {
        const response = await axios.put(`/user/profileJobSeeker_technologies/${userId}`, {
          technologies: [...technologies, selectedTech] // Add the selected technology to the array
        });
        console.log(response.data.message); // Log success message
        setTechnologies(prevTech => [...prevTech, selectedTech]); // Update state with the selected technology
      } catch (error) {
        console.error('Error:', error.message); // Log error message
      }
    }
  };
  

  const addTechnology = (tech) => {
    setTechnologies([...technologies, tech]);
    setSelectedTechnology('');
  };

  const getRandomColor = () => {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };
  // Map each technology to its corresponding emoji
  const technologyEmojiMap = {
      'React JS': '⚛️', 'Java': '☕', 'Python': '🐍', 'JavaScript': '🔥', 'HTML': '📄','CSS': '🎨', 'Node.js': '🚀', 'Express.js': '🛣️', 'MongoDB': '🍃', 'SQL': '💾', 'Vue.js': '🖖', 'Angular': '🅰️', 'TypeScript': '🔵', 'Ruby': '💎', 'PHP': '🐘','C#': '♯', 'C++': '➕➕', 'Swift': '🍎', 'Kotlin': '🐨', 'Dart': '🎯', 'Flutter': '🦋','Assembly': '💻', 'Rust': '🦀', 'Go': '🐹', 'Perl': '🐪', 'Scala': '🚀','Elixir': '💧','F#': '🧪', 'Shell': '🐚', 'AWS': '☁️','Google Cloud': '☁️', 'Azure': '☁️', 'Firebase': '🔥', 'Heroku': '🌐','Docker': '🐳', 'Kubernetes': '⚓', 'Jenkins': '🔧', 'Git': '🐙', 
      'GitHub': '💻','GitLab': '🔒', 'Bitbucket': '🔑', 'JIRA': '📋', 'WebSockets': '🧦','REST API': '📡','GraphQL': '🔗','OAuth': '🔒','JSON': '📝','Regular Expressions': '🔍','Agile': '🏃‍♂️','Scrum': '🏉','Kanban': '📑','Waterfall': '🚰','DevOps': '⚙️','CI/CD': '🚀','TDD': '🔴🔵','BDD': '🟢🔵',
  }
// Update the temporary input value instead of directly updating the description state
const togglechat = () => {
  setShowchat((prev) => !prev); // Bascule entre affichage et non-affichage du chat
};

  return (
    <>
    <div  className="">
 < Navbarjs />
 
 </div>
    <div>
    {profile ? (
          <div>

            {/* Display other user information     <p>: {user.role_jobseeker} </p> */}
           
         
            <section className="relative block h-[50vh]">
           
        <div className="bg-profile-background absolute pt-2 top-0 h-full w-full bg-[url('/img/bono.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full  bg-cover bg-center bg-[url('/img/bono.png')] " />
      </section>
      <section className="relative  py-16 bg-gray-100 bg-[url('/img/bono.png')]">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-100 ">
          <div className="container mx-auto  ">
            <div className="flex flex-col lg:flex-row justify-between  items-center">
              <div className="relative flex gap-6 items-start">
              <div className="-mt-32 w-40 mb-14 relative">
                        {/* Avatar and file input */}
                        <label htmlFor="fileInput" className="cursor-pointer">
                          <div
                            className="relative"
                            onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
                            onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
                          >
                           <Avatar
  src={profile ? `http://localhost:3000/user/profileJS_image/${userId}?${Date.now()}` : ""}
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
                <div>
   </div>

               
   <div className="flex flex-col lg:flex-row mt-2 lg:items-center">
  <div className="flex flex-col">
    <Typography variant="h4" color="blue-gray">
      {profile.name} {profile.lastname}
    </Typography>
    <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">
      {profile.email}
    </Typography>
  </div>
  <div className="ml-auto">
    <button 
      onClick={() => setOpenModal(true)} 
      className="modalButton  px-6 py-2 border shadow-md ml-4 rounded-full">
      <span className="flex items-center">
      <AiFillEdit className="text-black bg-white ml-1 rounded text-xl " />      </span>
    </button>
  </div>
</div>
</div>

<div className="mt-10 mb-10 flex lg:flex-col justify-between lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
  <div className="flex gap-4 -mt-10 ml-4">
  <Button className="  font-bold  text-red-900 bg-blue-gray-100 rounded-full">Connect</Button>
    <Button className="bg-blue-gray-100 text-red-900 Lato rounded-full">Message</Button>
    <div className="flex justify-end">
        <BiBell
          className="text-2xl text-gray-600 cursor-pointer"
          onClick={handleNotificationClick}
        />
        {unreadNotifications > 0 && (
          <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
            {unreadNotifications}
          </span>
        )}
      </div>
      {/* Render the notification message conditionally */}
{showNotificationMessage && (
  <div className="bg-white p-4 shadow-md mt-4">
    {notificationMessage.map((message, index) => (
      <div key={index}>{message}</div>
    ))}
  </div>
)}

  </div>
</div>



                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                  </div>
             

              </div>
            </div>
            
            <div className="container mx-auto p-4  -my-14">

    <div className="flex">
            <div className="w-1/3  bg-red-900 p-8 shadow-md mr-20 rounded-2xl">
            <div className="-mt-4  -ml-4 container space-y-2 ">
                <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px  h-4  text-white w-4  " />
                <Typography className="font-medium text-white">
                {profile.address}
                </Typography>
              </div>
              <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-white" />
                <Typography className="font-medium text-white">
                {profile.role_jobseeker}
                </Typography>
              </div>
              <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2 mb-4">
                <AiTwotonePhone className="-mt-px h-4 w-4 text-white" />
                <Typography className="font-medium text-white ">
                +{formatPhoneNumber(profile.phone)}
                </Typography>
              </div>
                <hr className="my-2" />
                <div className="flex items-center gap-2">
    <BiSolidCake className="mr-2 text-white" />
    <p className="text-white font-medium">{formatBirthdate(profile.birthdate)}</p>
  </div>
 
  <hr className="my-2" />
              <div className="mb-12"></div>
              <div className="flex items-center gap-2">
  <i className="fab fa-github text-gray-500 "></i>
          
  <input
  type="text"
  placeholder="Add your git URL...."
  defaultValue={profile.git_url} // Set the default value to profile.git
  className="font-medium text-gray-600"
  onChange={(e) => setGitUrl(e.target.value)} // Update gitUrl state when input changes
/>

<button
  className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-full"
  onClick={handleUpdateGitUrl}
>
<AiFillEdit />
</button>
        </div>

            </div>
            </div>
                   

            <div className="container mx-auto w-2/3 bg-red-900   shadow-md rounded-2xl">
            <div className="flex items-center mt-4">
  <h1 className="text-2xl font-bold mr-4 text-white">About me</h1>
  <Divider sx={{ height: 8, backgroundColor: '#FFFAF0', flexGrow: 1, borderRadius: '8px' }} className="mr-12" />
</div>
            <div className="mb-10 mt-10 mx-12 ">
            <div className="relative">
  {/* Render input only when isEditVisible is true */}
  {isEditVisible ? (
    <input
      placeholder="Add a description to your bio......"
      type="text"
      className={`w-full h-28 px-3 border rounded-md focus:outline-none focus:border-indigo-500 text-lg placeholder-red-900  placeholder-opacity-100 ${
        !isEditVisible ? 'bg-red-900 ' : '' // Conditionally apply bg-gray-300 when isEditVisible is false
      }`}
      style={{ textAlign: 'left' }}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      value={description}
      onChange={handleDescriptionChange}
    />
  ) : (
    // Render the description as text when isEditVisible is false
    <p className="w-full h-28 px-1 -mt-4 border-red-900 rounded-md focus:outline-none text-white focus:border-indigo-500 text-lg placeholder-red-900  placeholder-opacity-100 bg-red-900 ">
      {description}
    </p>
  )}

  {/* Render the edit button */}
  <button
    className="absolute right-0 top-0 px-2 py-1 bg-white text-gray-600 hover:bg-gray-300 focus:bg-gray-300 rounded-md"
    onClick={handleEditButtonClick}
  >
    <AiFillEdit />
  </button>

  {/* Render the submit button only when isEditVisible is true */}
  {isEditVisible && (
    <button
      className="absolute top-10 right-3 px-2 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:bg-gray-300 rounded-full"
      onClick={() => {
        updateDescription().then(() => {
          handleUpdateDescription();
        });
      }}
    >
      <AiOutlineArrowRight className="text-red-900" />
    </button>
  )}
</div>
</div>
</div>
</div>  
<div>
  <div className="container  w-1/3 bg-red-900   shadow-md rounded-2xl">
            <div className="flex items-center mt-8 mb-2">
  <h1 className="text-2xl font-bold mt-1 mx-4 text-white">Technologies</h1>
  <Divider sx={{ height: 8, backgroundColor: '#FFFAF0', flexGrow: 1, borderRadius: '8px' }} className="mr-12" />
  </div>
<select
          value={selectedTechnology}
          onChange={handleSelectChange}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-200 text-gray-900 appearance-none"
        >
          <option value="" disabled>Select technology</option>
          {Object.keys(technologyEmojiMap).map((tech) => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
  
        <div className="flex flex-wrap">
        {profile.technologies.map((tech, index) => (
              <button
      key={index}
      className="mt-2 mr-2 bg-gray-900 text-white font-bold rounded-full px-4 flex items-center mb-2"
      style={{ backgroundColor: getRandomColor() }} // Assign a random color
    >
      {technologyEmojiMap[tech]} {tech}
    </button>
  ))}
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
      

        ) : (
          <p>Loading...</p>
        )}

 {/* Modal component */}
 <PictureModal
          isOpen={showPictureModal}
          onClose={() => closePictureModal()}
          onConfirm={() => {
            handleUpload();
            closePictureModal();
          }}
        />
        
    {/*  <Alert severity="success">This is a success Alert.</Alert> */}


      <div className="bg-white">
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
     <div>




      </div>

      </div>

    </>
  );
}

export default Profile;