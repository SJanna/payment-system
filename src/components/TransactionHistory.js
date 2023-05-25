import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../TransactionHistory.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
  
    // Obtener los datos del historial de transacciones desde el servidor (API) utilizando Axios
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/payments/',{
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
      },
      })
        .then((response) => {
          setTransactions(response.data); // Actualizar el estado con los datos del historial de transacciones
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error); // Manejar el error según tus necesidades
          // Aquí puedes mostrar un mensaje de error al usuario, redirigirlo a una página de error, etc.
        });
    }, []);
  
    // Renderizar el historial de transacciones
    return (
      <div className="transaction-history">
        <h2>Historial de Transacciones</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Bank</th>
              <th>Card Number</th>
              <th>Sede</th>
              <th>Description</th>
              <th>Date-Time</th>
              <th>Cuotas</th>
              <th>Total</th>
              {/* <th>Error</th> */}
            </tr>
          </thead>
          <tbody>

            {transactions.map((transaction) => (
              <tr key={transaction.id} className={transaction.error ? 'rojo' : 'verde'}>
                <td>{transaction.id}</td>
                <td>{transaction.bank}</td>
                <td>{transaction.card_number}</td>
                <td>{transaction.sede}</td>
                <td>{transaction.description}</td>
                <td>{transaction.datetime}</td>
                <td>{transaction.cuotas}</td>
                <td>{transaction.total}</td>
                {/* <td>{transaction.error.toString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TransactionHistory;
  