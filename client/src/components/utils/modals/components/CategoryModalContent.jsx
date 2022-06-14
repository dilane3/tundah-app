import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../dataManager/context/modalContext"
import Button from "../../../elements/buttons/Button"
import ItemCategorieModal from "./itemCategorieModal"
import ItemCategorie from "../itemCategorie"



const imageMariage = require("../../../../medias/img/mariage.jpg")
var items = [
  { value: "Les Mariages", label: "Les Mariages" },
  { value: "Les Funeriales", label: "Les Funeriales" },
  { value: "La Gastronomie", label: "La Gastronomie" },
  { value: "La Dote", label: "La Dote" },
  { value: "La Diversité  Linquistique", label: "La Diversité Linquistique" },
  { value: "Les Traditions", label: "Les Traditions" },
  { value: "Les Danses", label: "Les Danses" },
  { value: "Médias et Diversités culturelle", label: "Médias et Diversités culturelle" }
]

const CategoryModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  // Set local state
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

 
  const handleChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      // push selected value in list
      setCategories(prev => [...prev, value]);
    } else {
      // remove unchecked value from the list
      setCategories(prev => prev.filter(x => x !== value));
    }
  }
 
  return (
    <section>
      <Box className={styles.modalContent}>
        {/* <ShowCategories/> */} 
        <section className={styles.writePostModalSection}>
          <h1> Vos centres d'interêts </h1>
          <div className={styles.description}> Vous pouvez décidez de suivre des catégories de posts 
            qui vont s'afficher dans votre fil d'actualité.
          </div>
          <div className={styles.itemCategorie}>
            {items.map((x, i) => <label key={i}>
              <input
              type="checkbox"
              name="lang"
              value={x.value}
              onChange={handleChange}
            /> {x.label}
            </label>)}
          </div>
        </section>
      </Box>

      <Box className={styles.controls}>
        <Button
          classe="mr-2"
          action={closeModal}
          theme="danger"
        >
          Annuler
        </Button>

        <Button>
          Sauver
        </Button>
      </Box>
    </section>
  )
}

export default CategoryModalContent