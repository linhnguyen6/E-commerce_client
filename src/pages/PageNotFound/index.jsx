import React from "react";
import { Link } from "react-router-dom";
import Path from "../../routes";
// style
import styles from "./PageNotFound.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const PageNotFound = () => {
  return (
    <div className={cx("flex-container")}>
      <div className={cx("text-center")}>
        <h1>
          <span className={cx("fade-in")} id="digit1">
            4
          </span>
          <span className={cx("fade-in")} id="digit2">
            0
          </span>
          <span className={cx("fade-in")} id="digit3">
            4
          </span>
        </h1>
        <h3 className={cx("fadeIn")}>PAGE NOT FOUND</h3>
        <Link to={Path.Home}>
          <button type="button" name="button">
            Return To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
