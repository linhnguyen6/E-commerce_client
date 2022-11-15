import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDistrict, getProvince, getWards } from "../../api/province";
import Path from "../../routes";
// styles
import classNames from "classnames/bind";
import styles from "./Information.module.css";
import { validEmail } from "../../regex";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Information = () => {
  // selector
  const { cart, auth } = useSelector(({ cart, auth }) => ({
    cart,
    auth,
  }));
  const { carts } = cart;
  const navigate = useNavigate();

  // state
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      email: auth?.user?.email || "",
    },
  });
  const { errors } = formState;

  useEffect(() => {
    listProvinces();
  }, []);

  const onSubmit = () => navigate(Path.Payment);

  const onChangeProvince = async (e) => {
    const data = await getDistrict(e.target.value);
    setDistricts(data);
  };

  const onChangeDistrict = async (e) => {
    const data = await getWards(e.target.value);
    setWards(data);
  };

  const listProvinces = async () => {
    const data = await getProvince();
    setProvinces(data);
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
          <form
            autoComplete="off"
            id="form-infor"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={cx("box-email-name")}>
              <div className={cx("form-group")}>
                <label htmlFor="">Name</label>
                <input
                  {...register("name", { required: "Please enter the name" })}
                />
                {errors.name && (
                  <span className={cx("error")}>{errors.name.message}</span>
                )}
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Email</label>
                <input
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
              <select
                {...register("province", {
                  required: "Please select the province",
                  onChange: (e) => onChangeProvince(e),
                })}
              >
                <option value="">Select Province</option>
                {provinces?.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province_name}
                  </option>
                ))}
              </select>

              {errors.province && (
                <span className={cx("error")}>{errors.province.message}</span>
              )}
            </div>
            <div className={cx("form-group")}>
              <select
                {...register("district", {
                  required: "Please select the district",
                  onChange: (e) => onChangeDistrict(e),
                })}
              >
                <option value="">Select District</option>
                {districts?.map((district) => (
                  <option
                    value={district.district_id}
                    key={district.district_id}
                  >
                    {district.district_name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className={cx("error")}>{errors.district.message}</span>
              )}
            </div>
            <div className={cx("form-group")}>
              <select
                {...register("ward", {
                  required: "Please select the ward",
                })}
              >
                <option value="">Select Ward</option>
                {wards?.map((ward, i) => (
                  <option key={ward.ward_id}>{ward.ward_name}</option>
                ))}
              </select>
              {errors.ward && (
                <span className={cx("error")}>{errors.ward.message}</span>
              )}
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
                    {product.name}
                    <span>${product.price * product.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className={cx("check-order-total")}>
                Total
                <span>${total}</span>
              </div>
            </div>
            <button form="form-infor" className={cx("button-order")}>
              place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
