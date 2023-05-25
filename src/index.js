import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Transaction from './components/Transaction';
import TransactionHistory from './components/TransactionHistory';
import Logout from './components/Logout';
import BankAccountInfo from './components/BankAccountInfo';
import BankLogin from './components/BankLogin';
import APIStatusChecker from './components/APIStatusChecker';

function hasToken() {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}
function hasTokenEBank() {
  const etoken = localStorage.getItem('eastbankToken');
  const wtoken = localStorage.getItem('westernbankToken');
  return (etoken !== null && etoken !== undefined) || (wtoken !== null && wtoken !== undefined);
}

const App = () => {
  const isAuthenticated = hasToken(); // Verifica si el usuario está autenticado
  const isBankAuthenticated = hasTokenEBank(); // Verifica si el usuario está autenticado en el EastBank
  return (
    <BrowserRouter>
          
      <Routes>

        <Route path="/" element={<Layout />}>
        <Route path="/api_status_checker" element={<APIStatusChecker />}/>

          {/* <Route index element={<Login />} /> */}
          {isAuthenticated ? (
            <>
            <Route path="logout" element={<Logout />} />
            <Route path="transaction_history" element={<TransactionHistory />} />
            <Route path="profile" element={<Profile />} />

            {isBankAuthenticated && isAuthenticated? (
              <>
              <Route path="bank_account_info" element={<BankAccountInfo />} />
              <Route path="payment_form" element={<Transaction />} />
              <Route path="bank_login" element={<BankLogin />} />
              </>

            ):(
              <>
              <Route path="bank_login" element={<BankLogin />} />

              </>
            )}
              

            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
            // <Link to="/login" />

          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
