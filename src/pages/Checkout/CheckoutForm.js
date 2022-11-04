import axios from "axios";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const { carts } = useSelector(({ cart }) => cart);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getClientSecret();
    getPublishableKey();
  }, []);

  let amount = 0;
  amount = carts.reduce((acc, i) => {
    return acc + i.price * i.quantity;
  }, 0);

  const getClientSecret = async () => {
    const { data } = await axios.post(
      "https://near-judicious-microraptor.glitch.me/create-payment-intent",
      {
        amount,
      }
    );
    setClientSecret(data.clientSecret);
  };

  const getPublishableKey = async () => {
    const { data } = await axios.get(
      "https://near-judicious-microraptor.glitch.me/config"
    );
    setStripePromise(loadStripe(data.publishableKey));
  };

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default CheckoutForm;
