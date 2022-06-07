import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import { Carousel } from '@trendyol-js/react-carousel';
import ItemCategorie from './itemCategorie'
import styles from '../../../css/writePost.module.css'
import "../../../css/app.css"
import "./showCategoriestyle.css"

const ShowCategories = ({ onCloseModal }) => {

  return (
    <>
      <section className={styles.writePostModalSection}>
        <h1> Vos centres d'interets </h1>
        <div className="description"> Vous pouvez décidez de suivre des catégories de posts 
          qui vonts s'afficher dans votre fil d'actualité ,en selectionnant celles 
          qui vous interessent
        </div>
        <Carousel>
		       <ItemCategorie/>
           <ItemCategorie/>
           <ItemCategorie/>
	      </Carousel>
      </section>

      <span className={styles.backgroundBlack} onClick={onCloseModal} />
    </>
  )
}

export default ShowCategories