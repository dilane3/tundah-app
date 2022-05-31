import React, { useState, useEffect, useContext } from 'react'
import styles from '../../../css/writePost.module.css'
import "../../../css/app.css"

const ShowCategories = ({ onCloseModal }) => {

  return (
    <>
      <section className={styles.writePostModalSection}>
        Liste des categories
      </section>

      <span className={styles.backgroundBlack} onClick={onCloseModal} />
    </>
  )
}

export default ShowCategories