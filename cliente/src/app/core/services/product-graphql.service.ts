import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Product } from '..';

const PRODUCTS = gql`
  query {
    products {
      name
      slug
      status
    }
  }
`;

const PRODUCT = gql`
  query getProduct($slug: String!) {
    getProduct(slug: $slug) {
      name
      id_category
      location
      price
      slug
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
    console.log(product.name, typeof product.name);
    console.log(product.id_category, typeof product.id_category);
    console.log(
      Number(product.id_category),
      typeof Number(product.id_category)
    );
    console.log(product.location, typeof product.location);
    console.log(product.price, typeof product.price);

    let productLet = {
      name: product.name,
      /*       description: "trompeta de la marca yamaha nueva a estrenar", */
      id_category: Number(product.id_category),
      location: product.location,
      price: product.price,
    };

    console.log(productLet);

    return this.apollo.mutate({
      mutation: ADD_PRODUCT,
      variables: {
        input: productLet,
      },
    });
  }

  updateProduct(product: Product, slug: String): Observable<any> {

    let productLet = {
      name: product.name,
      /*       description: "trompeta de la marca yamaha nueva a estrenar", */
      id_category: Number(product.id_category),
      location: product.location,
      price: product.price,
      slug: slug
    };

    console.log(productLet);

    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        input: productLet,
      },
    });
  }

  deleteProduct(slug: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: {
        slug: slug,
      },
    });
  }
}
