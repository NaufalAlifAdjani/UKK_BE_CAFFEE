const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controller/menu.controller`)
const auth = require(`../auth/auth`)

app.get("/get", menuController.getAllMenu)
app.post("/add", auth.authVerify,menuController.addMenu)
app.post("/find", auth.authVerify,menuController.findMenu)
app.put("/update/:id", auth.authVerify,menuController.updatemenu)
app.delete("/delete/:id", auth.authVerify,menuController.deleteMenu)

module.exports = app