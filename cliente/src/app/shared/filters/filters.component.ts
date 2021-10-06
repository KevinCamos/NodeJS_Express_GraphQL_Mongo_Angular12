import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from '../../core';
import { ActivatedRoute } from '@angular/router';

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
  routeFilters: string | null;

  filters: Filters;

  // timer: ReturnType<typeof setTimeout>
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  constructor(
    private aRouter: ActivatedRoute,
  ) {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters');
  }
  public clickEvent(value: any) {
    //console.log(value);
  }

  public whatsPrice(priceMin: number, priceMax: number) {
    //console.log(typeof priceMin);
    //console.log(typeof priceMax);

    if (typeof priceMin == 'number' && typeof priceMax == 'number') {
      //console.log(priceMin);
      if (priceMin >= priceMax && priceMax !== 0) {
        priceMin = priceMax;
        priceMax = priceMin + 10;
      }

      //console.log(priceMax);

      this.priceMin = priceMin;
      this.priceMax = priceMax;
    }
    // if (!priceMax) priceMax = Number.MAX_SAFE_INTEGER;
  }

  /**
   * Esta función evita un envío e innecesarios envíos de datos al servidor.
   * Cuando el usuario deja de escribir durante un mínimo espacio de tiempo, la función permite enviar los datos de búsqueda.
   * @param filters
   */
  private checkTime(filters: Filters) {
    setTimeout(() => {
      if (filters === this.filters) this.searchEmit();
    }, 200);
  }
  public writtingEvent(value: any) {
    if(this.routeFilters){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
    
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
    //console.log(this.filters);

    this.checkTime(this.filters);
  }
  searchEmit() {
    this.searchEvent.emit(this.filters);
  }
}
