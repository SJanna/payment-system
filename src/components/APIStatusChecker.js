import React, { useState, useEffect } from 'react';

const APIStatusChecker = () => {
  const [apiStatus, setApiStatus] = useState([]);

  useEffect(() => {
    const checkAPIStatus = async () => {
      const apiEndpoints = [
        'http://127.0.0.1:8000',
        'http://127.0.0.1:4000/ok/',
        'http://127.0.0.1:2000/ok/',
      ];

      const statusPromises = apiEndpoints.map((endpoint) =>
        fetch(endpoint)
          .then((response) => ({
            endpoint,
            status: response.ok ? 'Funcionando' : 'No funciona',
          }))
          .catch(() => ({
            endpoint,
            status: 'No funciona',
          }))
      );

      const apiStatuses = await Promise.all(statusPromises);
      setApiStatus(apiStatuses);
    };

    checkAPIStatus();
  }, []);

  return (
    <div>
      <h2>Estado de las API:</h2>
      {apiStatus.map((api) => (
        <div key={api.endpoint}>
          <p>
            <strong>{api.endpoint}</strong>: {api.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default APIStatusChecker;
