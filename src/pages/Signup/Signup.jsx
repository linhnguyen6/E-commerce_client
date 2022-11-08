import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validEmail } from "../../regex";
import { register as signup } from "../../reducer/authSlice";
import FormInput from "../../components/FormInput";
// MUI
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
// styles
import classNames from "classnames/bind";
import styles from "./Signup.module.css";
const cx = classNames.bind(styles);

const Signup = () => {
  document.title = "Signup Page";

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refs = useRef([]);
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const [type, setType] = useState({
    password: "password",
    passwordConfirm: "password",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data) => dispatch(signup(data));

  const handleInputChange = (element) => {
    if (refs.current[element].checked) {
      setType({ ...type, [`${element}`]: "text" });
    } else {
      setType({ ...type, [`${element}`]: "password" });
    }
  };

  return (
    <div className={cx("container")}>
      <h2>CREATE AN ACCOUNT</h2>
      <h3>PERSONAL INFORMATION</h3>
      <form
        className={cx("box-signup")}
        onSubmit={handleSubmit(onSubmit)}
        id="form-signup"
        autoComplete="off"
      >
        <div>
          <FormInput
            label="first name"
            name="firstName"
            register={register}
            errors={errors}
            required
            type="text"
          />
          <FormInput
            label="email address"
            name="email"
            register={register}
            pattern={validEmail}
            errors={errors}
            required
          />
          <div className={cx("form-group")}>
            <label htmlFor="">
              PASSWORD<span>*</span>
            </label>
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              ref={(element) => (refs.current["password"] = element)}
              className={cx("input_show_password")}
              hidden
              onChange={() => handleInputChange("password")}
            />
            <div className={cx("inputPassword")}>
              <input
                name="password"
                type={type["password"]}
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
        </div>
        <div>
          <FormInput
            label="last name"
            name="lastName"
            register={register}
            errors={errors}
            required
            type="text"
          />
          <div className={cx("form-group")}>
            <label htmlFor="">
              CONFIRM PASSWORD<span>*</span>
            </label>
            <input
              type="checkbox"
              name="showPassword"
              id="showPasswordConfirm"
              ref={(element) => (refs.current["passwordConfirm"] = element)}
              className={cx("input_show_password")}
              hidden
              onChange={() => handleInputChange("passwordConfirm")}
            />
            <div className={cx("inputPassword")}>
              <input
                type={type["passwordConfirm"]}
                {...register("passwordConfirmation", {
                  required: "Please enter the confirm password",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
              />
              <label htmlFor="showPasswordConfirm">
                <VisibilityOffIcon />
              </label>
              <label htmlFor="showPasswordConfirm">
                <VisibilityIcon />
              </label>
            </div>
            {errors.passwordConfirmation && (
              <span className={cx("message-error")}>
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
        </div>
      </form>
      <button
        form="form-signup"
        type="submit"
        disabled={loading}
        className={cx("btn-signup")}
      >
        {loading && <CircularProgress size={20} />}
        <span>SUBMIT</span>
      </button>
    </div>
  );
};

export default Signup;
