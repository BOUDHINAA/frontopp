


import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../components/utils/Transition';
import axios from "axios";
import { formatDistanceToNow } from 'date-fns'; // For formatting the time

import Notifdetails from './Notifdetails';
import {
  Input,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
function DropdownNotifications({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });  
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
  
        const response = await axios.get('http://localhost:3000/user/admin', config);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedNotifications);
  
        const newUnreadCount = sortedNotifications.filter(notification => !notification.read).length;
        setUnreadCount(newUnreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications(); // Fetch the latest data after refresh
  }, []);
  
  

const markAllNotificationsAsReadOnServer = async () => {
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

    await axios.put('http://localhost:3000/user/mark-all-read', {}, config); // Marks all as read on the server
  } catch (error) {
    console.error('Error marking notifications as read:', error);
  }
};


const markAllAsRead = () => {
  const updatedNotifications = notifications.map(notification => ({
    ...notification,
    read: true,
  }));
  setNotifications(updatedNotifications); // Update local state
  setUnreadCount(0); // Reset unread count
};const handleDropdownToggle = async () => {
  const newDropdownOpen = !dropdownOpen;
  setDropdownOpen(newDropdownOpen);

  if (newDropdownOpen) {
    await markAllNotificationsAsReadOnServer(); // Update server-side
    markAllAsRead(); // Update client-side state
  }
};
const navigateToAllNotifications = () => {
  navigate('/Notifdetails');
};

  return (
    <div className="relative inline-flex">
       <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justifier-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${dropdownOpen && 'bg-slate-200'}`}
        aria-haspopup="true"
        onClick={handleDropdownToggle}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-current text-slate-500 dark:text-slate-400" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
          <path className="fill-current text-slate-400 dark:text-slate-500" d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" />
        </svg>

        {/* Afficher le badge uniquement s'il y a des notifications non lues */}
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-center text-xs rounded-full">
            {unreadCount}
          </div>
        )}
      </button><Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 w-128 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
    
    <strong class="font-bold text-red-700 animate-pulse text-2xl">Notifications</strong>
        <div style={{ maxHeight: '400px', overflowY: 'auto', width:'400px' }}>
          {notifications.length === 0 ? (
            <p className="text-center px-4">Aucune nouvelle notification</p>
          ) : (
            <ul className="px-4">
              {notifications.map((notification, index) => (
                <React.Fragment key={notification._id}>
                  <li>{notification.message}</li>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                  {index < notifications.length - 1 && <hr className="my-2 border-slate-300" />}
                </React.Fragment>
              ))}
             
            </ul>

          )}
        </div>
        <div className="p-4 text-center">
          <button
            className="text-xl text-blue-700"
            onClick={navigateToAllNotifications}
          >
            See All
          </button>
          <label htmlFor="terms" className="flex items-center">


  </label>

        </div>
      </Transition>


    </div>
  )
}

export default DropdownNotifications;