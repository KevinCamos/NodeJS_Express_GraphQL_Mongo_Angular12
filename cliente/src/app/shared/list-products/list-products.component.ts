import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService, CategoriesService, Product, Filters, NotificationService, Category } from '../../core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  listCategories: Category[] = [];
  public classList: string = '';
  idCategory: string | null;
  routeFilters: string | null;

  limit: number = 9;
  currentPage: number = 1;
  totalPages: Array<number> = [];
  query: Filters;
  filters = new Filters();
  profile: boolean;

  @Input() set config(filters: Filters) {
    if (filters) {
      this.query = filters;
      this.currentPage = 1;
      this.getListFiltered(this.query);
      this.profile = true;
    }
  }

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
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.idCategory = this.aRouter.snapshot.paramMap.get('category_id'); //obtiene la 'id' del link
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters');//obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    if(this.router.url.split("/")[1] != "profile"){
      this.profile = false;
      this.getListForCategory();
      if (this.idCategory !== null) {
        //Para ejecutar este, necesita una lista, por lo que al entrar más tarde a "get ListForCategory y ver que existe this.idCategory, tras tener datos ejecutará la búsqueda"
      } else if (this.routeFilters !== null) {
        // console.log("son filtros")
        this.refresRouteFilter();
        // console.log(this.filters);
        this.getListFiltered(this.filters);
      } else {
        this.getListFiltered(this.filters);
      }
    }else{
      this.currentPage = 1;
      this.getListFiltered(this.query);
      this.profile = true;
    }
  }

  /**
   * En el caso de que en la función getProducts() localice que 'this.id' no es null,
   * realiza esta función, vuelve a realizar una comprovación ya que la variable al poder
   * ser string o null, no permite usar la variable sin una previa comprobación
   */
  getProductsForCategory() {
    if (this.idCategory !== null) {
      let findCategory = this.listCategories.find(
        (category) => category.slug === this.idCategory
      );
      if (typeof findCategory?.reference == 'number') {
        this.filters.category = findCategory.reference;
      }
      this.getListFiltered(this.filters);
    }
  }

  getListForCategory() {
    this._categoriesService.getListCategory().subscribe(
      (data) => {
        this.listCategories = data;
        this.getProductsForCategory();
      },
      (error) => {
        this.notifyService.showWarning('Ha habido un error en el proceso');
        console.log(error);
      }
    );
  }

  getListFiltered(filters: Filters) {
    this.filters = filters;

    this._productoService.getListFiltered(filters).subscribe(
      (data) => {
        this.listProducts = data.products;
        this.dataIsListProducts(data.products);
        this.totalPages = Array.from(
          new Array(Math.ceil(data.productCount / this.limit)),
          (val, index) => index + 1
        );
        if(this.filters.offset){
          this.currentPage = (this.filters.offset+9) / 9;
        }
        this.cd.markForCheck();
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
    }
    this.listProducts = data; //ListProducts es un objeto Product[]
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;

    if (typeof this.routeFilters === 'string') {
      this.refresRouteFilter();
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }
    this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.getListFiltered(this.filters);
  }

  refresRouteFilter() {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters'); //obtiene la 'id' del link
    if(typeof(this.routeFilters) =="string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
      console.log(this.filters);
    }else{
      this.filters = new Filters();
    }
  }
}
