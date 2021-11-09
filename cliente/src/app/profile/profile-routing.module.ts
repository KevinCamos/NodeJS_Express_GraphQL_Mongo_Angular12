import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileFavoritesComponent, ProfileProductsComponent, FormProductComponent } from '../shared' 

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        component: ProfileProductsComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      },
      {
        path: 'newProduct',
        component: FormProductComponent
      },
      {
        path: 'updateProduct/:slug',
        component: FormProductComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
