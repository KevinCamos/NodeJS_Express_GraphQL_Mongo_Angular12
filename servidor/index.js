const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors"); //http://www.vidamrr.com/2020/01/que-es-cors-y-como-usarlo-en-nodejs.html

const app = express();

conectarDB();

//app.set ('port', process.env.PORT || 4000)
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/**
 * Para ir al router.post/get.. de un objeto, se utiliza require('./carpetarouter')
 */
require("./routes"); //es dirigeix a la carpeta routes!
app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

app.listen(port, "0.0.0.0", () => {
  //app.get('port')
  console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});