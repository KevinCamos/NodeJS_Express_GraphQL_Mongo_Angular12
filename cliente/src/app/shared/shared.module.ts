import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';
import { BuyComponent } from './buy/buy.component';
import { RatingComponent } from './rating/rating.component';
import { FormProductComponent } from './form-product/form-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    NgbModule,
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
    ProfileFavoritesComponent,
    ProfileProductsComponent,
    CommentsComponent,
    BuyComponent,
    RatingComponent,
    FormProductComponent,
  ],
  exports: [
    CategoriesComponent,
    ListProductsComponent,
    CarouselComponent,
    CarouselItemsComponent,
    SearchComponent,
    FiltersComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ShowAuthedDirective,
    FavoriteComponent,
    FollowComponent,
    ProfileFavoritesComponent,
    ProfileProductsComponent,
    CommentsComponent,
    BuyComponent,
    RatingComponent,
    FormProductComponent,
  ],
})
export class SharedModule {}
