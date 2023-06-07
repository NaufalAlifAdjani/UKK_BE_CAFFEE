const express = require('express')

const app = express()

app.use(express.json())

const mejaController = require('../controller/meja.controller')
const auth = require(`../auth/auth`)

app.get("/get",  mejaController.getAllMeja)

app.post("/add", auth.authVerify, mejaController.addMeja)

app.post("/find",auth.authVerify, mejaController.findMeja)

app.put("/update/:id",  auth.authVerify,mejaController.updateMeja)

app.delete("/delete/:id",  auth.authVerify,mejaController.deleteMeja)
module.exports = app