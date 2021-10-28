import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { Order } from 'src/app/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() order: Order;
  @Input() value: number;
  @Input() update: boolean;
  @Output() ratingEvent: EventEmitter<Order> = new EventEmitter();
  starRating: number;

  constructor() {}

  ngOnInit(): void {
    if (this.update) {
      this.starRating =
        typeof this.order.valoration === 'number' ? this.order.valoration : 0;

    }else{
      typeof this.value === 'number' ? this.value : 0;

    }
  }
  getYourValoration() {
    console.log(this.value);

    if(this.update){
      console.log(this.starRating);

      this.order.valoration = this.starRating;

      this.ratingEvent.emit(this.order);
    }

  }

}
