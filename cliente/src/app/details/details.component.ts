import { Component, OnInit } from '@angular/core';
import { ProductService, Product, NotificationService } from '../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product: Product ={};
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
    } else {
    }
  }
}
