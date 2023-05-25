import React, { useState } from 'react';
import axios from 'axios';
import '../LoginRegister.css';
import { useNavigate } from 'react-router-dom';

console.log("Loggin Page");
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/authentication/login/', {
        username: username,
        email:email,
        password: password,
      });
      console.log(response);
      console.log(response.data.key);
      localStorage.setItem('token', response.data.key);

      navigate("/profile");
      window.location.reload() 

    } catch (error) {
      alert("Error de autenticación")
    }

  };

  return (
    <form onSubmit={handleLogin} className='login-register-form'>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
    <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
