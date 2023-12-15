import React, { useState } from 'react';
import './FoodDoneRight.css'; // Import your CSS file

const FoodDoneRight = () => {
  const [address, setAddress] = useState('');
  const [outletInfo, setOutletInfo] = useState(null);
  const [error, setError] = useState(null);

  const getOutletInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get-outlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data) {
        console.log('Outlet Info:', data);
        setOutletInfo(data);
        setError(null);
      } else {
        setOutletInfo(null);
        setError('Outlet not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutletInfo(null);
      setError('No restaurant found at your entered location. Try a new location');
    }
  };

  return (
    <div className="food-done-right-container">
      <h1>Food Done Right Outlet Information</h1>
      <label htmlFor="addressInput">Enter Address:</label>
      <input
        type="text"
        id="addressInput"
        placeholder="E.g., Stumpergasse 51, 1060 Vienna"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={getOutletInfo}>Get Outlet Info</button>

      <div className="result-container">
        {error && <p className="error-message">{error}</p>}
        {outletInfo && (
          <div>
            <p className="outlet-name">Outlet Name: {outletInfo.outletName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDoneRight;



