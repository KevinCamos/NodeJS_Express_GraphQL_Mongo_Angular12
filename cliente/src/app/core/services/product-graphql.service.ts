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
    name
    slug
    price
    location
  }
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

  addProduct(product: Product ): Observable<any> {
    console.log(product);
    return this.apollo.mutate({
      mutation: ADD_PRODUCT,
      variables: {
        newProductInput: product
      },
    });
  }
}
