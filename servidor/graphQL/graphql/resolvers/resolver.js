var { merge }  = require('lodash');

// const QueryResolvers = {
//   Query: {
//       message: () => 'Hello World!',
//       authenticationError: () => {
//         throw new AuthenticationError('must authenticate');
//       }
//   }
// }

var ProductResolvers = require('./products/product.resolver');

const resolvers = merge(
  // QueryResolvers,
  ProductResolvers
);

module.exports = resolvers;
