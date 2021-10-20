import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators'; 
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { Product, ProductService, UserService } from '../../core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  @Input() product: Product;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  faHeart  = faHeart;

  toggleFavorite() {
    this.isSubmitting = true;
    
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }
        
        // Favorite the article if it isn't favorited yet
        if (!this.product.favorited) {
          return this.productService.favorite(this.product.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.product.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
