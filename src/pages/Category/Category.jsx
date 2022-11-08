import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listProduct } from "../../data";
import { read, getOne as show } from "../../api/category";
import Path from "../../routes";
// MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// styles
import styles from "./Category.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Category = () => {
  const { id } = useParams();
  document.title = "Category" + id;

  // state
  const [value, setValue] = useState([10, 90]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    getListCategories();
    getCategory(id);
  }, [id]);

  const getListCategories = async () => {
    const { data } = await read();
    setCategories(data);
  };

  const getCategory = async (id) => {
    const { data } = await show(id);
    setCategory(data);
  };

  const handleChange = (e, newValue) => setValue(newValue);

  const valuetext = (value) => `${value}°C`;

  return category ? (
    <>
      <div className={cx("container-fluid")}>
        <div>
          <h1>Organi Shop</h1>
          <h2>
            <b>Home</b> <span>|</span> Shop {category.name}
          </h2>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("category")}>
          <h3>Category</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className={cx("category-item")}>
                <Link to={`${Path.Category}/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3>Price</h3>
          <Box className={cx("input-range-price")}>
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
  ) : null;
};

export default Category;
