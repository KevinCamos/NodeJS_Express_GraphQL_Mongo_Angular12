import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
      return this.http.get(environment.url);
    }

    deleteProduct(id: string):Observable<any> {
      return this.http.delete(environment.url + id);
    }

    saveProduct(product: Product):Observable<any> {
      return this.http.post(environment.url, product);
    }

    getProduct(id: string):Observable<any> {
      return this.http.get(environment.url + id);
    }

    updateProduct(id: string, product: Product):Observable<any> {
      return this.http.put(environment.url + id, product);
    }

  }
