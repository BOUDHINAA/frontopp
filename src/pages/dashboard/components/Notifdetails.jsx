import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar'; // Import Sidebar component
import { FaArchive, FaUndo, FaTimes } from 'react-icons/fa';

import { AiFillBell, AiOutlineExclamationCircle } from 'react-icons/ai'; // Importing AiFillBell and other icons
import { formatDistanceToNow } from 'date-fns'; // For formatting the time
import { useParams  } from 'react-router-dom';



import {
     Link, useNavigate } from 'react-router-dom';
const Notifdetails = () => {
    const [notifications, setNotifications] = useState([]);
    const { id } = useParams();
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const [showArchived, setShowArchived] = useState(false);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        let storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];

        // If local storage is empty, fetch from server
        if (storedNotifications.length === 0) {
          const response = await axios.get('http://localhost:3000/user/admin', config);
          storedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          localStorage.setItem('notifications', JSON.stringify(storedNotifications));
        }

        setNotifications(storedNotifications);

        // Calculate unread count
        const newUnreadCount = storedNotifications.filter((notification) => !notification.read).length;
        setUnreadCount(newUnreadCount);

      } catch (error) {
        console.error('Error fetching notifications:', error);

        if (error.message === 'Access token not found') {
          navigate('/sign-in');
        }
      }
    };

    fetchNotifications(); // Fetch on mounting
  }, []); // Dependency array with empty brackets to run only on mount
  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]); // Dependency on 'notifications' to re-run when it changes

  const toggleArchive = (notificationId) => {
    const updatedNotifications = notifications.map((notif) =>
      notif._id === notificationId ? { ...notif, isArchived: !notif.isArchived } : notif
    );
    setNotifications(updatedNotifications);

    // Store in LocalStorage
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };
 
  const activeNotifications = notifications.filter((notif) => !notif.isArchived);


  const getNotificationIcon = (notificationType) => {
    switch (notificationType) {
      case 'alert':
        return <AiOutlineExclamationCircle className="text-yellow-500 text-3xl" />;
      case 'success':
        return <FaCheckCircle className="text-green-500 text-3xl" />;
      case 'error':
        return <FaTimesCircle className="text-red-500 text-3xl" />;
      default:
        return <AiFillBell className="text-gray-500 text-3xl" />;
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '55%',
          transform: 'translateX(-50%)',
          width: '50%',
          zIndex: '999',
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong
          className="font-bold text-red-700 ml-80 text-4xl"
          style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}
        >
          Notifications
        </strong>
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No new notifications</p>
        ) : (
          <ul className="space-y-4 mt-8">
            {activeNotifications.map((notification) => (
              <li key={notification._id} className="flex items-center p-4 bg-gray-100 rounded-md shadow-sm">
                {getNotificationIcon(notification.type)}
                <div className="flex flex-col">
                  <span className="font-bold">{notification.message}</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <button
                  onClick={() => toggleArchive(notification._id)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  <FaArchive />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

     

    </div>
  );
};

export default Notifdetails;