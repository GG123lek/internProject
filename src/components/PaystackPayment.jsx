import React from "react";
import { PaystackButton } from "react-paystack";

const PaystackPayment = ({ amount, email }) => {
  const publicKey = "pk_test_xxxxxxxxxx"; // Replace with your Paystack Public Key

  const paystackProps = {
    email: email, // Customer Email
    amount: amount * 100, // Convert to kobo (Paystack processes in kobo)
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: (response) => {
      alert(`Payment Successful! Transaction ID: ${response.transaction}`);
      console.log(response);
    },
    onClose: () => {
      alert("Payment window closed.");
    },
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <PaystackButton {...paystackProps} className="paystack-button" />
    </div>
  );
};

export default PaystackPayment;
