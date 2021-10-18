import { Component, OnInit } from '@angular/core';
import { ProductService, Product, NotificationService } from '../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product: Product = {};
  images: String[] = [];
  public classList: String = '';
  slug: string | null;

  constructor(
    private _productoService: ProductService,
    private notifyService: NotificationService,
    private aRouter: ActivatedRoute,
    private router: Router
  ) {
    this.slug = this.aRouter.snapshot.paramMap.get('slug'); //obtiene la 'slug' del link
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    console.log(this.slug);
    if (typeof this.slug === 'string') {
      this._productoService.getProduct(this.slug).subscribe(
        (data) => {
          this.product = data;
          this.images = data.images;
          console.log(this.images)
        },
        (error) => {
          this.notifyService.showWarning(
            'Este producto no existe',
            'Bualabob informa'
          );
          console.log(error);
          this.router.navigate(['/']);
        }
      );
    } 
  }

  onToggleFavorite(favorited: boolean) {
    this.product.favorited = favorited;
    console.log(this.product.favorited);
    if (favorited) {
      console.log("favorited:" + favorited);
      if (typeof this.product.favorites === 'number') {
        this.product.favorites++;
      }
    } else {
      if (typeof this.product.favorites === 'number') {
        this.product.favorites--;
      }
    }
  }
}
