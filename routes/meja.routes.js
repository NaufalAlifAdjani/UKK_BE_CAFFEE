const express = require('express')

const app = express()

app.use(express.json())

const mejaController = require('../controller/meja.controller')
const { authorizeAdmin } = require(`../controller/auth.controller`)

app.get("/get", [authorizeAdmin], mejaController.getAllMeja)

app.post("/add", [authorizeAdmin], mejaController.addMeja)

app.post("/find", mejaController.findMeja)

app.put("/update/:id", [authorizeAdmin], mejaController.updateMeja)

app.delete("/delete/:id", [authorizeAdmin], mejaController.deleteMeja)
module.exports = app