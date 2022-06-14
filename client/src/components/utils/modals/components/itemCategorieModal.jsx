import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../dataManager/context/modalContext"
import Button from "../../../elements/buttons/Button"
import {Image} from 'react-image-progressive-loading'

const imageMariage = require("../../../../medias/img/mariage.jpg")
const ItemCategorieModal = (props) => {
  

  return (
    <div className={styles.firstElementcat}>
            <div className={styles.topElementcat}>
                <input type="checkbox" />
                <Image image={imageMariage} className={styles.cardImagecat} />
            </div>
            <span className={styles.texteCat}> {props.item.categorie} </span>
    </div>
  )
}

export default ItemCategorieModal