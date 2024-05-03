import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Sidebar from './partials/Sidebar'; // Import Sidebar component

function CreateUserPage() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const [userCaptcha, setUserCaptcha] = useState(""); // Captcha input by user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const handleSendMessage = async () => {
    if (!input) return;

    // Ajouter le message de l'utilisateur
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      // Envoyer le message au backend
      const response = await axios.post("http://localhost:3000/user/chatbot", {
        message: input,
      });

      // Ajouter la réponse du chatbot
      setMessages([
        ...messages,
        { sender: "user", text: input },
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message au backend", error);
    }

    setInput("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing again
    }));
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const [captcha, setCaptcha] = useState(generateRandomString(6));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the access token does not exist, handle the error
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    // Check if the form is valid, including captcha validation
    if (!formIsValid()) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post("/user/registeruser", formData, config);
      console.log("User created:", response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const formIsValid = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;?/>.<, ]).{8,}/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (userCaptcha.trim() !== captcha) {
      errors.captcha = "Invalid captcha";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Si aucune erreur, retourne true
  };

  const regenerateCaptcha = () => {
    setCaptcha(generateRandomString(6));
  };return (
    <>
 <div style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, height: '100vh', width: '250px' }}>

<Sidebar /> {/* Include Sidebar component */}
</div>      <div style={{  bottom: '',position: 'fixed', top: '2px', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: '999' }}>
      <h1 className="text-4xl text-center text-red-700 mt-10 mb-10">
        Create User 
      </h1>
      <div className="card mx-auto max-w-md bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} noValidate className="p-8">
            <div className="mb-8">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full max-w-xl px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500`}
                placeholder="Nom"
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
  
            <div className="mb-8">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full max-w-lg px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500`}
                placeholder="Email"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-8">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full max-w-lg px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500`}
                placeholder="Mot de passe"
                required
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="mb-8 flex justify-center">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full max-w-lg px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500"
                required
              >
                                <option value="user">user</option>

                <option value="company">company</option>
                <option value="job_seeker">job_seeker</option>
              </select>
            </div>
            <div className="mb-8">
             
            </div>
            <button
              type="submit"
              className="btn-primary bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-black transition duration-300 ease-in-out w-full max-w-lg"
            >
Add             </button>
<div className="mb-8">
            <div>
              <label className="btn-primary rounded-lg " htmlFor="captcha">{captcha}</label>
            </div>
            <div>
              <input
                type="text"
                id="userCaptcha"
                name="userCaptcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className={`w-full max-w-lg px-4 py-3 rounded-lg border focus:outline-none focus:border-blue-500`}
              />
              {errors.captcha && <p className="text-red-500">{errors.captcha}</p>}
            </div>
            <div>
              <button type="button" className="bg-gray-300 btn-primary rounded-lg" onClick={regenerateCaptcha}>
                Régénérer
              </button>
            </div>
          </div>
          

            </form>
           
      </div>
    </div>
  </>
);}

export default CreateUserPage;