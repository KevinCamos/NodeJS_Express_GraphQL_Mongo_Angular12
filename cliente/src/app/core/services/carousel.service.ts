import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Carousel } from '../models/carousel.model';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private http: HttpClient) {}

  getCarousel(): Observable<any> {
    return this.http.get<Carousel[]>(environment.url + "carousel")

    ;
  }


}
