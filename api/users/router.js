const express = require("express")

const db = require("../../data/helpers/userDb")
const postDb = require("../../data/helpers/postDb")

const router = express.Router()

router.post("/", async (req, res) => {
  const { name } = req.body
  if (name == null) {
    res.status(400).json({
      message: "Please provide name for the user."
    })
  }
  try {
    const { id } = await db.insert({ name })
    res.status(201).json({ name, id })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error creating the user."
    })
  }
})

router.get("/", async (_req, res) => {
  try {
    const users = await db.get()
    res.status(200).json(users)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the users."
    })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await db.getById(id)
    user == null
      ? res.status(404).json({
          message: `There is no user with id ${id}.`
        })
      : res.status(200).json(user)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the posts."
    })
  }
})

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await db.getById(id)
    const posts = await db.getUserPosts(id)
    user == null
      ? res.status(404).json({
          message: `There is no user with id ${id}.`
        })
      : res.status(200).json(posts)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error finding the posts."
    })
  }
})

const map = fn => xs => xs.map(x => fn(x))

router.delete("/:id", async (req, res) => {
  const { id: user_id } = req.params
  try {
    const user = await db.getById(user_id)
    user == null
      ? res.status(404).json({
          message: `There is no user with id ${user_id}.`
        })
      : db
          .getUserPosts(user_id)
          .then(map(({ id }) => id))
          .then(ids => Promise.all(ids.map(postDb.remove)))
          .then(_ => db.remove(user_id))
          .then(_id => {
            res.status(200).json({
              message: "The user was deleted."
            })
          })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Error deleting the user."
    })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const user = await db.getById(id)
    user == null
      ? res.status(404).json({
          message: `There is no user with id ${id}.`
        })
      : db.update(id, { name }).then(() => {
          res.status(200).json({ name, id })
        })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).json({
      message: "Could not update the user."
    })
  }
})

module.exports = router
