import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Librería FontAwesome para Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, CommonModule, ProfileRoutingModule, FontAwesomeModule],
})
export class ProfileModule {}
