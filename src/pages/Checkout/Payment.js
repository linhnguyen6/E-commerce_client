import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { PAYMENT_ERROR_CODE } from "../../utils/constant";
import toastr from "toastr";
// styles
import styles from "./Payment.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_CART_PAGE,
      },
    });

    if (
      error.type === PAYMENT_ERROR_CODE["cart_error"] ||
      error.type === PAYMENT_ERROR_CODE["validation_error"]
    ) {
      toastr.error(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className={cx("payment-form")}
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className={cx("button-checkout")}
      >
        {isProcessing ? "Processing ... " : "Pay now"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default Payment;
