const conectarDB = require("./config/db");
const cors = require("cors"); //http://www.vidamrr.com/2020/01/que-es-cors-y-como-usarlo-en-nodejs.html
require('dotenv').config({path: 'variables.env'});
const { ApolloServer } = require("apollo-server");

conectarDB();

require('./models/product.model');









const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});
server.listen(process.env.PORT, () =>
  console.log(
    `🚀Corriendo aplicación graphQL en http://localhost:${process.env.PORT}/grapqhql`
  )
);
