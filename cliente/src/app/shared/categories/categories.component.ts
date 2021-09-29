import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, NotificationService } from '../../core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  offset = 0;
  
  constructor(
    private _categoriesServices: CategoriesService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  getCategories() {
    const params = this.getRequestParams(this.offset, 8);

    this._categoriesServices.getCategories(params).subscribe(
      (data) => {
        this.categories = this.categories.concat(data);
        this.offset = this.offset + 8;
      },
      (error) => {
        this.notifyService.showWarning(
          'No hay categorias'
        );
        console.log(error);
      }
    );
  }

  disabled(){
    if(this.offset >= 20){
      return true;
    }
    return false;
  }

  onScroll() {
    this.getCategories();
  }
}
