import React, { useState, useEffect } from 'react'
import { BsArrowLeft, BsArrowRight, BsX } from 'react-icons/bs'
import styles from '../../../css/displayPhoto.module.css'
import { ressourcesUrl } from '../../../utils/url';

const video = require("../../../medias/img/profil.mp4")

const CarouselPhoto = ({files, type, index, edited}) => {
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
            <img src={`${edited ? ressourcesUrl.postImages + '/': ""}${files[fileIndex]}`} />

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
                    <img src={`${edited ? ressourcesUrl.postImages + '/': ""}${file}`} />
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

const DisplayPhoto = ({files, type, edited, indexFile, onHide}) => {
  const index = indexFile ? indexFile:0
  const editedValue = edited === false ? edited : true 

  useEffect(() => {
    console.clear()
    console.log(files)
  })

  return (
    <section className={styles.displayPhotoSection}>
      <span className={styles.displayPhotoClose} onClick={onHide}>
        <BsX />
      </span>

      {
        type === "profil" ? (
          <div className={styles.displayPhotoPreview}>
            <img src={`${editedValue ? ressourcesUrl.profil+"/":""}${files[0]}`} />
          </div>
        ):<CarouselPhoto files={files} type={type} index={index} edited={editedValue} />
      }
    </section>
  )
}

export default DisplayPhoto