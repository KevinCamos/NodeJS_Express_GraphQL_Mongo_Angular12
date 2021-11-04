# graphql-backend


`OBTENER TODOS LOS PRODUCTOS`
```gql
query{
  products{
    name
    slug
    status
  }
}
```
___
`OBTENER UN PRODUCTO`
```gql

query{
  product(slug:"guitarra-5tvbja"){
    name
    slug
    status
  }
}
```
___
`CREAR UN PRODUCTO`
```gql

mutation addProduct($input: newProductInput) {
  addProduct(product: $input) {
    name
    slug
    price
    
  }
}


{
  "input": {
    "name": "GraphPrueba38",
    "id_category":0,
    "price": 5,
    "loc ation":"Ontinyent"
  }
}
```
