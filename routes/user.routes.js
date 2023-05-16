const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controller/user.controller`)
const { authorizeAdmin } = require(`../controller/auth.controller`)

//endpoint
app.get("/get", [authorizeAdmin],userController.getAllUser)
app.post("/add", [authorizeAdmin],userController.addUser)
app.put("/update/:id", [authorizeAdmin],userController.updateUser)
app.delete("/delete/:id", [authorizeAdmin],userController.deleteUser);

module.exports = app