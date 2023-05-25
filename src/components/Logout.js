import React, { useState } from 'react';
import axios from 'axios';
import '../LoginRegister.css';


console.log("Logout Page");
const Logout = () => {
    try {
      const response = axios.post('http://127.0.0.1:8000/api/authentication/logout/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
    } catch (error) {
      // Manejar el error de autenticación
    }
  };

export default Logout;