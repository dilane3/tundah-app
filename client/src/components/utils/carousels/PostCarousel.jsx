import React, { Component } from "react";
<<<<<<< HEAD
import Slider from "react-slick"

const nextArrowStyle = {
  display: "block",
  position: "absolute",
  right: "10px",
  zIndex: "20",
  borderRadius: "20px"
}

const prevArrowStyle = {
  display: "block",
  position: "absolute",
  left: "10px",
  zIndex: "20"
}

const PostCarousel = (props) => {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...nextArrowStyle }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...prevArrowStyle }}
        onClick={onClick}
      />
    );
  }

=======
import Slider from "slick-carousel"
const PostCarousel = () => {
>>>>>>> f24f4a99df8e8adc6c7d6c63d250ea4a54c7d89e
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const {
    img1,
    alt1,
    img2,
    alt2,
    img3
  } = props
  
  return (
    <div className="bg-black mt-20">
      <Slider {...settings} >
        <div className="w-full h-96">
          <img src={img1} alt={ alt1 ? alt1 : "image du post de leDoyen" } className="inline-block w-full h-full"/>
        </div>
        <div className="w-full h-96">
          <img src={img2} alt={ alt1 ? alt1 : "image du post de leDoyen" } className="inline-block w-full h-full"/>
        </div>
        <div className="w-full h-96">
          <img src={img3} alt={ alt1 ? alt1 : "image du post de leDoyen" } className="inline-block w-full h-full"/>
        </div>
      </Slider>
    </div>
  );
}

export default PostCarousel