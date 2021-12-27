import express from 'express'

const userRouter = express.Router()

userRouter.get("/:id", (req, res) => {
  res.send("hello")
})
userRouter.post("/signup", (req, res) => {})
userRouter.post("/signin", (req, res) => {})
userRouter.patch("/update", (req, res) => {})
userRouter.delete("/delete", (req, res) => {})

export default userRouter