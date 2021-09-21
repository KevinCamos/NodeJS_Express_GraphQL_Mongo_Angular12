import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private _categoriesServices: CategoriesService,
    private notifyService: NotificationService // ,               private toastr: ToastrServic
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
