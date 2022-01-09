import React from 'react'
import { BsFillCameraFill, BsFillCloudArrowUpFill, BsFillCloudUploadFill, BsX } from 'react-icons/bs'
import { FaUpload } from 'react-icons/fa'
import styles from './profilPhotoModal.module.css'

// const image = require("../../../medias/img/mariage.jpg")

const AddProfilPhotoModal = ({image, onHide, onChangeProfil}) => {
  return (
    <section className={styles.profilPhotoModalSection}>
      <article className={styles.profilPhotoModalPreview}>
        <span className={styles.profilPhotoModalClose} onClick={onHide}>
          <BsX />
        </span>

        <div className={styles.profilPhotoModalImage}>
          <img src={image} className={styles.profilPhotoModalImageItem} />
        </div>

        <div className={styles.profilPhotoModalControl}>
          <div>
            <div onClick={onChangeProfil}>
              <BsFillCameraFill />
              Changer
            </div>
            <div>
              <FaUpload />
              Sauver
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export default AddProfilPhotoModal