import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PurchasedRoutingModule } from './purchased-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PurchasedRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class PurchasedModule {}
