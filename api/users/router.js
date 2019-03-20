const express = require("express")

const db = require("../../data/helpers/userDb")

const router = express.Router()

router.post("/", async (req, res) => {
  // const { title, contents } = req.body
  // if (title == null || contents == null) {
  //   res.status(400).json({
  //     message: "Please provide title and contents for the post."
  //   })
  // }
  // try {
  //   const { id } = await db.insert({ title, contents })
  //   res.status(201).json({ title, contents, id })
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({
  //     message: "Error creating the post."
  //   })
  // }
})

router.get("/", async (_req, res) => {
  // try {
  //   const posts = await db.find()
  //   res.status(200).json(posts)
  // } catch (error) {
  //   console.log(JSON.stringify(error, null, 2))
  //   res.status(500).json({
  //     message: "Error finding the posts."
  //   })
  // }
})

router.get("/:id", async (req, res) => {
  // const { id } = req.params
  // try {
  //   const [post] = await db.findById(id)
  //   post == null
  //     ? res.status(404).json({
  //         message: `There is no post with id ${id}.`
  //       })
  //     : res.status(200).json(post)
  // } catch (error) {
  //   console.log(JSON.stringify(error, null, 2))
  //   res.status(500).json({
  //     message: "Error finding the posts."
  //   })
  // }
})

router.delete("/:id", async (req, res) => {
  // const { id } = req.params
  // try {
  //   const [post] = await db.findById(id)
  //   post == null
  //     ? res.status(404).json({
  //         message: `There is no post with id ${id}.`
  //       })
  //     : db.remove(id).then(_id => {
  //         res.status(200).json({
  //           message: "The post was deleted."
  //         })
  //       })
  // } catch (error) {
  //   console.log(JSON.stringify(error, null, 2))
  //   res.status(500).json({
  //     message: "Error finding the posts."
  //   })
  // }
})

router.put("/:id", async (req, res) => {
  // const { id } = req.params
  // const { title, contents } = req.body
  // try {
  //   const [post] = await db.findById(id)
  //   post == null
  //     ? res.status(404).json({
  //         message: `There is no post with id ${id}.`
  //       })
  //     : db.update(id, { title, contents }).then(() => {
  //         res.status(200).json({ title, contents, id })
  //       })
  // } catch (error) {
  //   console.log(JSON.stringify(error, null, 2))
  //   res.status(500).json({
  //     message: "Could not update the post."
  //   })
  // }
})

module.exports = router
