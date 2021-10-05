import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProductService, Product, Filters } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  productList: Product[] = [];
  regex: RegExp = new RegExp(' ');
  search: any;
  filters: Filters = new Filters;

  constructor(
    private _productoService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    setTimeout(() => {
      if (writtingValue === this.search) this.getList();
    }, 200);
  }

  public keyEnterEvent(data: any): void {
    // let find = this.codeList.find((x) => x?.name === e.target.value);
    // console.log(find?.id);
    if (typeof data.searchValue === 'string') {
      console.log(data.searchValue);
      this.filters.name = data.searchValue;
      this.router.navigate(['/shop/' + btoa(JSON.stringify(this.filters))]);
    }
  }

  public writtingEvent(writtingValue: any): void {
    // this.regex = writtingValue;
    // this.productList.filter(product => product == this.regex).length
    // console.log(this.productList.filter(product =>console.log(product)))
    this.search = writtingValue;
    this.checkTime(writtingValue); //probar a partir d'ací
  }
}
