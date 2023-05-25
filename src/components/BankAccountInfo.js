import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../BankAccountInfo.css';
import { useNavigate } from 'react-router-dom';

function BankAccountInfo() {
  const [bankType, setBankType] = useState(''); // Tipo de banco seleccionado
  const [accountInfo, setAccountInfo] = useState(null); // Información de la cuenta obtenida de la API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        let endpoint = '';

        if (bankType === 'EastBank') {
          endpoint = 'http://127.0.0.1:4000/accounts/';
        } else if (bankType === 'WesternBank') {
          endpoint = 'http://127.0.0.1:2000/accounts/';
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Token ${localStorage.getItem(
              `${bankType.toLowerCase()}Token`
            )}`,
          },
        });
        console.log(`${bankType.toLowerCase()}Token`);
        setAccountInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (bankType) {
      fetchAccountInfo();
    }
  }, [bankType]);

  async function bankLogout() {
    try {
      let logoutEndpoint = '';

      if (bankType === 'EastBank') {
        logoutEndpoint = 'http://127.0.0.1:4000/api/authentication/logout/';
        localStorage.removeItem('eastbankToken');
      } else if (bankType === 'WesternBank') {
        logoutEndpoint = 'http://127.0.0.1:2000/api/authentication/logout/';
        localStorage.removeItem('westernbankToken');
      }

      await axios.post(logoutEndpoint, null, {
        headers: {
          Authorization: `Token ${localStorage.getItem(
            `${bankType.toLowerCase()}Token`
          )}`,
        },
      });

      navigate("/bank_login");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="account-information">
      <h2>Bank Account Information</h2>
      <label>
        Bank Type:
        <select value={bankType} onChange={(event) => setBankType(event.target.value)}>
          <option value="">Select Bank Type</option>
          <option value="EastBank">East Bank</option>
          <option value="WesternBank">Western Bank</option>
        </select>
      </label>
      {accountInfo && (
        <div className="account-info">
          <p>Owner: {accountInfo[0].owner}</p>
          <hr />
          <p>Identification ID: {accountInfo[0].identification_id}</p>
          <hr />
          <p>Opening Date: {accountInfo[0].opening_date}</p>
          <hr />
          <p>Cards:</p>
          {accountInfo[0].cards.map((card) => (
            <ul key={card.card_number}>
              <li>Card Number: {card.card_number}</li>
              <li>Card Balance: {card.balance}</li>
              <li>Card Brand: {card.card_brand}</li>
              <li>Card Type: {card.card_type}</li>
              <li>Interest Rate: {card.interest_rate}</li>
              <hr />
            </ul>
          ))}
          <p>Currency: {accountInfo[0].currency}</p>
          <hr />
          <p>Status: {accountInfo[0].status}</p>
          <hr />
          <button onClick={bankLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default BankAccountInfo;
