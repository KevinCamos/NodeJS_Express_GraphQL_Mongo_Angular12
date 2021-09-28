import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component'
import { ListProductsComponent } from './list-products/list-products.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        CategoriesComponent,
        ListProductsComponent,
        CarouselComponent,
        CarouselItemsComponent
    ],
    exports: [
        CategoriesComponent,
        ListProductsComponent,
        CarouselComponent, //Carousel
        CarouselItemsComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ]
})
export class SharedModule {}
