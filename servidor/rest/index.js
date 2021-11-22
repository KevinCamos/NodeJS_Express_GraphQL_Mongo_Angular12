const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors"); //http://www.vidamrr.com/2020/01/que-es-cors-y-como-usarlo-en-nodejs.html
const passport = require('passport');
let client = require('prom-client');

const app = express();

conectarDB();

//app.set ('port', process.env.PORT || 4000)
const port = process.env.PORT || 4000;


const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });


app.use(cors());
app.use(express.json());

/* CARGAMOS MODELS*/
require('./models/user.model');
require('./models/product.model');
require('./models/comment.model');
require('./models/order.model');

/* CARGAMOS CONFIGURACIÓN PASSPORT*/
require('./config/passport');

app.use(require("./routes"));

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.listen(port, "0.0.0.0", () => {
  //app.get('port')
  console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});