import React, { useState } from 'react';

const DeliveryForm = ({ onProceedToPayment }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !address || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    // Call the function to proceed to payment with delivery info
    onProceedToPayment({ name, address, phone });
  };

  return (
    <div className="delivery-form">
      <h2>Delivery Information</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
