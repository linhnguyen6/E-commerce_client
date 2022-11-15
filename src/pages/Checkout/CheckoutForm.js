import axios from "axios";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "./Payment";
// style
import styles from "./Checkout.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const CheckoutForm = () => {
  const { carts } = useSelector(({ cart }) => cart);

  // state
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClientSecret();
    getPublishableKey();
  }, []);

  let amount = 0;
  amount = carts.reduce((acc, i) => {
    return acc + i.price * i.quantity;
  }, 0);

  const getClientSecret = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_CREATE_PAYMENT_INTENT_API,
        {
          amount,
        }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getPublishableKey = async () => {
    const { data } = await axios.get(process.env.REACT_APP_CONFIG_API);
    setStripePromise(loadStripe(data.publishableKey));
  };

  return (
    <>
      {loading && <div className={cx("loader")}></div>}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default CheckoutForm;
