import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Order, Product /* Filters */ } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class orderService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  buyProduct(slug: any): Observable<Product> {
    return this.apiService.post('order/' + slug);
  }
  getProducts(): Observable<Order> {
    return this.apiService.get('order/');
  }
  /*
  putValoration(order: Order): Observable<any> {
    var params = {};
    params = order;
    // return this.http.put(environment.url + 'order/', order);
    return this.apiService.put('order', new HttpParams({ fromObject: params }));
  } */

  putValoration(order: Order): Observable<Order> {
    var params = {};
    params = order;

    return this.apiService
      .put('order', { order: order })
      .pipe(map((data) => data.article));

    // return this.apiService.put('order/', { order: order }).pipe(
    //   map((data) => {
    //     // Update the currentUser observable

    //     console.log(data);
    //     // this.currentUserSubject.next(data.user);
    //     return data;
    //   })
    // );

    // return this.apiService.put(
    //   'order/val/',
    //   new HttpParams({ fromObject: params })
    // );
  }
}
