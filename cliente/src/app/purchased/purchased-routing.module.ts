import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { PurchasedComponent } from './purchased.component';
import { PurchasedResolver } from '../core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: PurchasedComponent,
    canActivate: [AuthGuard],
    resolve: {
      order: PurchasedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedRoutingModule {}
