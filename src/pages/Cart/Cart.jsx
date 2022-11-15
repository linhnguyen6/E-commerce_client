import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// redux
import cartSlice from "../../reducer/cartSlice";
// styles
import styles from "./Cart.module.css";
import classNames from "classnames/bind";
import { StatusCodeCheckout } from "../../utils/constant";
const cx = classNames.bind(styles);

const Cart = () => {
  document.title = "Cart";

  const [searchParams] = useSearchParams();
  const { carts } = useSelector(({ cart }) => cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusCheckout = searchParams.get("redirect_status");

  useEffect(() => {
    if (statusCheckout === StatusCodeCheckout.success) {
      dispatch(cartSlice.actions.clearCart());
    }
  }, [statusCheckout, dispatch]);

  const handleBackToPage = () => navigate(-1);

  const handleIncrease = (id) => {
    dispatch(cartSlice.actions.increaseCart(id));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity === 1) return;
    dispatch(cartSlice.actions.decreaseCart({ id, quantity }));
  };

  const handleRemoveCart = (id) => {
    dispatch(cartSlice.actions.removeCart(id));
  };

  let total = 0;
  total = carts.reduce((acc, i) => {
    return acc + i.price * i.quantity;
  }, 0);

  if (statusCheckout === StatusCodeCheckout.success) {
    return (
      <div className={cx("card")}>
        <div className={cx("tick")}>
          <i className={cx("checkmark")}>✓</i>
        </div>
        <h1 className={cx("status")}>Success</h1>
        <p className={cx("desc")}>
          We received your purchase request
          <br />
          We'll be in touch shortly!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cx("container-fluid", "box-banner")}>
        <div>
          <h1>Shopping Cart</h1>
          <h2>
            <b>Home</b> <span>|</span> Shopping Cart
          </h2>
        </div>
      </div>
      {carts ? (
        <div className={cx("infor-cart")}>
          <table className={cx("table-cart")}>
            <thead>
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts.map((product) => (
                <tr key={product.id}>
                  <td className={cx("row-infor-product")}>
                    <div>
                      <img src={product.image} alt={product.name} />
                      <h5>{product.name}</h5>
                    </div>
                  </td>
                  <td className={cx("price")}>${product.price}</td>
                  <td>
                    <div className={cx("quantity")}>
                      <button
                        onClick={() =>
                          handleDecrease(product.id, product.quantity)
                        }
                      >
                        -
                      </button>
                      <button>{product.quantity}</button>
                      <button onClick={() => handleIncrease(product.id)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className={cx("total")}>
                      <span>${product.quantity * product.price}</span>
                      <svg
                        onClick={() => handleRemoveCart(product.id)}
                        className={cx("trash")}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={cx("btn-continue")} onClick={handleBackToPage}>
            CONTINUE SHOPPING
          </button>
          <div className={cx("receipt")}>
            <div></div>
            <div>
              <h3>Cart Total</h3>
              <ul>
                <li>Total</li>
                <li>${total}</li>
              </ul>
              {carts?.length > 0 ? (
                <Link to="/checkout">
                  <button>PROCEED TO CHECKOUT</button>
                </Link>
              ) : (
                <button className={cx("disabled-checkout")}>
                  PROCEED TO CHECKOUT
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Cart;
