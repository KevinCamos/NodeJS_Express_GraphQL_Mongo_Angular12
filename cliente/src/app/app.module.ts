import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { ListCrudComponent } from './components/list-crud/list-crud.component';
import { CategoriesComponent } from './components/categories/categories.component';

// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// Librería FontAwesome para Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// importar formularios
import { ReactiveFormsModule } from '@angular/forms';
// importart toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListProductsComponent } from './components/list-products/list-products.component';

@NgModule({
  declarations: [
    //declaración de componentes
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CreateProductsComponent,
    ListCrudComponent,
    CategoriesComponent,
    ListProductsComponent,
  ],
  imports: [
    //modulos que importamos al proyecto
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    // FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // módulo de animaciones requerido
    ToastrModule.forRoot(),
  ],
  providers: [], //servicios
  bootstrap: [AppComponent], //componentes que se van a iniciar
})
export class AppModule {}
