import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// Librería FontAwesome para Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// importar formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// importart toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    //declaración de componentes
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
   //modulos que importamos al proyecto
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // Toastr
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [], //servicios
  bootstrap: [AppComponent] //componentes que se van a iniciar
})
export class AppModule {}
