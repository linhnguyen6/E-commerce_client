import React, { useEffect, useState } from "react";
import { login } from "../../reducer/authSlice";
import { validEmail } from "../../regex";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
// MUI
import { CircularProgress } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// styles
import styles from "./Login.module.css";
import classNames from "classnames/bind";
import { useRef } from "react";
const cx = classNames.bind(styles);

const Login = () => {
  document.title = "Login Page";

  const loading = useSelector((store) => store.auth.loading);
  const [type, setType] = useState("password");
  const { user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const ref = useRef();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRedirect = () => navigate("/signup");

  const onSubmit = (data) => dispatch(login(data));

  const handleInputChange = () => {
    if (ref.current.checked) {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className={cx("container")}>
      <h2>LOGIN OR CREATE ACCOUNT</h2>
      <div className={cx("box-user")}>
        <div className={cx("box-signup")}>
          <h3>NEW CUSTOMERS</h3>
          <p>
            By creating an account with our store, you will be able to move
            through the checkout process faster, store multiple shipping
            addresses, view and track your orders in your account and more.
          </p>
          <button onClick={handleRedirect}>CREATE AN ACCOUNT</button>
        </div>
        <form
          className={cx("box-login")}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h3>REGISTERED CUSTOMERS</h3>
          <span>If you have an account with us, please log in.</span>
          <div className={cx("form-group")}>
            <label htmlFor="">
              EMAIL ADDRESS<span>*</span>
            </label>
            <input
              {...register("email", {
                required: "Please enter the email",
                pattern: {
                  value: validEmail,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className={cx("message-error")}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="">
              PASSWORD<span>*</span>
            </label>
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              ref={ref}
              className={cx("input_show_password")}
              hidden
              onChange={handleInputChange}
            />
            <div className={cx("inputPassword")}>
              <input
                type={type}
                {...register("password", {
                  required: "Please enter the password",
                })}
              />
              <label htmlFor="showPassword">
                <VisibilityOffIcon />
              </label>
              <label htmlFor="showPassword">
                <VisibilityIcon />
              </label>
            </div>
            {errors.password && (
              <span className={cx("message-error")}>
                {errors.password.message}
              </span>
            )}
          </div>
          <label className={cx("forgot")} title="Yor forgot password ?">
            FORGOT YOUR PASSWORD ?
          </label>
          <button className={cx("btn-login")} type="submit" disabled={loading}>
            {loading && <CircularProgress size={20} />}
            <span>SUBMIT</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
