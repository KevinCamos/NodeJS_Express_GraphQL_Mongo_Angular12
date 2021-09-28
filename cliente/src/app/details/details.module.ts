import { NgModule } from '@angular/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    DetailsRoutingModule,
    SharedModule

  ],
  declarations: [
    DetailsComponent
  ],
  providers: [
  ]
})
export class DetailsModule {}
