import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { read } from "../../api/category";
import { search } from "../../api/product";
import { logout } from "../../reducer/authSlice";
import { emailAddress, freeShip, menuItems } from "../../utils/constant";
import images from "../../assets";
import Path from "../../routes";
// MUI
import { CircularProgress } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// styles
import styles from "./Header.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [keyword, setKeyword] = useState("");

  // selector
  const { cart: cartReducer, auth } = useSelector((state) => state);
  const { carts } = cartReducer;
  const { user } = auth;

  useEffect(() => {
    getListCategories();
  }, []);

  useEffect(() => {
    if (keyword.trim() !== "" && keyword !== undefined) {
      searchProduct(keyword);
    } else {
      setProducts(undefined);
    }
  }, [keyword]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => dispatch(logout());

  const getListCategories = async () => {
    const { data } = await read();
    setCategories(data);
  };

  const updateKeyword = (e) => setKeyword(e.target.value);

  const handleChangeInput = debounce(updateKeyword, 500);

  const searchProduct = async (keyword) => {
    try {
      setLoading(true);
      const { data } = await search(keyword);
      setProducts(data);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (idProduct) => {
    navigate(`/product/${idProduct}`);
    setProducts(undefined);
  };

  return (
    <header>
      <div className={cx("header_top")}>
        <div className={cx("header_top_left")}>
          <MailIcon />
          <span className={cx("header_top_email")}>{emailAddress}</span>
          <span className={cx("header_top_slogan")}>{freeShip}</span>
        </div>
        <div className={cx("header_top_right")}>
          <div className={cx("header_top_icon")}>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <PinterestIcon />
          </div>
          <div className={cx("header_top_language")}>
            <img src={images.language} alt="English" />
            <span>English</span>
          </div>
          <div className={cx("header_top_user")}>
            {user ? (
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className={cx("btn-user")}
                  title={user.email.slice(0, -10)}
                >
                  <AccountCircleIcon />
                  {user.email.slice(0, -10)}
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className={cx("menu_drop_down_item")}
                  >
                    <Link>Profile</Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={cx("menu_drop_down_item")}
                  >
                    <Link onClick={handleLogout}>Logout</Link>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <AccountCircleIcon />
                <Link to="login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={cx("header_bot")}>
        <Link to={Path.Home}>
          <img src={images.logo} alt="Logo" />
        </Link>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={cx(
                "menu-item",
                location.pathname === item.link ? "active" : ""
              )}
            >
              <Link to={item.link}>{item.page}</Link>
            </li>
          ))}
        </ul>
        <div>
          <Link to={Path.Cart} className={cx("cart")}>
            <ShoppingBasketIcon />
            {carts.length > 0 ? (
              <div>
                <span>{carts.length}</span>
              </div>
            ) : null}
          </Link>
        </div>
        <label htmlFor="hidden_menu" className={cx("menu-icon")}>
          <MenuIcon />
        </label>
      </div>
      <input
        type="checkbox"
        name=""
        id="hidden_menu"
        className={cx("inputHidden")}
      />
      <div className={cx("menu-mobile")}>
        <div>
          <img src={images.logo} alt="" onClick={() => navigate(Path.Home)} />
        </div>
        <div onClick={() => navigate(Path.Cart)}>
          <div>
            <ShoppingBasketIcon />
            {carts.length > 0 ? <span>{carts.length}</span> : null}
          </div>
          Cart
        </div>
        <div>
          {user ? (
            <span className={cx("icon-person")}>
              <PersonIcon />
              <span>{user.email.slice(0, -10)} </span>
              <span onClick={handleLogout} className={cx("logout-mobile")}>
                | Logout
              </span>
            </span>
          ) : (
            <span className={cx("icon-person")}>
              <PersonIcon />
              <Link to={Path.Login}>Login</Link>
            </span>
          )}
          <ul>
            {menuItems.map((menu, rowIndex) => (
              <li key={rowIndex}>{menu.page}</li>
            ))}
          </ul>
        </div>
        <div>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <PinterestIcon />
        </div>
        <div className={cx("icon-mail")}>
          <MailIcon />
          {emailAddress}
        </div>
        <br />
        {freeShip}
      </div>
      <label htmlFor="hidden_menu" className={cx("overlay")}></label>
      <div className={cx("wrapper")}>
        <label className={cx("category")} htmlFor="show_category">
          <MenuIcon sx={{ mr: 2 }} />
          All Category
          <KeyboardArrowDownIcon />
        </label>
        <input
          type="checkbox"
          className={cx("show_category")}
          id="show_category"
          hidden
        />
        <div className={cx("list-category")}>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`${Path.Category}/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={cx("form-search")}>
          <input
            className={cx("input-search")}
            placeholder="What do you need ?"
            onKeyUp={handleChangeInput}
          />
          <button className={cx("btn-search")}>SEARCH</button>
          {loading ? <CircularProgress className={cx("loading")} /> : null}
          {products && (
            <div className={cx("list-product-search")}>
              {products.map((product, rowIndex) => (
                <div className={cx("product-item")} key={rowIndex}>
                  <div>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div onClick={() => handleNavigate(product.id)}>
                    <span className={cx("name")}>{product.name}</span>
                    <p className={cx("price")}>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {products?.length === 0 && (
            <div className={cx("list-product-search")}>
              <p className={cx("no-result")}>No results</p>
              <span>Please enter another keyword</span>
            </div>
          )}
        </div>
        <div className={cx("contact")}>
          <div className={cx("icon-phone")}>
            <PhoneEnabledIcon />
          </div>
          <div>
            <p>+84 334.888.543</p>
            <span>support 24/7 time</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
