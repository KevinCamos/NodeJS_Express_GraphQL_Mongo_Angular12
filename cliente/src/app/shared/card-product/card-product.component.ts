import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product: any;
  constructor() { }

  ngOnInit(): void {
  }

}
