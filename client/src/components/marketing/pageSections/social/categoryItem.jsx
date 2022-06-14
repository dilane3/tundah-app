import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { BsX } from "react-icons/bs"

const style = {
  position: 'relative',
  width: "auto",
  pl: 2,
  py: 1,
  pr: 5,
  mr: 1,
  mb: 1,
  borderRadius: 1,
  backgroundColor: '#f8f8f8',
  boxShadow: "0 1px 3px #ccc"
}

const btnStyleContainer = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  pr: 1,
  "& > svg:hover": {
    cursor: "pointer"
  }
}

const CategoryItem = ({ value, id, onDelete }) => {
  return (
    <Box
      sx={style}
    >
      <Typography>{value}</Typography>

      <Box sx={btnStyleContainer}>
        <BsX size={20} color='red' onClick={() => onDelete(id)} />
      </Box>
    </Box>
  )
}

export default CategoryItem