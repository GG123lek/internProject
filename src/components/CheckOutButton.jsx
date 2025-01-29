import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QmYvHHHJ7P8h2RQIn6NUPbPMhjuDbloOSPr8KeOE1RX1hTWw8WNkbZYkd4ep7Gh0rXJ92kz0JXHDA4OUsFqZNa200i0IKlTP3");

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    stripe.redirectToCheckout({
      lineItems: [{ price: "price_1QmZSkHHJ7P8h2RQ39yqq2FW", quantity: 1 }],
      mode: "payment",
      successUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/cancel",
    });
  };

  return (
    <button
      onClick={handleCheckout}
      className="
        px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg 
        border-2 border-blue-700 shadow-md transition-all duration-300 
        hover:bg-blue-700 hover:border-blue-800 hover:shadow-lg
        text-lg sm:text-base md:text-xl lg:text-2xl
        w-full sm:w-auto
        flex justify-center items-center
        focus:outline-none
      "
    >
      Pay with Stripe
    </button>
  );
};

export default CheckoutButton;
