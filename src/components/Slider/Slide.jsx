import React from "react";
import Slider from "react-slick";
import "./Slide.css";
import images from "../../assets";
import { Link } from "react-router-dom";
const Slide = () => {
  const listProduct = [
    {
      id: 1,
      image: images.cat1,
      name: "Dried Fruit",
    },
    {
      id: 2,
      image: images.cat2,
      name: "Vegetables",
    },
    {
      id: 3,
      image: images.cat3,
      name: "drink fruits",
    },
    {
      id: 4,
      image: images.cat4,
      name: "Fresh Fruit",
    },
    {
      id: 5,
      image: images.cat5,
      name: "Vegetables",
    },
  ];

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
      {listProduct.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt="" />
          <Link className="product-name">{product.name}</Link>
        </div>
      ))}
    </Slider>
  );
};

export default Slide;
