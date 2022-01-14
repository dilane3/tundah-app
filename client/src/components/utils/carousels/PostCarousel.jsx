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

const PostCarousel = (props) => {
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
    files,
    onDisplayPhoto
  } = props
  
  return (
    <div className="mt-8">
      <Slider {...settings}>
        {
          files.map((file, index) => {
            return (
              <div className="postImgBlock w-full" onClick={() => onDisplayPhoto(index)}>
                <Image 
                  image={`http://localhost:5000/static/images/post/${file}`}
                  alt={"image du post de leDoyen"}
                  className="postImg"
                  blur={true}
                />
              </div>
            )
          })
        }
      </Slider>
    </div>
  )
}

export default PostCarousel