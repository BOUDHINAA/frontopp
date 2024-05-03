
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useParams, Link } from 'react-router-dom';
export function CreateEvent() {
    
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        duration: "",
        location: "",
        intervieweremail: "",
        eventMode: "",
        description: "",
    });
   
    const {id} = useParams();

    useEffect(() => {
        // Retrieve pid from localStorage
        const pid = localStorage.getItem('pId');
        // Update formData with pid
        setFormData(prevFormData => ({
            ...prevFormData,
            profileCid: pid
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/Interview/interview-event/${id}/${formData.profileCid}`, formData);
            console.log("Event created:", response.data);
            // Optionally, you can redirect the user to another page or show a success message
            window.location.href = `/Calendar/${formData.profileCid}`;

            return response.data; // Move the return statement here
        } catch (error) {
            console.error("Error creating event:", error);
            // Handle error
        }
    };
    

    return (
        <>
       <form onSubmit={handleSubmit}>
        <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pb-8">
                <section className="ml-10 mr-10 flex gap-4 items-center">
                    <div className="w-full">
                        <div className="mt-4 bg-red-800 rounded-lg p-3 text-white border border-red-700">
                            Enter the information below to program the interview
                        </div>
                        <div className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-100 bg-opacity-90">
                            <div className="space-y-4">
                                <div className="">
                                <Typography variant="small" color="blue-gray" className="mb-3 font-medium">
                                                        Title
                                </Typography>
                                                    <Input
                                                      
                                                       placeholder="Enter title"
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                        Date Start
                                                    </Typography>
                                                    <Input
                                                        type="date"
                                                        id="date"
                                                        name="date"
                                                        placeholder="Enter the Date of Start"
                                                        value={formData.date}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                        Duration
                                                    </Typography>
                                                    <Input
                                                        type="time"
                                                        id="duration"
                                                        name="duration"
                                                        value={formData.duration}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                        Location
                                                    </Typography>
                                                    <Input
                                                       
                                                        placeholder="Enter location"
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        className="Input-style"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                    Interviewer's email
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="intervieweremail"
                                                        name="intervieweremail"
                                                        placeholder="Enter the name of the intervieweremail"
                                                        value={formData.intervieweremail}
                                                        onChange={handleInputChange}
                                                        required
                                                        
                                                        className="Input-style"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                        Event Mode
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="eventMode"
                                                        name="eventMode"
                                                        value={formData.eventMode}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                        placeholder="Specify if it's online or in-person"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                                        Description
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                        placeholder="Enter your description"
                                                    />
                                                </div>
                                                <button type="submit" className="mt-6 bg-red-800 text-white px-2 py-2 rounded-xl flex justify-center">
                                              
                                                     Schedule the interview 
                                            
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </form>
 
        </>
    );
    
}

export default CreateEvent;
