import React, { useState } from "react";
import classNames from "classnames/bind";
import { listProduct } from "../../data";
import { Link, useParams } from "react-router-dom";
// MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// styles
import styles from "./Category.module.css";
const cx = classNames.bind(styles);

const Category = () => {
  const { slug } = useParams();

  const [value, setValue] = useState([10, 90]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  document.title = "Category" + slug;

  const valuetext = (value) => `${value}°C`;

  return (
    <>
      <div className={cx("container-fluid")}>
        <div>
          <h1>Organi Shop</h1>
          <h2>
            <b>Home</b> <span>|</span> Shop {slug}
          </h2>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("category")}>
          <h3>Category</h3>
          <ul>
            <li>Fresh Meat</li>
            <li>Vegetables</li>
            <li>Fruit & Nut Gifts</li>
            <li>Fresh Berries</li>
            <li>Ocean Foods</li>
            <li>Butter & Eggs</li>
            <li>Fastfood</li>
            <li>Fresh Onion</li>
            <li>Papayaya & Crisps</li>
            <li>Oatmeal</li>
          </ul>
          <h3>Price</h3>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <div className={cx("range-price")}>
            <span>${value[0]}</span>
            <span>-</span>
            <span>${value[1]}</span>
          </div>
          <h3>Colors</h3>
          <div className={cx("colors")}>
            <ul className={cx("list-color")}>
              <li
                className={cx("color-item")}
                style={{ "--bg": "transparent" }}
              >
                White
              </li>
              <li className={cx("color-item")} style={{ "--bg": "#E9A625" }}>
                Gray
              </li>
              <li className={cx("color-item")} style={{ "--bg": "#D62D2D" }}>
                Red
              </li>
            </ul>
            <ul className={cx("list-color")}>
              <li className={cx("color-item")} style={{ "--bg": "#333333" }}>
                Black
              </li>
              <li className={cx("color-item")} style={{ "--bg": "#249BC8" }}>
                Blue
              </li>
              <li className={cx("color-item")} style={{ "--bg": "#3CC032" }}>
                Green
              </li>
            </ul>
          </div>
          <h3>Popular Size</h3>
          <div className={cx("list-size")}>
            <div className={cx("box-size")}>
              <div>
                <input type="radio" name="size" id="Large" />
                <label htmlFor="Large" className={cx("label-size")}>
                  Large
                </label>
              </div>
              <div>
                <input type="radio" name="size" id="Medium" />
                <label htmlFor="Medium" className={cx("label-size")}>
                  Medium
                </label>
              </div>
            </div>
            <div className={cx("box-size")}>
              <div>
                <input type="radio" name="size" id="Small" />
                <label htmlFor="Small" className={cx("label-size")}>
                  Small
                </label>
              </div>
              <div>
                <input type="radio" name="size" id="Tiny" />
                <label htmlFor="Tiny" className={cx("label-size")}>
                  Tiny
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("product")}>
          <h2>Sale Off</h2>
          <div className={cx("list-product")}>
            {listProduct.map((product, index) => (
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
                <span className={cx("sale")}>20%</span>
                <p className={cx("product-name")}>{product.name}</p>
                <p className={cx("product-price")}>
                  {product.price + index}$ <span>$36.00</span>
                </p>
              </div>
            ))}
          </div>
          <div className={cx("pagination")}>
            <Link className={cx("page")}>1</Link>
            <Link className={cx("page")}>2</Link>
            <Link className={cx("page")}>3</Link>
            <Link className={cx("page")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
