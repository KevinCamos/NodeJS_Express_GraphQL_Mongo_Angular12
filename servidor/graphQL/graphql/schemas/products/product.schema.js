const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: Int!
    slug: String
    name: String!
    description: String
    status: Boolean!
    id_category: Int!
    location: String
    price: Int!
    creationDate: String
    updateDate: String
    id_user: String
    images: [String]
    favorites: Int
    favorited: Boolean
    author: [Int]
    Comment: [Int]
  }
  input newProductInput {
    name: String!
    id_category: Int!
    price: Int!
    location: String!

  }

  type Query {
    products: [Product]
    product(slug: String!): Product
  }

  type Mutation {
    addProduct(product: newProductInput): Product
  }
  
`;
// type Mutation {
//   addProduct(product: newProductInput): Product
// }
module.exports = typeDefs;
