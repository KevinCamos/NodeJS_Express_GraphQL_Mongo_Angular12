import { Component, OnInit } from '@angular/core';
import { ProductService, CategoriesService, Product, NotificationService } from '../../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})

export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  public classList: String = '';
  id: string | null;

  //new Intl.NumberFormat se crea aquí un único objeto con los parámetros predefinidos, para que luego en el for modifique el formato del precio
  private numberFormat = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR',
  });
  constructor(
    private _productoService: ProductService,
    private _categoriesService: CategoriesService,
    private notifyService: NotificationService,
    private aRouter: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('category_id'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    if (this.id !== null) {
      this.getProductsForCategory();
    } else {
      this._productoService.getProducts().subscribe(
        (data) => {
          console.log(data);

          this.dataIsListProducts(data);
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

  /**
   * En el caso de que en la función getProducts() localice que 'this.id' no es null,
   * realiza esta función, vuelve a realizar una comprovación ya que la variable al poder
   * ser string o null, no permite usar la variable sin una previa comprobación
   */
  getProductsForCategory() {
    if (typeof this.id === 'string') {
      console.log('hi ha string!');
      console.log(this.id);
      this._categoriesService.getCategory(this.id).subscribe(
        (data) => {
          this.listProducts = data.products;
          data = data.products;
          console.log(data);
          this.dataIsListProducts(data);
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
/**
 *Esta función recoge los datos obtenidos del servidor, formatea 'price' y lo convierte en this.listProducts
 * @param data
 */
  dataIsListProducts(data: any) {
    for (let i: number = 0; i < data.length; i++) {
      data[i].price = this.numberFormat.format(data[i].price);
      console.log(data[i]);
    }
    this.listProducts = data; //ListProducts es un objeto Product[]
    console.log(this.listProducts);
  }

  ShowList(thisClass: Boolean) {
    this.classList = thisClass ? '' : 'list';
  }
}
