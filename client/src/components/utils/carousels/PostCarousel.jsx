import React, { Component } from "react";
import Slider from "react-slick"
import {Image} from 'react-image-progressive-loading'

const nextArrowStyle = {
  display: "block",
  position: "absolute",
  right: "20px",
  zIndex: "20",
  borderRadius: "20px"
}

const prevArrowStyle = {
  display: "block",
  position: "absolute",
  left: "20px",
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
    <div className="mt-8 mx-2">
      <Slider {...settings}>
        <div className="postImgBlock w-full" >
          <Image 
            image={img1}
            alt={ alt1 ? alt1 : "image du post de leDoyen" }
            className="postImg w-full h-full"
            blur={true}
          />
        </div>
        <div className="postImgBlock w-full" >
          <Image 
            image={img2}
            alt={ alt1 ? alt1 : "image du post de leDoyen" }
            className="postImg w-full h-full"
            blur={true}
          />
        </div>
        <div className="postImgBlock w-full" >
          <Image 
            image={img3}
            alt={ alt1 ? alt1 : "image du post de leDoyen" }
            className="postImg w-full h-full"
            blur={true}
          />
        </div>
      </Slider>
    </div>
  );
}

export default PostCarousel