const express = require(`express`)
const app = express()

app.use(express.json())

// call transaksiController
let transaksiController = require("../controller/transaksi.controller")

//call authorize
const { authorizeKasir } = require(`../controller/auth.controller`)

// endpoint
app.get("/get", [authorizeKasir],transaksiController.getAlltransaksi)
app.post("/add", [authorizeKasir],transaksiController.addtransaksi)
app.put("/update/:id", [authorizeKasir],transaksiController.updatetransaksi)
app.delete("/delete/:id", [authorizeKasir],transaksiController.deletetransaksi)


module.exports = app