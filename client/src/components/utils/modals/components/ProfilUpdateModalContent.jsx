import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../dataManager/context/modalContext"
import Button from "../../../elements/buttons/Button"

const ProfilUpdateModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  // Set local state
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <section>
      <Box className={styles.modalContent}>
        {/* Contenu du modal */}
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

export default ProfilUpdateModalContent