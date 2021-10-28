import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedRoutingModule } from './purchased-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared';
// import { PurchasedComponent } from './purchased.component';

@NgModule({
  declarations: [/* PurchasedComponent */],
  imports: [
    CommonModule,
    PurchasedRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class PurchasedModule {}
