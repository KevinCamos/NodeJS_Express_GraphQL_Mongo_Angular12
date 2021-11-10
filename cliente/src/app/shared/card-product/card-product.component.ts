import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() product: Product;
  images: String[] = [];

  constructor() { }

  ngOnInit(): void {  console.log(this.product)

  }

  onToggleFavorite(favorited: boolean) {
    this.product.favorited = favorited;
    if (favorited) {
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
