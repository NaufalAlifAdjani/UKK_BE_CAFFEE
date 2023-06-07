const express = require(`express`);
const app = express();
const PORT = 8000;
const cors = require(`cors`);
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require(`./routes/user.routes`)
app.use(`/user`, userRoute);

const menuRoute = require(`./routes/menu.routes`);
app.use(`/menu`, menuRoute);

const mejaRoute = require(`./routes/meja.routes`);
app.use(`/meja`, mejaRoute);

const transaksiRoute=require(`./routes/transaksi.routes`);
app.use(`/transaksi`, transaksiRoute);

const auth = require(`./routes/auth.routes`)
app.use(`/auth`, auth)



app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server of Hotel runs on port${PORT}`);
});