import { createContext } from 'react'

const ModalContext = createContext({
  currentModalName: "",
  currentModalCode: "",
  isOpen: false,
  openModal: (modalName, modalCode) => {},
  closeModal: () => {}
})

export default ModalContext