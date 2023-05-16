const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controller/menu.controller`)
const { authorizeAdmin } = require(`../controller/auth.controller`)

app.get("/get", [authorizeAdmin],menuController.getAllMenu)
app.post("/add", [authorizeAdmin],menuController.addMenu)
app.post("/find", menuController.findMenu)
app.put("/update/:id", [authorizeAdmin],menuController.updateMenu)
app.delete("/delete/:id", [authorizeAdmin],menuController.deleteMenu)

module.exports = app