import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addressShop, optionGoogleMap } from "../../utils/constant";
import { validEmail } from "../../regex";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { debounce } from "lodash";
import toastr from "toastr";
import Path from "../../routes";
// styles
import classNames from "classnames/bind";
import styles from "./Information.module.css";
const cx = classNames.bind(styles);

const Information = () => {
  document.title = "Checkout";
  const navigate = useNavigate();
  const refInput = useRef();

  // state
  const [fee, setFee] = useState(0);

  // selector
  const { cart, auth } = useSelector(({ cart, auth }) => ({
    cart,
    auth,
  }));
  const { carts } = cart;

  // use Form
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      email: auth?.user?.email || "",
    },
  });
  const { errors } = formState;
  const { ref, ...rest } = register("address", {
    required: "Please enter the address",
    onChange: (e) => onHandleChangeLocation(e),
  });

  useEffect(() => {
    const google = window.google;
    if (google && google?.maps?.places?.Autocomplete) {
      new google.maps.places.Autocomplete(refInput.current, {
        options: optionGoogleMap,
      });
    }
  }, []);

  const onSubmit = () => navigate(Path.Payment);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const setAddressChange = (e) => {
    const address = e.target.value;
    countFeeShip(address);
  };

  const onHandleChangeLocation = debounce(setAddressChange, 2000);

  const countFeeShip = (address) => {
    const { google } = window;
    let directionsService = new google.maps.DirectionsService();

    let request = {
      origin: addressShop,
      destination: address,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.metric,
    };

    directionsService.route(request, (result, status) => {
      if (status === google?.maps?.DirectionsStatus?.OK) {
        const feeShip = result.routes[0]?.legs[0]?.distance?.value / 1000;
        setFee(Number(feeShip.toFixed(1)));
      } else {
        toastr.warning("Location not found");
      }
    });
  };

  let total = 0;
  total = carts.reduce((acc, i) => {
    return acc + i.price * i.quantity;
  }, 0);

  return (
    <>
      <div className={cx("container-fluid", "box-banner")}>
        <div>
          <h1>Checkout</h1>
          <h2>
            <b>Home</b> <span>|</span> Checkout
          </h2>
        </div>
      </div>
      <div className={cx("box-user-infor")}>
        <h3>Billing Details</h3>
        <div className={cx("infor-order")}>
          <form id="form-infor" onSubmit={handleSubmit(onSubmit)}>
            <div className={cx("box-email-name")}>
              <div className={cx("form-group")}>
                <label htmlFor="">Name</label>
                <input
                  autoComplete="off"
                  onKeyDown={(e) => handleKeyDown(e)}
                  {...register("name", { required: "Please enter the name" })}
                />
                {errors.name && (
                  <span className={cx("error")}>{errors.name.message}</span>
                )}
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Email</label>
                <input
                  onKeyDown={(e) => handleKeyDown(e)}
                  autoComplete="off"
                  {...register("email", {
                    required: "Please enter the Email",
                    pattern: {
                      value: validEmail,
                      message: "Please enter a valid Email",
                    },
                  })}
                />
                {errors.email && (
                  <span className={cx("error")}>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="">Address</label>
              <input
                onKeyDown={(e) => handleKeyDown(e)}
                type="text"
                {...rest}
                ref={(e) => {
                  ref(e);
                  refInput.current = e;
                }}
              />
              {errors.address && (
                <span className={cx("error")}>{errors.address.message}</span>
              )}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="">Note</label>
              <textarea className={cx("note")} cols="30" rows="10"></textarea>
            </div>
          </form>
          <div className={cx("detail-order")}>
            <div>
              <h2>Your Order</h2>
              <div className={cx("check-order")}>
                Product
                <span>Total</span>
              </div>
              <ul>
                {carts.map((product) => (
                  <li key={product.id}>
                    <span>{product.name}</span>
                    <span>${product.price * product.quantity}</span>
                  </li>
                ))}
                <li>
                  <span>Fee ship</span>
                  <span>${total >= 1000 ? 0 : fee}</span>
                </li>
              </ul>
              <div className={cx("check-order-total")}>
                Total
                <span>${total < 1000 ? total + fee : total}</span>
              </div>
            </div>
            <button
              form="form-infor"
              className={cx("button-order")}
              type="submit"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
