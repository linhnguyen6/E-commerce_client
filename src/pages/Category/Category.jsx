import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import images from "../../assets";
import { read, getOne as show } from "../../api/category";
import { PriceRange } from "../../utils/constant";
import cartSlice from "../../reducer/cartSlice";
import Path from "../../routes";
import toastr from "toastr";
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
  const dispatch = useDispatch();
  const countProductOrder = 1;
  document.title = "Category" + id;

  // state
  const [value, setValue] = useState([PriceRange.min, PriceRange.max]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);

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
    setProducts(data.products);
  };

  const handleChange = (e, newValue) => setValue(newValue);

  const handleClickFilter = () => {
    const productsFilter = category.products.filter(
      (product) => product.price >= value[0] && product.price <= value[1]
    );
    setProducts(productsFilter);
  };

  const handleAddToCart = (product) => {
    dispatch(
      cartSlice.actions.addToCart({ ...product, quantity: countProductOrder })
    );
    toastr.success("Add to cart successfully");
  };

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
              min={PriceRange.min}
              max={PriceRange.max}
            />
          </Box>
          <div className={cx("range-price")}>
            <span>${value[0]}</span>
            <span>-</span>
            <span>${value[1]}</span>
            <button className={cx("btn-filter")} onClick={handleClickFilter}>
              Filter
            </button>
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
          <h2>Products</h2>
          <div className={cx("list-product")}>
            {products.length > 0 ? (
              products.map((product) => (
                <div className={cx("product-item")} key={product.id}>
                  <div className={cx("box-product")}>
                    <img src={product.image} alt="" />
                    <ul className={cx("feature-item-pic")}>
                      <li className={cx("icon")}>
                        <FavoriteIcon />
                      </li>
                      <li
                        className={cx("icon")}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCartIcon />
                      </li>
                    </ul>
                  </div>
                  <p className={cx("product-name")}>{product.name}</p>
                  <p className={cx("product-price")}>${product.price}</p>
                </div>
              ))
            ) : (
              <img
                src={images.nodata}
                alt="Data Not Found"
                className={cx("no-data-image")}
              />
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Category;
