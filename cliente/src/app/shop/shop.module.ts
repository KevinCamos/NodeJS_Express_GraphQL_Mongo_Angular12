import { NgModule } from '@angular/core';

import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ShopRoutingModule
  ],
  declarations: [
    ShopComponent
  ],
  providers: [
  ]
})
export class ShopModule { }
