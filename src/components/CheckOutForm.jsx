import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "pk_test_51QmYvHHHJ7P8h2RQIn6NUPbPMhjuDbloOSPr8KeOE1RX1hTWw8WNkbZYkd4ep7Gh0rXJ92kz0JXHDA4OUsFqZNa200i0IKlTP3", // Replace with your Stripe Secret Key (Use this in Backend in production)
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-2">Complete Payment</h2>
      <p className="mb-4">Total: <span className="font-bold text-green-600">${amount}</span></p>
      <CardElement className="border p-2 rounded mb-4" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
