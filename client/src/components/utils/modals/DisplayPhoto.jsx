import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsX } from 'react-icons/bs'
import styles from '../../../css/displayPhoto.module.css'
import Slider from "react-slick";

const CarouselPhoto = ({images}) => {
  const [imageIndex, setImageIndex] = useState(0)

  const navigate = (action) => {
    const imagesClone = [...images]

    if (action === "next") {
      if (imageIndex === imagesClone.length-1) {
        setImageIndex(0)
      } else {
        setImageIndex(state => state + 1)
      }
    } else {
      if (imageIndex === 0) {
        setImageIndex(imagesClone.length-1)
      } else {
        setImageIndex(state => state - 1)
      }
    }
  }

  return (
    <div className={styles.displayPhotoPreview}>
      <img src={images[imageIndex]} />

      <span onClick={() => navigate("next")}>
        <BsArrowRight />
      </span>

      <span onClick={() => navigate("prev")}>
        <BsArrowLeft />
      </span>

      <div className={styles.displayPhotoTracker}></div>
    </div>
  )
}

const DisplayPhoto = ({images, onHide}) => {
  return (
    <section className={styles.displayPhotoSection}>
      <span className={styles.displayPhotoClose} onClick={onHide}>
        <BsX />
      </span>

      {/* <div className={styles.displayPhotoPreview}> */}
        {/* <img src={images[0]} /> */}

        <CarouselPhoto images={images} />
      {/* </div> */}
    </section>
  )
}

export default DisplayPhoto