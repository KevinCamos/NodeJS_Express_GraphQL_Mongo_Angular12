import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  /**
   * Diccionario, de momento temporal para relacionar con id_category
   */
  dictionaryCategory: { [key: number]: string } = {
    // Vore de com fer una variable única
    0: 'Otros',
    1: 'Electrónicos',
    2: 'Música',
    3: 'Informática',
    4: 'Hogar',
    5: 'Libros',
  };

  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  constructor(
    private _productoService: ProductService,
    private notifyService: NotificationService // ,               private toastr: ToastrServic
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
/**Se obtienen todos los productos de bbdd */
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
/**
 * Se envia una "id" para eliminar el producto en el servidor
 */
  deleteProduct(id: any) {
    this._productoService.deleteProduct(id).subscribe(
      (data) => {
        this.notifyService.showError(
          'El producto se ha eliminado con éxito',
          'Producto eliminado'
        );

        this.getProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
