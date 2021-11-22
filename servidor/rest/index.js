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

const counterHomeEndpoint = new client.Counter({
  name: 'counterHomeEndpoint',
  help: 'The total number of processed requests'
});

const counterMessageEndpoint = new client.Counter({
  name: 'counterMessageEndpoint',
  help: 'The total number of processed requests to get endpoint'
});


app.use(cors());
app.use(express.json());

/* CARGAMOS MODELS*/
require('./models/user.model');
require('./models/product.model');
require('./models/comment.model');
require('./models/order.model');

/* CARGAMOS CONFIGURACIÓN PASSPORT*/
require('./config/passport');

const gauge = new client.Gauge({ name: 'metric_name', help: 'metric_help' });

/**
 * Para ir al router.post/get.. de un objeto, se utiliza require('./carpetarouter')
 */
/* require("./routes"); //es dirigeix a la carpeta routes! */
app.get('/', (req, res) => {
  console.log(`Bienvenido a Bualabob`);
  counterHomeEndpoint.inc();
  gauge.inc(); // Increment 1


})
app.get('/message', (req, res) => {
  counterMessageEndpoint.inc();
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.listen(port, "0.0.0.0", () => {
  //app.get('port')
  console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});