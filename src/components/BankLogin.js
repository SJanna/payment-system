import React, { useState } from 'react';
import axios from 'axios';
import '../LoginRegister.css';
import { useNavigate } from 'react-router-dom';

function BankLogin() {
    const [selectedBank, setSelectedBank] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Realizar solicitud a la API correspondiente según el banco seleccionado
        if (selectedBank === 'EastBank') {
            try {
                const response = await axios.post('http://127.0.0.1:4000/api/authentication/login/', {
                    username,
                    password,
                });
                setResponse(response.data.message); // Actualiza el estado con la respuesta de la API
                localStorage.setItem('eastbankToken', response.data.key);
                navigate("/bank_account_info");
                window.location.reload() 
            } catch (error) {
                console.error(error);
            }
            
        } else if (selectedBank === 'WesternBank') {
            try {
                const response = await axios.post('http://127.0.0.1:2000/api/authentication/login/', {
                    username,
                    password,
                });
                setResponse(response.data.message); // Actualiza el estado con la respuesta de la API
                localStorage.setItem('westernbankToken', response.data.key);
                navigate("/bank_account_info");
                window.location.reload()
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='login-register-form'>
            <h2>Login</h2>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Bank:
                    <select value={selectedBank} onChange={handleBankChange}>
                    <option value="">-----</option>
                        <option value="EastBank">East Bank</option>
                        <option value="WesternBank">Western Bank</option>
                    </select>
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
}


export default BankLogin;
