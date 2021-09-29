import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CategoriesComponent } from './categories/categories.component'
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductComponent } from './card-product/card-product.component'
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { SearchComponent } from './search/search.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule
    ],
    declarations: [
        CategoriesComponent,
        ListProductsComponent,
        CardProductComponent,
        CarouselComponent,
        CarouselItemsComponent,
        SearchComponent
    ],
    exports: [
        CategoriesComponent,
        ListProductsComponent,
        CarouselComponent, //Carousel
        CarouselItemsComponent,
        SearchComponent, //Search component, hi ha que ficar-ho ací?
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ]
})
export class SharedModule {}
