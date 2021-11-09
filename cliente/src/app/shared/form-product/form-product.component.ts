import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, GraphqlService, Product, NotificationService } from '../../core'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormProductComponent implements OnInit {
  listProducts: Product[] = [];
  product: Product[] = [];
  productForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  titulo = 'Crear producto';
  slug: string | null;

  constructor(
    private graphqlService: GraphqlService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private aRouter: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      id_category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.slug = this.aRouter.snapshot.paramMap.get('slug');
  }

  ngOnInit() {
    /* this.getProducts();
    this.getProduct(); */
    this.isUpdate();
  }

  getProducts() {
    this.graphqlService.getProducts().subscribe((data) => {
      this.listProducts = data.data.products;
      console.log(this.listProducts);
    });
  }

  getProduct() {
    const slug: string = 'bad-tfo58n';
    this.graphqlService.getProduct(slug).subscribe((data) => {
      this.product = data.data.product;
      console.log(this.product);
    });
  }

  addProduct() {
    const PRODUCT: Product = {
      name: this.productForm.get('name')?.value,
      id_category: this.productForm.get('id_category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    };

    if (this.slug !== null) {
      this.graphqlService.updateProduct(PRODUCT, this.slug).subscribe(
      (data) => {
        this.notifyService.showInfo('Este producto ha sido modificado con éxito', '¡Producto modificado!');
      },
      (error) => {
        console.log(error);
        this.productForm.reset();
        this.notifyService.showWarning('Ha habido algún problema y no se ha modificado el producto', 'Error al modificar');
      });
    }else{
      this.graphqlService.addProduct(PRODUCT).subscribe(
      (data) => {
        this.notifyService.showInfo('Este producto ha sido guardado con éxito', '¡Producto guardado!');
      },
      (error) => {
        console.log(error);
        this.productForm.reset();
        this.notifyService.showWarning('Ha habido algún problema y no se ha creado el producto', 'Error en create');
      });
    }
  }

  isUpdate() {
    console.log(this.slug);
    if (this.slug !== null) {
      const slug: string = this.slug;
      console.log(slug);
      this.titulo = 'Editar producto';
      this.graphqlService.getProduct(slug).subscribe((data) => {
        this.productForm.setValue({
          name: data.data.getProduct.name,
          id_category: data.data.getProduct.id_category,
          location: data.data.getProduct.location,
          price: data.data.getProduct.price,
        });
        console.log(this.productForm);
      });
    }
  }

}