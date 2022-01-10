import React from 'react'
import { BsFillCameraFill, BsFillCloudArrowUpFill, BsFillCloudUploadFill, BsX } from 'react-icons/bs'
import { FaUpload } from 'react-icons/fa'
import styles from './profilPhotoModal.module.css'

const UploadFileProgress = ({percentage}) => {
  percentage = percentage ? percentage:0

  return (
    <article className={styles.uploadFileProgressSection}>
      <span>Telechargement de la photo...</span>
      <span className={styles.uploadFileProgressBar}>
        <span className={styles.uploadFileProgressPercentage} style={{width: `${percentage}%`}}></span>
      </span>
      <span className={styles.uploadFileProgressPercentageText}>{percentage}%</span>
    </article>
  )
}

const AddProfilPhotoModal = ({image, onHide, onChangeProfil, onUploadProfil, percentage, uploading}) => {
  return (
    <section className={styles.profilPhotoModalSection}>
      <article className={styles.profilPhotoModalPreview}>
        <span className={styles.profilPhotoModalClose} onClick={onHide}>
          <BsX />
        </span>

        <div className={styles.profilPhotoModalImage}>
          <img src={image} className={styles.profilPhotoModalImageItem} />
        </div>

        {
          !uploading ? (
            <div className={styles.profilPhotoModalControl}>
              <div>
                <div onClick={onChangeProfil}>
                  <BsFillCameraFill />
                  Changer
                </div>
                <div onClick={onUploadProfil}>
                  <FaUpload />
                  Sauver
                </div>
              </div>
            </div>
          ):null
        }


        {
          uploading ? <UploadFileProgress percentage={percentage} /> : null
        }
      </article>
    </section>
  )
}

export default AddProfilPhotoModal