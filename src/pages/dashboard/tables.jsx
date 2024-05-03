import React from "react";
import { Card, CardHeader, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Sidebar from './partials/Sidebar'; // Import Sidebar component
import { useParams  } from 'react-router-dom';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { ToastContainer, toast } from "react-toastify";
import { EyeIcon } from '@heroicons/react/24/solid'; // Import EyeIcon
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // Import the PlusCircleIcon
import { UserIcon } from '@heroicons/react/24/solid'; // Ou choisissez l'icône appropriée dans @heroicons/react

import {  FaEye, FaUserLock } from 'react-icons/fa';

import {
 
 
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";


export function Tables() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isBlocked, setIsBlocked] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Déplacer cette ligne ici
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const totalUsers = users.length;
  const activeUsers = users.filter(user => !user.isBlocked).length;
  const blockedUsers = users.filter(user => user.isBlocked).length;
  const userStatisticsData = [
    { title: 'Total Users', value: totalUsers },
    { title: 'Active Users', value: activeUsers },
    { title: 'Blocked Users', value: blockedUsers }
  ];
  
  const [dislikedApplications, setDislikedApplications] = useState([]);
  const [likedApplications, setLikedApplications] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check if the access token exists in localStorage
        const accessToken = localStorage.getItem("accessToken");
  
        // If the access token does not exist, throw an error
        if (!accessToken) {
          throw new Error("Access token not found");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        // Fetch the list of users with the access token included in the headers
        const response = await axios.get("http://localhost:3000/user", config);
        setUsers(response.data);
      } catch (error) {
        // Handle error appropriately (e.g., display error message to user)
        console.error("Error fetching users:", error);
      }
    };
    // Call the fetchUsers function
    fetchUsers();
  }, [id]);


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortUsers = (sortBy) => {
    const sortedUsers = [...filteredUsers];
    sortedUsers.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'role') {
        return a.role.localeCompare(b.role);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      }
    });
    setUsers(sortedUsers);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
 // Add user.email as a parameter to handleLike function
 const deleteUser = async (userId) => {
  try {
    // Vérifier d'abord si le jeton d'accès existe
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios.delete(`/user/delete/${userId}`, config); // Utiliser le modèle d'URL correct
    // Filtrer l'utilisateur supprimé du tableau des utilisateurs
    setUsers(users.filter(user => user._id !== userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
const handleCreateUser = () => {
  // Navigate to the '/create' page upon clicking the "Add User" button
  navigate('/create');
};

const viewUser = (user) => {
  navigate(`/user/${user._id}`);
};

  // Au chargement du composant, restaurer les applications "likées" depuis le stockage local
  useEffect(() => {
    const likedAppsFromStorage = localStorage.getItem('likedApplications');
    if (likedAppsFromStorage) {
      setLikedApplications(JSON.parse(likedAppsFromStorage));
    }
  }, []);

  // Lorsque les applications "likées" changent, mettre à jour le stockage local
  useEffect(() => {
    localStorage.setItem('likedApplications', JSON.stringify(likedApplications));
  }, [likedApplications]);
  const handleCopyText = (text, event) => {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    navigator.clipboard.writeText(text);
    setCopiedText(text);
  };
   
  const handleAcceptUser = async (email) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(`/user/accept/${email}`, {}, config);
      setAcceptedUsers([...acceptedUsers, email]);
      toast.success('User Accepted successfully');
      // Update local storage to store accepted users
    const acceptedUsersFromStorage = localStorage.getItem('acceptedUsers');
    const updatedAcceptedUsers = acceptedUsersFromStorage ? JSON.parse(acceptedUsersFromStorage) : [];
    updatedAcceptedUsers.push(email);
    localStorage.setItem('acceptedUsers', JSON.stringify(updatedAcceptedUsers));

    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  const handleRejectUser = async (email) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(`/user/reject/${email}`, {}, config);
      setRejectedUsers([...rejectedUsers, email]);
      toast.error('User rejected successfully');
      const rejectedUsersFromStorage = localStorage.getItem('rejectedUsers');
      const updatedRejectedUsers = rejectedUsersFromStorage ? JSON.parse(rejectedUsersFromStorage) : [];
      updatedRejectedUsers.push(email);
      localStorage.setItem('rejectedUsers', JSON.stringify(updatedRejectedUsers));
  
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };
  // Inside useEffect hook to restore accepted and rejected users from localStorage
useEffect(() => {
  const acceptedUsersFromStorage = localStorage.getItem('acceptedUsers');
  const rejectedUsersFromStorage = localStorage.getItem('rejectedUsers');
  if (acceptedUsersFromStorage) {
    setAcceptedUsers(JSON.parse(acceptedUsersFromStorage));
  }
  if (rejectedUsersFromStorage) {
    setRejectedUsers(JSON.parse(rejectedUsersFromStorage));
  }
}, []);
// Accepter un utilisateur
const handleAcceptUser1 = async (email) => {
  try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
          throw new Error("Access token not found");
      }

      const config = {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };

      // Route pour mettre à jour `isApproved`
      await axios.put(`/user/approve/${email}`, {}, config);
      
      // Ajouter à la liste des utilisateurs acceptés
      setAcceptedUsers([...acceptedUsers, email]);
      toast.success('User accepted successfully');

      // Mettre à jour le stockage local
      localStorage.setItem('acceptedUsers', JSON.stringify([...acceptedUsers, email]));

  } catch (error) {
      console.error("Error accepting user:", error);
  }
};

// Rejeter un utilisateur
const handleRejectUser1 = async (email) => {
  try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
          throw new Error("Access token not found");
      }

      const config = {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };

      // Route pour supprimer l'utilisateur
      await axios.delete(`/user/${email}`, config);
      
      // Mettre à jour la liste des utilisateurs rejetés
      setRejectedUsers([...rejectedUsers, email]);
      toast.error('User rejected successfully');

      // Mettre à jour le stockage local
      localStorage.setItem('rejectedUsers', JSON.stringify([...rejectedUsers, email]));

  } catch (error) {
      console.error("Error rejecting user:", error);
  }
};

  
  return (<>
 <div style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, height: '100vh', width: '250px' }}>

<Sidebar /> {/* Include Sidebar component */}
</div>    <div style={{  bottom: '',position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: '999' }}>

        <CardHeader variant="gradient"  className="mb-8 mt-5  bg-red-700 p-6 ml-80">
        <ToastContainer position="top-center" autoClose={5000} />

        <header className="px-5 py-4 dark:border-slate-700 ">
        <h2 className="font-semibold  text-white text-slate-800 white:text-slate-100">Opportunify USERS</h2>
      </header>
        </CardHeader>
        <button
  onClick={handleCreateUser}
  className="bg-gray-600 text-white px-4 w-40 h-9 py-2 ml-80 flex items-center rounded-lg text-base font-medium"
>
  <PlusCircleIcon className="w-5 h-5 mr-2" />
  Add User
</button>

        <div className="px-0 pt-0 pb-2 overflow-x-auto ml-80">
        <tbody>
        <div className="flex  mb-4 ml-80 mr-80">
            <input
              type="text"
              placeholder="Search by name"
              className="border-2 border-gray-700 p-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <select
              className="border-2 border-gray-700 p-2 rounded-md ml-20"
              value={sortBy}
              onChange={(e) => sortUsers(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
        <div className="px-0 pt-0 pb-2  ml-40 mr-20 ">
        {filteredUsers.length > usersPerPage && (
  <div className="flex justify-center">
    {Array(Math.ceil(filteredUsers.length / usersPerPage))
      .fill()
      .map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)} className={` ${currentPage === index + 1 ? 'bg-gray-300 text-white' : 'bg-white text-gray-700 border border-gray-500 hover:bg-gray-500'} px-3 py-1 rounded-md mt-10`}>
          {index + 1}
        </button>
      ))}
  </div>
)}
          
      <div className="grid grid-cols-3 gap-4">

{currentUsers.map((user) => (
  <Card key={user.id} color="gray-300" className="p-4">
      <div className="text-center">
        <p className="font-semibold text-black">{user.name}</p>
        <p className="text-sm text-black">{user.role}</p>
        <p className="text-sm text-black">{user.email}</p>

       
        <div>
                    {!acceptedUsers.includes(user.email) && !rejectedUsers.includes(user.email) && (
                      <div>
                        <button
                          className="bg-red-700 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-md shadow-md mr-2"
                          onClick={() => handleAcceptUser(user.email)}
                        >
                          Accept User
                        </button>
                        <button
                          className="bg-black hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
                          onClick={() => handleRejectUser(user.email)}
                        >
                          Reject User
                        </button>
                      </div>
                    )}
                    {acceptedUsers.includes(user.email) && (
                      <p className="text-green-500 font-bold">User Accepted</p>
                    )}
                    {rejectedUsers.includes(user.email) && (
                      <p className="text-red-500 font-bold">User Rejected</p>
                    )}
                     <button onClick={() => viewUser(user)}>
        <EyeIcon className="w-5 h-5  mr-10 text-gray-700" /> {/* Utilisez EyeIcon ici */}
      </button>
        <button onClick={() => deleteUser(user._id)}>
          <TrashIcon className="w-8 h-6 text-red-600" />
        </button>
        {user.isBlocked ? (
    <FaUserLock className="w-7 h-7 text-red-500" />
  ) : (
    <UserIcon className="w-7 h-7 text-black" />
  )}
   
     
                  </div>
      </div>
     
  </Card>
))}

           <div className="ml-80 mr-200 mb-20" style={{ position: 'absolute', bottom: '5px', top:"700px", left: '1200px' }}>
  <img
  className=""
    src="img/logoesprit.png"
    alt="logo"
    style={{ width: 'auto', height: '50px' }}
  />
</div>
                      </div>
                      </div>

</tbody>

        </div>

        
      </div>
      </>  );
}

export default Tables;