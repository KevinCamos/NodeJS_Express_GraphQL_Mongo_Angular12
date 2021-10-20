import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.dev';
import { Product, Filters } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(environment.url + 'products').pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(environment.url + 'products' + id);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(environment.url + 'products', product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(environment.url + 'products/' + id, product);
  }

  getProduct(slug: string): Observable<any> {
    return this.http.get<Product>(environment.url + 'products/' + slug).pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
  }

  getNamesForProducts(search: string): Observable<any> {
    return this.http.get<Product>(environment.url + 'products/list-search/' + search).pipe(
      map((data) => {
        //console.log(data);
        return data;
      })
    );
  }

  getListFiltered(filters: Filters): Observable <{products: Product[], productCount: number}>{
    var params = {};
    params = filters;
    return this.apiService.get('products', new HttpParams({fromObject:params}));
  }

  favorite(slug: any): Observable<Product> {
    return this.apiService.post('products/' + slug + '/favorite');
  }

  unfavorite(slug: any): Observable<Product> {
    return this.apiService.delete('products/' + slug + '/favorite');
  }
}
