import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Product, UserService, orderService, NotificationService} from '../../core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent {
  constructor(
    private NotificationService: NotificationService,
    private userService: UserService,
    private orderService: orderService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  @Input() product: Product;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleBuy() {
    this.isSubmitting = true;
    // console.log(this.profile.isFollow.toString());
    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          } else if(this.product.status===true){


            return this.orderService.buyProduct(this.product.slug).pipe(
              tap(
                (data) => {
                  console.log("false")
                  console.log("data")
                  this.product.status = false;

                  this.NotificationService.showSuccess(`Enhorabuena, has comprado ${this.product.name}`)



                  this.toggle.emit(true); //Vore si ens fera falta...
                },

              )
            );

            {}
          }else{


            this.NotificationService.showError(`Este producto ya ha sido vendido`)


            return of(null);

          }
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }
}
