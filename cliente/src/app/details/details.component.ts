import { Component, OnInit } from '@angular/core';
import { ProductService, Product, NotificationService } from '../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  details: Product[] = [];
  public classList: String = '';
  slug: string | null;

  constructor(
    private _productoService: ProductService,
    private notifyService: NotificationService,
    private aRouter: ActivatedRoute,
  ) { 
    this.slug = this.aRouter.snapshot.paramMap.get('slug'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    console.log(this.slug);
    if (typeof this.slug === 'string') {
      this._productoService.getProduct(this.slug).subscribe(
        (data) => {
          console.log(data);
          this.details = data;
        },
        (error) => {
          this.notifyService.showWarning(
            'Ha habido un error en el proceso',
            'Producto eliminado'
          );
          console.log(error);
        }
      );
    }
  }
}
