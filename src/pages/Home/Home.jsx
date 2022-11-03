import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "../../assets";
import { listBlog } from "../../data";
import Path from "../../routes";
// API
import { read } from "../../api/product";
import { read as readCategory } from "../../api/category";
// MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slide from "../../components/Slider/Slide";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// style
import classNames from "classnames/bind";
import styles from "./Home.module.css";
const cx = classNames.bind(styles);

const Home = () => {
  document.title = "Home Page | Ogani";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const getProduct = async () => {
    const { data } = await read();
    setProducts(data);
  };

  const getCategory = async () => {
    const { data } = await readCategory();
    setCategories(data);
  };

  return (
    <div className={cx("container")}>
      <aside>
        <ul className={cx("category")}>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`${Path.Category}/${category.id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={cx("banner")}>
          <img src={images.banner} alt="" />
          <div>
            <p>FRUIT FRESH</p>
            <h2>
              Vegetable <br />
              100% Organic
            </h2>
            <p className={cx("slogan")}>Free Pickup and Delivery Available</p>
            <button>shop now</button>
          </div>
        </div>
      </aside>
      <Slide />
      <h2 className={cx("title")}>Feature Product</h2>
      <ul className={cx("list-category")}>
        <li>
          <Link>All</Link>
        </li>
        <li>
          <Link>Orange</Link>
        </li>
        <li>
          <Link>Fresh Meat</Link>
        </li>
        <li>
          <Link>Vegetables</Link>
        </li>
        <li>
          <Link>Fastfood</Link>
        </li>
      </ul>
      <div className={cx("list-product")}>
        {products.map((product, index) => (
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
        ))}
      </div>
      <div className={cx("banner-pic")}>
        <img src={images.banner1} alt="" />
        <img src={images.banner2} alt="" />
      </div>
      <h2 className={cx("title")}>From The Blog</h2>
      <div className={cx("list-blog")}>
        {listBlog.map((blog) => (
          <div className={cx("blog-item")} key={blog.id}>
            <img className={cx("blog-image")} src={blog.image} alt="" />
            <p className={cx("blog-timer")}>
              <CalendarTodayIcon />
              May 4,2019
              <ChatBubbleOutlineIcon />5
            </p>
            <h3 className={cx("blog-title")}>{blog.title}</h3>
            <p className={cx("blog-desc")}>{blog.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
