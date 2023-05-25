import React, { useState } from 'react';
import axios from 'axios';
import '../LoginRegister.css';
import { useNavigate } from 'react-router-dom';



console.log("Reister Page");
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/registration/', {
        username: username,
        email:email,
        password: password,
        password2:password2,
      });
      console.log(response);
      console.log(response.data.key);
      localStorage.setItem('token', response.data.key);
    } catch (error) {
      console.log(Register);
    }
    window.location.reload() 
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister} className='login-register-form'>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="User name"
      />
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Conform password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register;
