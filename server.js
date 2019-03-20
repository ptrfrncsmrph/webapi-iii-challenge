const express = require("express")

const server = express()

server.use(express.json())

server.get("/", (_req, res) => {
  res.send(`
    <h1>Hello</h1>
  `)
})

module.exports = server
