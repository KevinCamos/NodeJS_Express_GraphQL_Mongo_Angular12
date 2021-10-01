import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from '../../core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  name: string;
  location: string;
  priceMin: number | undefined;
  priceMax: number;

  filters: Filters;
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  constructor() {}
  public clickEvent(value: any) {
    console.log(value);
  }

  public whatsPrice(priceMin: number, priceMax: number) {
    console.log(typeof priceMin);
    console.log(typeof priceMax);

    if (typeof priceMin == 'number' && typeof priceMax == 'number') {
      console.log(priceMin);
      if (priceMin >= priceMax && priceMax !==0) {
        priceMin = priceMax;
        priceMax = priceMin + 10;
      }

      console.log(priceMax);

      this.priceMin = priceMin;
      this.priceMax = priceMax;
    }
    // if (!priceMax) priceMax = Number.MAX_SAFE_INTEGER;
  }

  public writtingEvent(value: any) {
    this.filters = new Filters();
    this.whatsPrice(value.priceMin, value.priceMax);

    if (value.name) {
      this.filters.name = value.name.length > 2 ? value.name : undefined;
    }
    if (value.location) {
      this.filters.location =
        value.location.length > 2 ? value.location : undefined;
    }

    this.filters.priceMin = this.priceMin ? this.priceMin : undefined;
    this.filters.priceMax = this.priceMax == 0 ? undefined : this.priceMax;


    console.log(this.filters);

    this.searchEmit();
  }
  searchEmit() {
    this.searchEvent.emit(this.filters);
  }
}
