import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeComponent }, //al crear una página como componente "ng generate component pages/home", hay que añadirlo aquí!!!! IMPORTANTE!
  { path: 'home', component: HomeComponent }, //al crear una página como componente "ng generate component pages/home", hay que añadirlo aquí!!!! IMPORTANTE!
  { path: 'list-products', component: ListProductsComponent }, //al crear una página como componente "ng generate component pages/home", hay que añadirlo aquí!!!! IMPORTANTE!
  { path: 'create-products', component: CreateProductsComponent }, //al crear una página como componente "ng generate component pages/home", hay que añadirlo aquí!!!! IMPORTANTE!
  { path: 'update-product/:id', component: CreateProductsComponent }, //al crear una página como componente "ng generate component pages/home", hay que añadirlo aquí!!!! IMPORTANTE!
  { path: '404', component: NotFoundComponent }, //El asterisco es la página "default" si no existe la ruta, se coloca al final"
  { path: '**', component: NotFoundComponent }, //El asterisco es la página "default" si no existe la ruta, se coloca al final"
  { path: 'categories', component: CategoriesComponent }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
