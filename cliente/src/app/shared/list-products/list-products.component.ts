import { Component, OnInit, Input } from '@angular/core';
import {
  ProductService,
  CategoriesService,
  Product,
  Filters,
  NotificationService,
} from '../../core';

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

  limit: number = 1;
  currentPage: number = 1;
  totalPages: Array<number> = [1];
  filters: Filters;

  // new Intl.NumberFormat se crea aquí un único objeto con los parámetros predefinidos, 
  // para que luego en el for modifique el formato del precio
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
    this.idCategory = this.aRouter.snapshot.paramMap.get('category_id'); //obtiene la 'id' del link
    this.idSearch = this.aRouter.snapshot.paramMap.get('search'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.aRouter.snapshot.paramMap.get('category_id'));
    console.log(this.aRouter.snapshot.paramMap.get('search'));
  }

  getProducts() {
    if (this.idCategory !== null) {
      this.getProductsForCategory();
    } else {
      this.setPageTo(1);
    }
  }

  getProductsForCategory() {
    if (typeof this.idCategory === 'string') {
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

  ShowList(thisClass: boolean) {
    this.classList = thisClass ? '' : 'list';
  }

  setPageTo(pageNumber: number){

    this.currentPage = pageNumber;
    this.listProducts = [];
    this.filters = new Filters();

    if(this.limit){
      this.filters.limit = this.limit;
      this.filters.offset = (this.limit*(this.currentPage -1));
    }

    if (typeof this.idSearch === 'string') {
        this.filters.name = this.idSearch;
    }

    this.getFiltersProducts(this.filters);
  }

  getFiltersProducts(filters: Filters){
    this._productoService.getFiltersProducts(filters).subscribe( 
      data => {
        this.listProducts = data.products
        this.dataIsListProducts(data.products);
        this.totalPages = Array.from(new Array(Math.ceil(data.productCount / this.limit)),(val, index) => index + 1);
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
}
