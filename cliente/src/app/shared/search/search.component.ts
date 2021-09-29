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

  constructor(
    private _productoService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._productoService.getProducts().subscribe(
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

    this.router.navigate(['/shop',"/asd"])
  }

  public writtingEvent(writtingValue: any): void {
    console.log(writtingValue);
  }
}
