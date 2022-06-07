import { useState } from "react"
import ModalContext from "../context/modalContext"

const ModalProvider = ({ children }) => {
  // Set local state
  const [isOpen, setIsOpen] = useState(false)
  const [currentModalName, setCurrentModalName] = useState("")
  const [currentModalCode, setCurrentModalCode] = useState("")
  const [currentModalData, setCurrentModalData] = useState("")

  // Some handlers
  const handleOpenModal = (modalName, modalCode, modalData) => {
    setCurrentModalName(modalName)
    setCurrentModalCode(modalCode)

    if (modalData)
      setCurrentModalData(modalData)

    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  // Context value
  const contextValue = {
    isOpen,
    currentModalName,
    currentModalCode,
    currentModalData,
    openModal: handleOpenModal,
    closeModal: handleCloseModal
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider