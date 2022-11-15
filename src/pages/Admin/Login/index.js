import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../reducer/authSlice";
import toastr from "toastr";
import Path from "../../../routes";
// styles
import styles from "./Login.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const AdminLoginPage = () => {
  document.title = "Admin Login";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // selector
  const { user } = useSelector(({ auth }) => auth);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user?.emailVerified) {
      navigate(Path.AdminDashBoard);
    } else {
      toastr.error("You can have do not access");
    }
  }, [user, navigate]);

  const onSubmit = (data) => dispatch(login(data));

  return (
    <section className={cx("section")}>
      <div className={cx("container")}>
        <div className={cx("user", "signinBx")}>
          <div className={cx("imgBx")}>
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
              alt="User"
            />
          </div>
          <div className={cx("formBx")}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <h2>Sign In</h2>
              <input
                {...register("email")}
                type="text"
                placeholder="Username"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              <input type="submit" defaultValue="Login" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
