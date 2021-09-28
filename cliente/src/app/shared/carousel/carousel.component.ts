import { Component, OnInit } from '@angular/core'; //Ens fa falta "onInit?"
import { trigger, transition,useAnimation } from '@angular/animations';

import { Carousel } from 'src/app/core/models/carousel.model';
import { CarouselService } from 'src/app/core/services/carousel.service';
import { fadeIn, fadeOut } from './carousel.animations';
//Tutorial Carousel https://medium.com/showpad-engineering/angular-animations-lets-create-a-carousel-with-reusable-animations-81c0dd8847e8
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  animations: [
    trigger('carouselAnimation', [
   transition("void => *", [useAnimation(fadeIn, {params: { time: '13000ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '13000ms' }})]),
    ]),
  ],

  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  listCarousel: Carousel[] = [];
  // @Output() change: EventEmitter<number> = new EventEmitter<number>();
  counter = 0;

  constructor(private _carouselService: CarouselService) {}

  ngOnInit(): void {
    this.getCarousel();

  }
  /**
   * Obtiene un carousel
   */
  getCarousel() {
    this._carouselService
      .getCarousel()
      .subscribe((data) => (this.listCarousel = data));
  }


  onPreviousClick() {
    const previous = this.counter - 1;
    this.counter = previous < 0 ? this.listCarousel.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.counter);
    setTimeout(() => {
      this.onNextClick()
     }, 1500);
  }

  onNextClick() {
    const next = this.counter + 1;
    this.counter = next === this.listCarousel.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.counter);
  }
}
