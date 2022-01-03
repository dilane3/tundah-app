import React, { Component } from "react";
import Slider from "react-slick"
const PostCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div className="h-82 bg-green-500 flex items-center justify-center text-xl text-white font-primary ">
          <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</h3>
        </div>
        <div className="h-82 bg-blue-500 flex items-center justify-center text-xl text-white font-primary ">
          <h3>2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</h3>
        </div>
        <div className="h-82 bg-orange-500 flex items-center justify-center text-xl text-white font-primary ">
          <h3>3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</h3>
        </div>
        <div className="h-82 bg-gray-500 flex items-center justify-center text-xl text-white font-primary ">
          <h3>4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</h3>
        </div>
        <div className="h-82 bg-yellow-500 flex items-center justify-center text-xl text-white font-primary ">
          <h3>5 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</h3>
        </div>
      </Slider>
    </div>
  );
}

export default PostCarousel