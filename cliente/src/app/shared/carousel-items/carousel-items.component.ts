import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/core/models/carousel.model';
import { CarouselService } from 'src/app/core/services/carousel.service';
@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.scss']
})
export class CarouselItemsComponent implements OnInit {
   itemsCarousel: Carousel[] = [];

  constructor(private _carouselService: CarouselService) {}

  ngOnInit(): void {
    this.getCarousel();

  }
  getCarousel() {
    this._carouselService
      .getCarousel()
      .subscribe((data) => (this.itemsCarousel = data));
  }

}
