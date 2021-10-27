import { HttpClient /* HttpParams */ } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev'; */
import { Order, Product /* Filters */ } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class orderService {
  constructor(
    /* private http: HttpClient,  */ private apiService: ApiService
  ) {}

  buyProduct(slug: any): Observable<Product> {
    return this.apiService.post('order/' + slug);
  }
  getProducts(): Observable<Order> {
    return this.apiService.get('order/');
  }
}
