import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.fieldname)
    if (
      (file.mimetype).includes('jpeg') || 
      (file.mimetype).includes('png') || 
      (file.mimetype).includes('gif') ||
      (file.mimetype).includes('bmp')
    ) {
      if (file.fieldname === "profil") {
        cb(null, "public/images/profil")
      } else if (file.fieldname === "post") {
        cb(null, "public/images/post")
      }
    }
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname.trim()

    originalname = (Array.from(originalname).map(letter => {
      if (letter !== " ")
        return letter
      else
        return "_"
    })).join("")

    cb(null, Date.now() + "--" + originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log({file})
  if(
    (file.mimetype).includes('jpeg') || 
    (file.mimetype).includes('png') || 
    (file.mimetype).includes('gif') ||
    (file.mimetype).includes('bmp')
  ){
    cb(null, true);
  } else{
    cb(null, false);
  }
};

let uploadImage = multer({storage: storage, fileFilter: fileFilter})

export default uploadImage
