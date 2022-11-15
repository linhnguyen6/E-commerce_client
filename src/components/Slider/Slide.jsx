import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLimitProduct } from "../../api/product";
import { countLimitProductShow } from "../../utils/constant";
import Slider from "react-slick";
// style
import "./Slide.css";

const Slide = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getListProducts();
  }, []);

  const getListProducts = async () => {
    const { data } = await getLimitProduct(countLimitProductShow);
    setProducts(data);
  };

  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="product-item-slide">
          <img src={product.image} alt="" />
          <Link className="product-name-slide" to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default Slide;
