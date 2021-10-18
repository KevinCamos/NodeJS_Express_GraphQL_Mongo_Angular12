import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
// Librería FontAwesome para Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProfileRoutingModule, FontAwesomeModule],
})
export class ProfileModule {}
