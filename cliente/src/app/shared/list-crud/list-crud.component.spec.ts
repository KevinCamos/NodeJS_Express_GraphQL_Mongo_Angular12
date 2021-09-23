import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrudComponent} from './list-crud.component';

describe('ListProductsComponent', () => {
  let component: ListCrudComponent;
  let fixture: ComponentFixture<ListCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
