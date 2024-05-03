

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
function CalendarJS() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
 // const modalRef = useRef(null);
  const modalRef = useRef();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  useEffect(() => {
    // Fetch interview events from the backend when the component mounts
    const fetchInterviewEvents = async () => {
      try {
        const response = await axios.get(`/Interview/interview-eventsJS/${userId}`);
      
        const eventsWithDateParsed = response.data.map(event => ({
          ...event,
          date: new Date(event.date)
        }));
        setEvents(eventsWithDateParsed);
        console.log(eventsWithDateParsed);
      } catch (error) {
        console.error("Error fetching interview events:", error);
      }
    };
    

    fetchInterviewEvents();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    modalRef.current.showModal();
  };

  return (
    <>
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        events={events} // Pass the interview events data to the Fullcalendar component
        eventClick={handleEventClick} // Callback to handle event click
      />
  
      {selectedEvent && (
  <dialog className="modal" ref={modalRef}>
    <div className="modal-content">
      <span className="close" onClick={() => modalRef.current.close()}>&times;</span>
      <h2>{selectedEvent.title}</h2>
      <p>Date: {selectedEvent.start.toLocaleString()}</p>
      <p>Duration: {selectedEvent.extendedProps.duration}</p>
      <p>Location: {selectedEvent.extendedProps.location}</p>
      <p>Interviewer Email: {selectedEvent.extendedProps.intervieweremail}</p>
      <p>Event Mode: {selectedEvent.extendedProps.eventMode}</p>
      <p>Description: {selectedEvent.extendedProps.description}</p>
      <button className="bg-red-900 mt-10 text-white px-6 rounded" onClick={() => modalRef.current.close()}>Close</button>

    </div>
  </dialog>
)}
    </div>
    <div>
   
    </div>
    </>
  );

}

export default CalendarJS;