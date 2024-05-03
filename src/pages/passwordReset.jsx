import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Navbar0 } from "@/widgets/layout";
import { Footer } from '@/widgets/layout';

export function ResetPassword() {
    const [data, setData] = useState({
        resetToken: "",  // Added resetToken field
        password1: "",
        password2: ""
    });
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/reset-password', {
                resetToken: data.resetToken,  // Use the reset token from the form
                newPassword: data.password1,
            });

            console.log(response.data);  // Handle the response as needed, e.g., show success message
            navigate("/login");

        } catch (error) {
            console.error('Error:', error.response.data);
            // Handle the error, e.g., show an error message to the user
        }
    };

    return (
        <>
        <Navbar0/>
            <section className="flex justify-center items-center h-screen bg-white">
                <div className="w-full lg:w-2/5">
                    <div className="flex justify-center items-center mb-8">
                        {/* ... (your SVG code) */}
                    </div>
                    <div className="text-center opacity-90">
                        <Typography variant="h3" className="font-bold text-black decoration-4 mb-4">Reset Password</Typography>
                        <Typography variant="paragraph" className="text-lg text-red-800 font-normal">Reset your password!</Typography>
                    </div>
                    <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-white shadow-2xl shadow-black shadow-outer opacity-80 overflow-visible">
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div className="flex flex-col gap-6 bg-white">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="-mb-3 font-medium"
                                >
                                    Code de reinitialisation
                                </Typography>
                                <Input
                                    size="lg"
                                    type="text"
                                    placeholder="Code de reinitialisation"
                                    value={data.resetToken}
                                    onChange={(e) =>
                                        setData({ ...data, resetToken: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-6 bg-white ">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="-mb-3 font-medium"
                                >
                                    New Password
                                </Typography>
                                <Input
                                    size="lg"
                                    type="password"
                                    placeholder="************"
                                    value={data.password1}
                                    onChange={(e) =>
                                        setData({ ...data, password1: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="-mb-3 font-medium"
                                >
                                    Confirm Password
                                </Typography>
                                <Input
                                    size="lg"
                                    type="password"
                                    placeholder="************"
                                    value={data.password2}
                                    onChange={(e) =>
                                        setData({ ...data, password2: e.target.value })
                                    }
                                />
                            </div>

                            <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                                Confirm
                            </Button>
                        </form>
                    </Card>
                </div>
            </section>
            <Footer/>

        </>
    );
}

export default ResetPassword;
