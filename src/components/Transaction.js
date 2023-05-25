import React, { useState } from 'react';
import axios from 'axios';
import '../Transaction.css';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const [bank, setBank] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [card_number, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiration_date, setExpirationDate] = useState('');
  const [sede, setSede] = useState('');
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [cuotas, setCuotas] = useState(0);
  const navigate = useNavigate();

  const handleBank = (event) => {
    setBank(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleSedeChange = (event) => {
    setSede(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const handleCuotasChange = (event) => {
    setCuotas(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidCard = validateCardNumber(card_number);

    if (!isValidCard) {
      alert("El número de tarjeta no es válido o no es Visa, MasterCard o American Express");
      return;
    }

    const transactionData = {
      card_number,
      cvv,
      expiration_date,
      sede,
      description,
      cuotas,
      total,
    };

    if (bank === "EastBank") {
      axios.post('http://127.0.0.1:4000/transactions/', transactionData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('eastbankToken')}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          alert("Envío exitoso");
          axios.post('http://127.0.0.1:8000/api/payments/', {
            ...transactionData,
            error: false,
            bank: bank,
          }, {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })
          navigate('/transaction_history');
        })
        .catch((error) => {
          alert("Envío fallido");
          axios.post('http://127.0.0.1:8000/api/payments/', {
            ...transactionData,
            error: true,
            bank: bank,
          }, {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })
        });
    } else if (bank === "WesternBank") {
      axios.post('http://127.0.0.1:2000/transactions/', transactionData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('westernbankToken')}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          alert("Envío exitoso");
          axios.post('http://127.0.0.1:8000/api/payments/', {
            ...transactionData,
            error: false,
            bank: bank,
          }, {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })
          navigate('/transaction_history');
        })
        .catch((error) => {
          alert("Envío fallido");
          axios.post('http://127.0.0.1:8000/api/payments/', {
            ...transactionData,
            error: true,
            bank: bank,
          }, {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })
        });
    }
  };

  const validateCardNumber = (cardNumber) => {
    if (!/^\d+$/.test(cardNumber)) {
      return false;
    }

    let cardType;
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      cardType = 'Visa';
    } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      cardType = 'MasterCard';
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      cardType = 'AmericanExpress';
    } else {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0 && cardType;
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Banco:
          <select className="payment-form-select" value={bank} onChange={handleBank}>
            <option value="">Seleccionar banco:</option>
            <option value="EastBank">East Bank</option>
            <option value="WesternBank">Western Bank</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Medio de Pago:
          <select className="payment-form-select" value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">Seleccionar medio de pago</option>
            <option value="credito">Tarjeta de Crédito</option>
            <option value="debito">Tarjeta de Débito</option>
          </select>
        </label>
      </div>
      {paymentMethod === 'credito' && (
        <div>
          <label>
            Card Number:
            <input className="payment-form-input" type="text" value={card_number} onChange={handleCardNumberChange} />
          </label>
          <label>
            Cvv:
            <input className="payment-form-input" type="text" value={cvv} onChange={handleCvvChange} />
          </label>
          <label>
            Expiration Date:
            <input className="payment-form-input" type="text" value={expiration_date} onChange={handleExpirationDateChange} />
          </label>
          <select className="payment-form-select" value={sede} onChange={handleSedeChange}>
            <option value="">Sede</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Sincelejo">Sincelejo</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Monteria">Montería</option>
          </select>
          <label>
            Description:
            <input className="payment-form-input" type="text" value={description} onChange={handleDescriptionChange} />
          </label>
          <label>
            Total:
            <input className="payment-form-input" type="text" value={total} onChange={handleTotalChange} />
          </label>
          <label>
            Cuotas:
            <input className="payment-form-input" type="text" value={cuotas} onChange={handleCuotasChange} />
          </label>
        </div>
      )}
      {paymentMethod === 'debito' && (
        <div>
          <label>
            Card Number:
            <input className="payment-form-input" type="text" value={card_number} onChange={handleCardNumberChange} />
          </label>
          <label>
            Cvv:
            <input className="payment-form-input" type="text" value={cvv} onChange={handleCvvChange} />
          </label>
          <label>
            Expiration Date:
            <input className="payment-form-input" type="text" value={expiration_date} onChange={handleExpirationDateChange} />
          </label>
          <select className="payment-form-select" value={sede} onChange={handleSedeChange}>
            <option value="">Sede</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Sincelejo">Sincelejo</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Monteria">Montería</option>
          </select>
          <label>
            Description:
            <input className="payment-form-input" type="text" value={description} onChange={handleDescriptionChange} />
          </label>
          <label>
            Total:
            <input className="payment-form-input" type="text" value={total} onChange={handleTotalChange} />
          </label>
        </div>
      )}
      <button className="payment-form-button" type="submit">Realizar transacción</button>
    </form>
  );
};

export default Transaction;
