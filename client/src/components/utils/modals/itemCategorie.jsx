import React, { useState, useEffect, useContext } from 'react'
import {Image} from 'react-image-progressive-loading'
import "./showCategoriestyle.css"

const imageMariage= require("../../../medias/img/mariage.jpg")
const ItemCategorie= () => {

  return (
      <div className="contentCategorie">
          <div className="topItems">
            <div className="firstEle">
              <div className="topElement">
                <input type="checkbox"/>
                <Image image={imageMariage} className="cardImage" />
              </div>
              <span className="texte"> Les mariages </span>
            </div>
            <div className="firstEle">
              <div className="topElement">
                <input type="checkbox" className="checkCategorie"/>
                <Image image={imageMariage} className="cardImage" />
              </div>
              <span className="texte"> La tradition </span>
            </div>
          </div>
          <div className="topItems">
            <div className="firstEle">
              <div className="topElement">
                <input type="checkbox"/>
                <Image image={imageMariage} className="cardImage" />
              </div> 
              <span className="texte"> La cuisine </span>
            </div>
            <div className="firstEle">
              <div className="topElement">
                <input type="checkbox"/>
                <Image image={imageMariage} className="cardImage" />
              </div>
              <span className="texte"> Les funerailes </span>
            </div>
          </div>
      </div>
  )
}

export default ItemCategorie