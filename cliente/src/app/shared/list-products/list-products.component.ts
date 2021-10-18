import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  ProductService,
  CategoriesService,
  Product,
  Filters,
  NotificationService,
  Category,
} from '../../core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  listCategories: Category[] = [];
  public classList: string = '';
  idCategory: string | null;
  routeFilters: string | null;

  limit: number = 1;
  currentPage: number = 1;
  totalPages: Array<number> = [];
  filters: Filters = new Filters();

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
    private location: Location
  ) {
    this.idCategory = this.aRouter.snapshot.paramMap.get('category_id'); //obtiene la 'id' del link
    this.routeFilters =this.aRouter.snapshot.paramMap.get('filters');//obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.getListForCategory();

    if (this.idCategory !== null) {
      //console.log("Es una categoría")
      //Para ejecutar este, necesita una lista, por lo que al entrar más tarde a "get ListForCategory y ver que existe this.idCategory, tras tener datos ejecutará la búsqueda"
      // this.getProductsForCategory();
      // console.log(this.listCategories)
      // this.filters.category= this.idCategory;
      // this.getListFiltered(this.filters);
    } else if (this.routeFilters !== null) {
      // console.log("son filtros")
      this.refresRouteFilter()     ;

      // console.log(this.filters);
      this.getListFiltered(this.filters);
    } else {
      console.log("default")

      this.currentPage = 1;
      this.getListFiltered((this.filters = new Filters()));
    }
  }

  /**
   * En el caso de que en la función getProducts() localice que 'this.id' no es null,
   * realiza esta función, vuelve a realizar una comprovación ya que la variable al poder
   * ser string o null, no permite usar la variable sin una previa comprobación
   */
  getProductsForCategory() {
    if (this.idCategory !== null) {
      // this.getProductsForCategory();
      /* console.log(this.listCategories);
      console.log(this.idCategory); */
      let findCategory = this.listCategories.find(
        (category) => category.slug === this.idCategory
      );

      if (typeof findCategory?.reference == 'number') {
       /*  console.log(findCategory.reference); */

        this.filters.category = findCategory.reference;
      }
      this.getListFiltered(this.filters);
    }
  }
  getListForCategory() {
    this._categoriesService.getListCategory().subscribe(
      (data) => {
        this.listCategories = data;
        /* console.log(data); */
        this.getProductsForCategory();
      },
      (error) => {
        this.notifyService.showWarning('Ha habido un error en el proceso');
        console.log(error);
      }
    );
  }

  public getListFiltered(filters: Filters) {
    // console.log(btoa(JSON.stringify(filters)));
    this.location.replaceState('/shop/' + btoa(JSON.stringify(filters)));
    //console.log(this.aRouter.snapshot.params.filters);

    this._productoService.getListFiltered(filters).subscribe(
      (data) => {
        /* console.log(data); */
        this.listProducts = data.products;
        this.dataIsListProducts(data.products);

        this.totalPages = Array.from(
          new Array(Math.ceil(data.productCount / this.limit)),
          (val, index) => index + 1
        );
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

  ShowList(thisClass: boolean) {
    this.classList = thisClass ? '' : 'list';
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;

    if (typeof this.routeFilters === 'string') {
     /*  console.log('entra'); */
      this.refresRouteFilter()     ;
      /*  console.log(this.filters); */
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }
   /*  console.log(this.filters); */

    this.getListFiltered(this.filters);
  }

  refresRouteFilter() {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters'); //obtiene la 'id' del link
    if(typeof(this.routeFilters) =="string" ){
      this.filters = JSON.parse(atob(this.routeFilters));

    }else{
      this.filters = new Filters();
    }
  }
}
