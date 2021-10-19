import { NgModule } from '@angular/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

import { SharedModule } from '../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [DetailsRoutingModule, SharedModule, FontAwesomeModule],
  declarations: [DetailsComponent],
  providers: [],
})
export class DetailsModule {}
