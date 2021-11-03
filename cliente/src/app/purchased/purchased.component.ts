import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import {
  Order,
  orderService,
  User,
  UserService,
  NotificationService,
} from '../core';
@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.scss'],
})
export class PurchasedComponent implements OnInit {
  orders: Order[] = [];
  currentUser: User;
  user:User;
  // private isUser: boolean;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private NotificationService: NotificationService,
    private orderService: orderService
  ) {}

  ngOnInit(): void {
    this.getMyUser()

    console.log(this.ActivatedRoute.data);
    this.ActivatedRoute.data
      .pipe(
        concatMap((data: any) => {
          console.log(data);
          this.orders = data.order;
          console.log(this.orders);
          // console.log(this.orders);
          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              // this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }

  getMyUser() {
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.cd.markForCheck();
    });
  }



  putValoration(dataOrder: Order) {
console.log("entra a putValoration")
    this.orderService.putValoration(dataOrder).pipe(
      tap((data) => {
        console.log(data);
        console.log("data");

        this.NotificationService.showSuccess(
          `Enhorabuena, has valorado ${dataOrder.id_product.name}`
        );
      })
    ).subscribe();
  }
}
