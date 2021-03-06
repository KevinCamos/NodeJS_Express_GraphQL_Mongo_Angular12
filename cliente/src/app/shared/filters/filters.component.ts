import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Filters } from '../../core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  name: string;
  locations: string;
  priceMin: number | undefined;
  priceMax: number | undefined;
  ref_category: number;
  routeFilters: string | null;
  filters: Filters;
  filterForm: FormGroup;

  // timer: ReturnType<typeof setTimeout>
  @Input() listCategories: Category[];
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  constructor(
    private aRouter: ActivatedRoute, 
    private fb: FormBuilder,
    private location: Location
  ) {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters');
  }

  public whatsPrice(priceMin: number, priceMax: number) {
    if (typeof priceMin == 'number' && typeof priceMax == 'number') {
      if(priceMin > priceMax){
        this.priceMin = priceMin;
        this.priceMax = undefined;
      }else{
        this.priceMin = priceMin;
        this.priceMax = priceMax;
      }
    }
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

  public changeEvent(value: any) {
    this.routeFilters = this.aRouter.snapshot.paramMap.get('filters');
    if (this.routeFilters) {
      console.log("1");
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
    } else {
      console.log("2");
      this.filters = new Filters();
    }

    this.whatsPrice(value.priceMin, value.priceMax);

    if (value.name) {
      this.filters.name = value.name;
    }
    if (value.locations) {
      this.filters.location = value.locations;
    }
    if (value.ref_category) {
      this.filters.category = value.ref_category;
    }

    this.filters.priceMin = this.priceMin ? this.priceMin : undefined;
    this.filters.priceMax = this.priceMax == 0 || this.priceMax == null ? undefined : this.priceMax;
    // this.filters.category = this.ref_category ? this.ref_category : undefined;
    this.filters.offset = 0;

    this.checkTime(this.filters);
  }
  
  searchEmit() {
    this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.filterEvent.emit(this.filters);
  }
}
