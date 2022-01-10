import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    if (
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
      if (letter === " ") {
        return "_"
      } else if (letter === "'") {
        return "_"
      } else if (letter === "-") {
        return "_"
      } else {
        return letter
      }
    })).join("")

    cb(null, Date.now() + "--" + originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  if(
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

let uploadVideo = multer({storage: storage, fileFilter: fileFilter})

export default uploadVideo
