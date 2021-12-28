import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      (file.mimetype).includes('jpeg') || 
      (file.mimetype).includes('png') || 
      (file.mimetype).includes('gif') ||
      (file.mimetype).includes('bmp')
    ) {
      cb(null, "public/images")
    } else if (
      (file.mimetype).includes('mp4') || 
      (file.mimetype).includes('mkv') || 
      (file.mimetype).includes('x-msvideo') ||
      (file.mimetype).includes('mpeg') ||
      (file.mimetype).includes('webm')
    ) {
      cb(null, "public/videos")
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
    (file.mimetype).includes('bmp') ||
    (file.mimetype).includes('mp4') || 
    (file.mimetype).includes('mkv') || 
    (file.mimetype).includes('x-msvideo') ||
    (file.mimetype).includes('mpeg') ||
    (file.mimetype).includes('webm')
  ){
    cb(null, true);
  } else{
    cb(null, false);
  }
};

let upload = multer({storage: storage, fileFilter: fileFilter})

export default upload
