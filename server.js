const express = require("express")

const postsRouter = require("./api/posts/router")
const usersRouter = require("./api/users/router")

const server = express()

server.use(express.json())
server.use("/api/posts", postsRouter)
server.use("/api/users", usersRouter)

server.get("/", (_req, res) => {
  res.send(`
    <h1>Hello</h1>
  `)
})

module.exports = server
