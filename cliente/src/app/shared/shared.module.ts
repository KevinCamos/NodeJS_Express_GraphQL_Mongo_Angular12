import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoriesComponent } from './categories/categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { CommentsComponent } from './comments/comments.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FollowComponent } from './follow/follow.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
  ],
  declarations: [
    CategoriesComponent,
    ListProductsComponent,
    CardProductComponent,
    CarouselComponent,
    CarouselItemsComponent,
    SearchComponent,
    FiltersComponent,
    ShowAuthedDirective,
    FavoriteComponent,
    FollowComponent,
    CommentsComponent,
  ],
  exports: [
    CategoriesComponent,
    ListProductsComponent,
    CarouselComponent, //Carousel
    CarouselItemsComponent,
    SearchComponent, //Search component
    CommentsComponent,
    FiltersComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ShowAuthedDirective,
    FavoriteComponent,
    FollowComponent
  ],


})
export class SharedModule {}
