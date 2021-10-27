import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Order, orderService, User, UserService } from '../core';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.scss'],
})
export class PurchasedComponent implements OnInit {
   orders: Order[] = [];
   currentUser: User;
  // private isUser: boolean;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
}
