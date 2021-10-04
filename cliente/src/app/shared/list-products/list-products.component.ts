import { Component, OnInit } from '@angular/core';
import {
  ProductService,
  CategoriesService,
  Product,
  Filters,
  NotificationService,
} from '../../core';
import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  public classList: string = '';
  idCategory: string | null;
  idSearch: string | null;
  filters: Filters;
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
    private router: Router,
    private location: Location
  ) {
    this.idCategory = this.aRouter.snapshot.paramMap.get('category_id'); //obtiene la 'id' del link
    this.idSearch = this.aRouter.snapshot.paramMap.get('search'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    console.log(this.idCategory);
    console.log(this.idSearch);

    this.getProducts();
  }
  getProducts() {
    let filters = this.aRouter.snapshot.paramMap.get('filters');
    console.log(filters);
    if (this.idCategory !== null) {
      this.getProductsForCategory();
    } else if (this.idSearch !== null) {
      this.getProductsForSearch();
    } else if (filters) {
      this.filters = JSON.parse(atob(filters));
      // Object.assign(this.filters, JSON.parse(atob(filters)));
      console.log(this.filters);
      this.getListFiltered(this.filters)

    } else {
      this.getAllProducts();
    }
  }

  getAllProducts() {
    this._productoService.getProducts().subscribe(
      (data) => {
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
  /**
   * En el caso de que en la función getProducts() localice que 'this.id' no es null,
   * realiza esta función, vuelve a realizar una comprovación ya que la variable al poder
   * ser string o null, no permite usar la variable sin una previa comprobación
   */
  getProductsForCategory() {
    if (typeof this.idCategory === 'string') {
      console.log('hi ha string!');
      console.log(this.idCategory);
      this._categoriesService.getCategory(this.idCategory).subscribe(
        (data) => {
          this.listProducts = data.products;
          console.log(data.products);
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

  getProductsForSearch() {
    if (typeof this.idSearch === 'string') {
      // console.log('hi ha string!');
      console.log(this.idSearch);
      this._productoService.getSearchProducts(this.idSearch).subscribe(
        (data) => {
          console.log(data);
          this.listProducts = data;
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
  getListFiltered(filters: Filters) {
    console.log(filters);
    console.log(btoa(JSON.stringify(filters)));
    this.location.replaceState('/shop/filters/' + JSON.stringify(filters));
    console.log(this.aRouter.snapshot.params.filters);

    this.location.replaceState(
      '/shop/filters/' + btoa(JSON.stringify(filters))
    );
    console.log(this.aRouter.snapshot.params.filters);

    this._productoService.getListFiltered(filters).subscribe(
      (data) => {
        console.log(data);
        this.listProducts = data;
        console.log(data);
        this.dataIsListProducts(data);
      },
      (error) => {
        this.notifyService.showWarning(
          'Ha habido un error en el proceso',
          'Lo sentimos mucho'
        );
        console.log(error);
      }
    );
  }
  /**
   *Esta función recoge los datos obtenidos del servidor, formatea 'price' y lo convierte en this.listProducts
   * @param data
   */
  dataIsListProducts(data: any) {
    for (let i: number = 0; i < data.length; i++) {
      data[i].price = this.numberFormat.format(data[i].price);
      // console.log(data[i]);
    }
    this.listProducts = data; //ListProducts es un objeto Product[]
  }

  /**Esta función sirve para modificar la forma de ver los productos*/
  ShowList(thisClass: boolean) {
    this.classList = thisClass ? '' : 'list';
  }
}
