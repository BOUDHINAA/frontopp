// Dans votre composant NotificationsPage

// Importez useEffect et useState si ce n'est pas déjà fait
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbarjs } from '@/widgets/layout';
import { Job_offer } from '@/pages';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography, List, Button } from "@material-tailwind/react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [clickedNotificationId, setClickedNotificationId] = useState(null);
  const [readNotifications, setReadNotifications] = useState([]);

  const handleNotificationClick = (notificationId) => {
    setClickedNotificationId(notificationId);
    markNotificationAsRead(notificationId); // Appeler la fonction pour marquer la notification comme lue
  };

  // Fonction pour récupérer les notifications
  const getNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(`http://localhost:3000/notifications/notifications`, config);
      const notificationsData = response.data;
      // Trier les notifications par date la plus récente au début
      notificationsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(notificationsData);
      console.log(notificationsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Appeler la fonction pour récupérer les notifications lors du chargement de la page
    getNotifications();
  }, []);

  const deleteNotification = async (notificationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(`http://localhost:3000/notifications/${notificationId}`, config);
      // Supprimer la notification de la liste locale
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      await axios.put(`http://localhost:3000/notifications/${notificationId}/mark-as-read`, {}, config);
      // Mettre à jour localement l'état de la notification comme lue
      setReadNotifications((prevReadNotifications) => [...prevReadNotifications, notificationId]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbarjs />
      <Card className='mt-12 bg-gray-200 bg-opacity-10 rounded-lg shadow-l mx-20'>
        <CardHeader className='bg-gray-200' contentPosition="none">
          <Typography color="gray-900" variant="h5" className='ml-4'>
            Notifications
          </Typography>
        </CardHeader>
        <CardBody>
        {notifications.length === 0 ? (
          <Typography color="gray-900" className=' text-xl text-center mt-4'>
            No notifications to display
          </Typography>
        ) : (
          <List>
            {notifications.map((notification) => (
              <div key={notification._id}>
                <div id="toast-notification" className={`w-md-screen p-4 text-gray-900 bg-blue-100 bg-opacity-20 rounded-lg mb-3 shadow dark:bg-gray-800 dark:text-gray-300 ${clickedNotificationId === notification._id || readNotifications.includes(notification._id) ? 'bg-white' : ''}`}
                  role="alert"
                  onClick={() => handleNotificationClick(notification._id)} // Ajoutez onClick pour marquer la notification comme lue lorsqu'elle est cliquée
                >
                  <div class="flex items-center mb-3">
                    <span class="mb-1 text-sm font-semibold text-blue-900 dark:text-white">New notification</span>
                    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close" onClick={() => deleteNotification(notification._id)}>
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex items-center">
                    <div class="ml-4 text-sm font-normal ">
                      <div className='flex items-center gap-4'>
                    <img class="w-10 h-10 rounded-full" src={notification.companyimage} alt="company" /> 
                      <div class="text-sm font-semibold text-gray-900 dark:text-white">{notification.companyname}</div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div class=" font-normal">
                          {notification.type === 'accepted' && <p>Your application has been accepted for the job offer : <strong>{notification.joboffertitle}</strong> .</p>}
                          {notification.type === 'rejected' && <p>Your application has been rejected for the job offer : <strong>{notification.joboffertitle}</strong> .</p>}
                          {notification.type === 'newapplication' && <p>You have applied to a new job offer : <strong>{notification.joboffertitle}</strong>. Your application is under review . </p>}
                        </div>
                        <Link to={`/applications`} >
                          <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </Link>
                       
                        <span class="text-xs flex items-center font-medium text-blue-600 dark:text-blue-500 ">
                          <svg className="w-2.5 h-2.5 me-1.5 inline-block align-text-top" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          <p>{moment(notification.createdAt).fromNow()}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </List>
          )}

        </CardBody>

      </Card>
    </>
  );
};

export default NotificationsPage;
