import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Category } from '../models/categories.model';
@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(params: any): Observable<any> {
    return this.http.get<Category[]>(environment.url+"categories", {params});
  }

  getListCategory(): Observable<any> {
    return this.http.get<Category[]>(environment.url+"categories/list-categories");
  }

  getCategory(slug: string): Observable<any> {
    console.log(environment.url + "categories/" + slug);
    return this.http.get<Category>(environment.url + "categories/" + slug);
  }

}
