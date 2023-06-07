const express = require(`express`)
const app = express()

app.use(express.json())

// call transaksiController
let transaksiController = require("../controller/transaksi.controller")

//call authorize
const auth = require(`../auth/auth`)

// endpoint
// app.get("/getdetail",transaksiController.getAlldetail)
app.get("/get", auth.authVerify,transaksiController.getAlltransaksi)
app.post("/add", auth.authVerify,transaksiController.addtransaksi)
app.put("/update/:id", auth.authVerify,transaksiController.updatetransaksi)
app.delete("/delete/:id", auth.authVerify,transaksiController.deletetransaksi)


module.exports = app