import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, NotificationService } from '../../core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private _categoriesServices: CategoriesService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesServices.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        this.notifyService.showWarning(
          'No hay categorias'
        );
        console.log(error);
      }
    );
  }
}
