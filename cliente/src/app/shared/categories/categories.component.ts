import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CategoriesService, Category } from 'src/app/core';

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
        console.log("hola");
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
