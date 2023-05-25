import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Profile.css';

const ProfileInfo = () => {
    const [profile, setProfile] = useState([]);

    // Obtener los datos del historial de transacciones desde el servidor (API) utilizando Axios
    useEffect(() => {
        axios.get('http://localhost:8000/api/authentication/user/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                // 3. Acceder a la información del usuario desde la respuesta de la API
                setProfile(response.data);
                
                console.log(response.data);
                // Realizar acciones con la información del usuario
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error(error);
            });
    }, []);

    // Renderizar la información del usuario
    return (
<div className="user-profile">
      <div className="profile-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="Profile Icon" />
      </div>
      <div className="user-info">
        <h2>User Profile</h2>
        <p>
          <strong>ID:</strong> {profile.pk}
        </p>
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
    );
};

export default ProfileInfo;
