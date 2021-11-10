import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product, Filters } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  searchValue: string | undefined = '';
  productList: Product[] = [];
  regex: RegExp = new RegExp(' ');
  search: any;
  filters: Filters = new Filters();
  routeFilters: string | null;

  constructor(
    private _productoService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private location: Location
  ) {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.filtersForRoute();
    this.searchValue = this.filters.name || undefined;
  }

  getList() {
    //modificar a getNamesForProducts
    this._productoService.getNamesForProducts(this.search).subscribe(
      (data) => {
        this.productList = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Esta función evita un envío e innecesarios envíos de datos al servidor.
   * Cuando el usuario deja de escribir durante un mínimo espacio de tiempo, la función permite enviar los datos de búsqueda.
   * @param filters
   */
  private checkTime(writtingValue: any) {
    let isShop: string = this.router.url.split('/')[1];
    setTimeout(() => {
      if (writtingValue === this.search) {
        if (isShop === 'shop') {
          console.log("search");
          this.notNamefilters();
          this.searchEvent.emit(this.filters);
          this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        }
        if (this.search.length != 0)  this.getList();
      }
    }, 200);
  }

  public keyEnterEvent(data: any): void {
    if (typeof data.searchValue === 'string') {
      this.filters.name = data.searchValue;
      this.filters.offset = 0;
      /* this.searchEvent.emit(this.filters); */
      /* this.location.replaceState('/shop/' + JSON.stringify(this.filters)); */
      this.router.navigate(['/shop/' + btoa(JSON.stringify(this.filters))]);
    }
  }

  public writtingEvent(writtingValue: any): void {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters'); 
    console.log(this.routeFilters);
    this.search = writtingValue;
    this.checkTime(writtingValue);
  }

  /**
   * Función que recoge la ruta encriptada y la decodifica
   */
  public filtersForRoute() {
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
  }

  public notNamefilters() {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters');
    console.log(this.routeFilters);
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
    this.filters.name = this.search;
    this.filters.offset = 0;
  }
}
