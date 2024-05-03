import axios from 'axios';

// Fonction pour rechercher une entreprise par nom
const searchCompany = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3000/search/company/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error searching company:', error);
    throw error;
  }
};

// Fonction pour supprimer un utilisateur par ID
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Fonction pour récupérer les utilisateurs de type "company"
const fetchUserCompany = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/company');
    return response.data;
  } catch (error) {
    console.error('Error fetching user company:', error);
    throw error;
  }
};

// Fonction pour créer un nouvel utilisateur de type "company"
const createUserCompany = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/registercompany', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user company:', error);
    throw error;
  }
};
