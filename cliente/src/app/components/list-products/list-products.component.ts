import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  public classList: String = '';
  constructor(
    private _productoService: ProductService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {this.getProducts();}
  getProducts() {
    this._productoService.getProducts().subscribe(
      (data) => {
        console.log(data);
        //new Intl.NumberFormat se crea aquí un único objeto con los parámetros predefinidos, para que luego en el for modifique el formato del precio
        let numberFormat = new Intl.NumberFormat('es', {
          style: 'currency',
          currency: 'EUR',
        });

        for (let product in data) {
          data[product].price = numberFormat.format(data[product].price);
        }
        this.listProducts = data; //ListProducts es un objeto Product[]
        console.log(this.listProducts)
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

  ShowList(thisClass:Boolean) {
    this.classList = thisClass?"":"list";
  }
}
