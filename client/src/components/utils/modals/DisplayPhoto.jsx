import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsX } from 'react-icons/bs'
import styles from '../../../css/displayPhoto.module.css'
import Slider from "react-slick";

const video = require("../../../medias/img/profil.mp4")

const CarouselPhoto = ({files, type, index}) => {
  const [fileIndex, setFileIndex] = useState(index)

  const navigate = (action) => {
    const filesClone = [...files]

    if (action === "next") {
      if (fileIndex === filesClone.length-1) {
        setFileIndex(0)
      } else {
        setFileIndex(state => state + 1)
      }
    } else {
      if (fileIndex === 0) {
        setFileIndex(filesClone.length-1)
      } else {
        setFileIndex(state => state - 1)
      }
    }
  }

  return (
    <div className={styles.displayPhotoPreview}>
      {
        type === "images" ? (
          <>
            <img src={`http://localhost:5000/static/images/post/${files[fileIndex]}`} />

            <span onClick={() => navigate("next")}>
              <BsArrowRight />
            </span>

            <span onClick={() => navigate("prev")}>
              <BsArrowLeft />
            </span>
          </>
        ):(
          <video src={video} autoPlay controls></video>
        )
      }

      {
        type === "images" ? (
          <div className={styles.displayPhotoTracker}>
            {
             files.map((file, index) => {
                const current = fileIndex === index ? true:false

                return (
                  <div 
                    key={index}
                    className={`${styles.displayPhotoTrackerItem} ${current ? styles.displayPhotoTrackerItemActive:""}`}
                    onClick={() => setFileIndex(index)}  
                  >
                    <img src={`http://localhost:5000/static/images/post/${file}`} />
                  </div>
                )
              })
            }     
          </div>
        ):null
      }
    </div>
  )
}

const DisplayPhoto = ({files, type, indexFile, onHide}) => {
  const index = indexFile ? indexFile:0

  return (
    <section className={styles.displayPhotoSection}>
      <span className={styles.displayPhotoClose} onClick={onHide}>
        <BsX />
      </span>

      {
        type === "profil" ? (
          <div className={styles.displayPhotoPreview}>
            <img src={files[0]} />
          </div>
        ):<CarouselPhoto files={files} type={type} index={index} />
      }
    </section>
  )
}

export default DisplayPhoto