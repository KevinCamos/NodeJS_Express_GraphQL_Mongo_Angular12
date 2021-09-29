import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {},
  },
  {
    path: ':category_id',
    component: ShopComponent,
    resolve: {},
  },
  {
    path: 'search/:search',
    component: ShopComponent,
    resolve: {},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
