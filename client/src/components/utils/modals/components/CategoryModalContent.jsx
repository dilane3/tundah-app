import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../dataManager/context/modalContext"
import Button from "../../../elements/buttons/Button"
import ItemCategorieModal from "./itemCategorieModal"
import ItemCategorie from "../itemCategorie"
import CategoryApi from "../../../../api/categories"
import Category from "../../../../entities/Category"
import UserApi from "../../../../api/users"
import currentUserContext from "../../../../dataManager/context/currentUserContent"

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
  const { currentUser } = useContext(currentUserContext)

  // Set local state
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // UseEffect section
  useEffect(() => {
    handleGetAllCategories()
  }, [])

  //handler
  const handleGetAllCategories = async () => {
    const { data, error } = await CategoryApi.getAll()

    if (data) {
      const categories = []

      for (let res of data) {
        categories.push(new Category(res))
      }

      setAllCategories(categories)
    } else {
      console.log(error)
    }
  }


  const handleChange = e => {
    const { value, checked } = e.target;
    const selectedCategoriesClone = [...selectedCategories]

    if (checked) {
      const selectedCategory = allCategories.find(cat => cat.getId === value)

      if (!selectedCategoriesClone.some(cat => cat.getId === value)) {
        selectedCategoriesClone.push(selectedCategory)
      }
    } else {
      // remove unchecked value from the list
      const index = selectedCategoriesClone.findIndex(cat => cat.getId === value)

      if (index > -1) {
        selectedCategoriesClone.splice(index, 1)
      }
    }

    setSelectedCategories(selectedCategoriesClone)
  }

  const handleSubmit = async () => {
    if (selectedCategories.length > 0) {
      const { error, data } = await UserApi.followCategory(currentUser.id, selectedCategories.map(cat => cat.id))

      console.log({ error, data })

      if (data) {
        console.log("Coooll")

        closeModal()
      }
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
            {allCategories.map((category) => <label key={category.getId}>
              <input
                type="checkbox"
                name="lang"
                value={category.getId}
                onChange={handleChange}
              /> {category.getName}
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

        <Button action={handleSubmit}>
          Sauver
        </Button>
      </Box>
    </section>
  )
}

export default CategoryModalContent