const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: String
    slug: String
    name: String!
    description: String
    status: Boolean!
    id_category: Int!
    location: String
    price: Int!
    creationDate: String
    updateDate: String
    images: [String]
    favorites: Int
    favorited: Boolean
    author: String
    Comment: [String]
  }
  type Delete {
    data: Boolean
  }
  input newProductInput {
    name: String
    description: String
    id_category: Int
    location: String
    price: Int
    creationDate: String
    updateDate: String
    images: [String]
  }


  input updateProductInput {
    slug: String!
    name: String
    description: String
    id_category: Int
    location: String
    price: Int
    creationDate: String
    updateDate: String
    images: [String]
  }
  type Query {
    getProducts: [Product]
    getProduct(slug: String!): Product
  }

  type Mutation {
    addProduct(product: newProductInput): Product
    updateProduct(product: updateProductInput): Product
    deleteProduct(slug: String!): Boolean
  }
  
`;
// type Mutation {
//   addProduct(product: newProductInput): Product
// }
module.exports = typeDefs;
