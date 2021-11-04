const conectarDB = require("./config/db");
const cors = require("cors"); //http://www.vidamrr.com/2020/01/que-es-cors-y-como-usarlo-en-nodejs.html
require('dotenv').config({path: 'variables.env'});
const { ApolloServer } = require("apollo-server");
var { AuthenticationError } = require('apollo-server');

conectarDB();

require('./models/product.model');


const typeDefs = require("./graphql/schemas/schema");
const resolvers = require("./graphql/resolvers/resolver");


const request = require('./middleware/requests')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {

    let user = null;
  /*   console.log("Authorization content", req.headers.authorization)
    console.log(typeof( req.headers.authorization)!=="undefined")
    console.log("req.payload",req.payload) */
    // if (req.payload) {
      if (typeof( req.headers.authorization)!=="undefined") {
/*         console.log(req.payload)
 */        //nos conectamos al api rest pasando el token por headers para recojer la informacion de ese user.
        user = await request.get_user_token(req.headers.authorization.split(' ')[1]);

    } // else do nothing and let user be null
    // add the user to the context
    return { user, AuthenticationError };
}
});
server.listen(process.env.PORT, () =>
  console.log(
    `🚀Corriendo aplicación graphQL en http://localhost:${process.env.PORT}/grapqhql`
  )
);
