import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component'
import { ListProductsComponent } from './list-products/list-products.component'

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
        ListProductsComponent
    ],
    exports: [
        CategoriesComponent,
        ListProductsComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ]
})
export class SharedModule {}
