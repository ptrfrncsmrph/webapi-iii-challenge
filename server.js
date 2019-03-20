const express = require("express")

const postsRouter = require("./api/posts/router")
const usersRouter = require("./api/users/router")

const server = express()

const upperCaseWords = str => str.replace(/\b\w/g, l => l.toUpperCase())

const upperCaseMiddleware = (req, _res, next) => {
  req.body.name = upperCaseWords(req.body.name)
  next()
}

server.use(express.json())
server.use(upperCaseMiddleware)
server.use("/api/posts", postsRouter)
server.use("/api/users", usersRouter)

server.get("/", (_req, res) => {
  res.send(`
    <h1>Hello</h1>
  `)
})

module.exports = server
