import { Component,OnInit, EventEmitter, Input, Output } from '@angular/core'; //Ens fa falta "onInit?"
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
