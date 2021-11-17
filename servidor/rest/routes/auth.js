// Express-JWT es solo una biblioteca para Express que valida/firma
// tokens web json que se pueden usar con el servidor web express (middleware).

// JsonWebTokens es solo otra implementación de los tokens web json.
var jwt = require("express-jwt");
var secret =process.env.SECRET;

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    algorithms: ["HS256"], //Preguntar a Yolanda, ya que sense açò em fa error
    userProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    algorithms: ["HS256"], //Preguntar a Yolanda, ya que sense açò em fa error
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
