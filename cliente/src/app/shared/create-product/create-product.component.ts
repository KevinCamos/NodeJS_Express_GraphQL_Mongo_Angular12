import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, GraphqlService, Product, NotificationService } from '../../core'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateProductComponent implements OnInit {
  listProducts: Product[] = [];
  product: Product[] = [];
  productForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  titulo = 'Crear producto';
  
  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService
  ) {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      id_category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    /* this.getProducts();
    this.getProduct(); */
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
      name: this.productForm.get('product')?.value,
      id_category: this.productForm.get('id_category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    };

    console.log(PRODUCT);

    this.graphqlService.addProduct(PRODUCT).subscribe(
    (data) => {
      console.log(data);
      /* this.listProducts = data.data.product;
      console.log(this.listProducts); */
      this.notifyService.showInfo('Este producto ha sido guardado con éxito', '¡Producto guardado!');
    },
    (error) => {
      console.log(error);
      this.productForm.reset();
      this.notifyService.showWarning('Ha habido algún problema y no se ha creado el producto', 'Error en create');
    });
  }

}