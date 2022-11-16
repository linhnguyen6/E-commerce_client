import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CartSlice from "../../reducer/cartSlice";
import toastr from "toastr";
// API
import { show } from "../../api/product";
import { getOne as getCategory } from "../../api/category";
// MUI
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Rating from "@mui/material/Rating";
// styles
import classNames from "classnames/bind";
import styles from "./DetailProduct.module.css";
const cx = classNames.bind(styles);

const DetailProduct = () => {
  const { id } = useParams();

  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (id) => {
    const { data: detailProduct } = await show(id);
    const { categoryId } = await (await show(id)).data;
    const { data } = await getCategory(categoryId);
    const filterProducts = data.products.filter(
      (product) => product.id !== +id
    );
    document.title = detailProduct.name;
    setProduct(detailProduct);
    setRelatedProduct(filterProducts);
  };

  const handleIncrease = () => {
    if (count >= 50) {
      toastr.warning("You can only choose up to 50 products");
      return;
    }
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  };

  const handleAddToCart = ({ categoryId, category, quantity, ...arg }) => {
    dispatch(CartSlice.actions.addToCart({ ...arg, quantity: count }));
    toastr.success("Add to cart successfully");
  };

  return (
    <>
      <div className={cx("container-fluid", "box-banner")}>
        <div>
          <h1>{product.name}</h1>
          <h2>
            <b>Home</b> <span>|</span> {product.name}
          </h2>
        </div>
      </div>
      <div className={cx("box-detail")}>
        <div>
          <img src={product.image} alt="" />
        </div>
        <div>
          <h2 className={cx("product_name")}>{product.name}</h2>
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
          <p className={cx("price")}>${product.price}</p>
          <p className={cx("detail")}>{product.desc}</p>
          <div className={cx("row-quantity")}>
            <div className={cx("quantity")}>
              <button onClick={handleDecrease}>-</button>
              <button>{count}</button>
              <button onClick={handleIncrease}>+</button>
            </div>
            <button
              className={cx("add-to-cart")}
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
          <ul className={cx("infor-product")}>
            <li>
              <b>Availability</b> <span>In Stock</span>
            </li>
            <li>
              <b>Shipping</b> <span>01 day shipping</span>
            </li>
            <li>
              <b>Weight</b> <span>0.5 kg</span>
            </li>
            <li>
              <b>Share on</b>
              <div className={cx("share")}>
                <FacebookIcon className={cx("icon")} />
                <TwitterIcon />
                <InstagramIcon />
                <PinterestIcon />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("container", "desc")}>
        <h3>Products Information</h3>
        <span>{product.desc}</span>
      </div>
      <h2 className={cx("title")}>Related Product</h2>
      <div className={cx("list-product", "container")}>
        {relatedProduct &&
          relatedProduct.map((product, index) =>
            index < 4 ? (
              <div className={cx("product-item")} key={product.id}>
                <div className={cx("box-product")}>
                  <img src={product.image} alt="" />
                  <ul className={cx("feature-item-pic")}>
                    <li className={cx("icon")}>
                      <FavoriteIcon />
                    </li>
                    <li className={cx("icon")}>
                      <ShoppingCartIcon />
                    </li>
                  </ul>
                </div>
                <p className={cx("product-name")}>
                  <Link to={"/product/" + product.id}>{product.name}</Link>
                </p>
                <p className={cx("product-price")}>{product.price + index}$</p>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </>
  );
};

export default DetailProduct;
