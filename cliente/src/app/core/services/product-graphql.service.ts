import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Product } from '..';

const PRODUCTS = gql`
  query{
    products{
      name
      slug
      status
    }
  }
`;

const PRODUCT = gql`
  query Product($slug: String!){
    product(slug: $slug){
      name
      slug
      status
    }
  }
`;

const ADD_PRODUCT = gql`
mutation addProduct($input: newProductInput) {
  addProduct(product: $input) {
    slug
    name
    description
    status
    id_category
    location
    price
    creationDate
    updateDate
    images
    favorites
    favorited
    author
    comments
  }
}
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: updateProductInput) {
    updateProduct(product: $input) {
      slug
      name
      description
      status
      id_category
      location
      price
      creationDate
      updateDate
      images
      favorites
      favorited
      author
      comments
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($slug: String!) {
    deleteProduct(slug: $slug) 
  }
`;

@Injectable({
  providedIn: 'root',
})

export class GraphqlService {

  constructor(private apollo: Apollo) {}

  getProducts(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PRODUCTS,
    }).valueChanges;
  }
  
  getProduct(slug: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PRODUCT,
      variables: {
        slug: slug,
      },
    }).valueChanges;
  }

  addProduct(product: Product): Observable<any> {

/*     let productLet = { 
      name: "trompeta", 
      description: "trompeta de la marca yamaha nueva a estrenar", 
      id_category: 0, 
      location: "ontinyent", 
      price: 20
    }  */

    let productLet = { 
      name : product.name, 
      description: "trompeta de la marca yamaha nueva a estrenar", 
      id_category: product.id_category, 
      location: product.location, 
      price: product.price 
    } 

    console.log(productLet);

    return this.apollo.mutate({
      mutation: ADD_PRODUCT,
      variables: {
        input: productLet /* no va esto!!!!!!!!!!!!!!!!!!!!!!!!! */
      },
    });
  }

  updateProduct(product: Product): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        input: product
      },
    });
  }

  deleteProduct(slug: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: {
        slug: slug
      },
    });
  }
}
