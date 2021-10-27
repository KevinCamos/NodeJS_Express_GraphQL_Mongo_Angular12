import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Order ,orderService} from '..';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchasedResolver implements Resolve<Order> {
  constructor(
    private orderService: orderService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.orderService.getProducts()
      .pipe(catchError((err) => this.router.navigateByUrl('/')));


  }
}
