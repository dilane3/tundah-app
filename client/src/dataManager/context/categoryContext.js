import { createContext } from "react";

const CategoryContext = createContext({
  open: false,
  closeModal: () => {},
  openModal: () => {}
})

export default CategoryContext