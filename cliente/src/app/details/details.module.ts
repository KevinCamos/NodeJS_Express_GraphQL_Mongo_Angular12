import { NgModule } from '@angular/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  imports: [
    DetailsRoutingModule,
  ],
  declarations: [
    DetailsComponent
  ],
  providers: [
  ]
})
export class DetailsModule {}
