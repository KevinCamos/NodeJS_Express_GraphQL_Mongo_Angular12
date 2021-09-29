import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  productList: Product[] = [];
  regex: RegExp =new RegExp(' ');

  constructor(
    private _productoService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getList(search: string) {
    //modificar a getNamesForProducts
    this._productoService.getNamesForProducts(search).subscribe(
      (data) => {
        this.productList = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public keyEnterEvent(data: any): void {
    // let find = this.codeList.find((x) => x?.name === e.target.value);
    // console.log(find?.id);
    console.log(data.searchValue);

    this.router.navigate(['/shop', '/asd']);
  }

  public writtingEvent(writtingValue: any): void {
    // this.regex = writtingValue;
    // this.productList.filter(product => product == this.regex).length
// console.log(this.productList.filter(product =>console.log(product)))
    console.log(writtingValue);
    this.getList(writtingValue); //probar a partir d'ací
  }
}
