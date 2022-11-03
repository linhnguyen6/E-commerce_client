import React from "react";
import logo from "../../assets/images/logo.png";
import classNames from "classnames/bind";
// styles
import styles from "./Footer.module.css";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("wrapper")}>
      <form action="" id="form-mail"></form>
      <div className={cx("content")}>
        <div>
          <img src={logo} alt="" />
          <ul>
            <li>Địa chỉ : 35 Mạc Thái Tổ</li>
            <li>SĐT : +84 334 888 543</li>
            <li>Email : linh.nguyen6@tda.company</li>
          </ul>
        </div>
        <div>
          <h4>Useful Links</h4>
          <div>
            <ul>
              <li>About Us</li>
              <li>About Our Shop</li>
              <li>Secure Shopping</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Our Sitemap</li>
            </ul>
            <ul>
              <li>Who We Are</li>
              <li>Our Services</li>
              <li>Projects</li>
              <li>Contact</li>
              <li>Innovation</li>
              <li>Testimonials</li>
            </ul>
          </div>
        </div>
        <div className={cx("form-email")}>
          <h4>Join Our Newsletter Now</h4>
          <p>Get E-mail updates about our latest shop and special offers.</p>
          <input
            className={cx("input-mail")}
            type="text"
            placeholder="Enter your email"
            form="form-mail"
            required
          />
          <button className={cx("btn-submit")} form="form-mail" type="submit">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
