const express = require("express")

const db = require("../../data/helpers/postDb")

const router = express.Router()

router.post("/", async (req, res) => {
  const { text, user_id } = req.body
  if (text == null || user_id == null) {
    res.status(400).json({
      message: "Please provide text and user_id for the post."
    })
  }
  try {
    const { id } = await db.insert({ text, user_id })
    res.status(201).json({ text, user_id, id })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error creating the post."
    })
  }
})

router.get("/", async (_req, res) => {
  try {
    const posts = await db.get()
    res.status(200).json(posts)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the posts."
    })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await db.getById(id)
    post == null
      ? res.status(404).json({
          message: `There is no post with id ${id}.`
        })
      : res.status(200).json(post)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the post."
    })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await db.getById(id)
    post == null
      ? res.status(404).json({
          message: `There is no post with id ${id}.`
        })
      : db.remove(id).then(_id => {
          res.status(200).json({
            message: "The post was deleted."
          })
        })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the post."
    })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { text } = req.body
  try {
    const post = await db.getById(id)
    post == null
      ? res.status(404).json({
          message: `There is no post with id ${id}.`
        })
      : db.update(id, { text }).then(() => {
          res.status(200).json({ text, id })
        })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Could not update the post."
    })
  }
})

module.exports = router
