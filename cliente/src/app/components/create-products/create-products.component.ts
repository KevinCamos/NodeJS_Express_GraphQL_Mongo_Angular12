import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  productForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _productService: ProductService,
    // private toastr:ToastrService,
    private aRouter: ActivatedRoute,
    private notifyService: NotificationService
  ) {
    this.productForm = this.fb.group({
      product: [
        '',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]
      ],
      id_category: ['', Validators.required],
      location: ['', Validators.required],
      price: [
        '',
        [ Validators.required,
          Validators.min(0),
          Validators.max(1000000)]
      ],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id'); //obtiene la 'id' del link
  }

  ngOnInit(): void {
    this.isUpdate();
  }

  addProduct() {
    console.log();
    const PRODUCT: Product = {
      name: this.productForm.get('product')?.value,
      id_category: this.productForm.get('id_category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    };
    if (this.id !== null) {
      console.log(this.id);

      this._productService.updateProduct(this.id, PRODUCT).subscribe(
        (data) => {
          this.notifyService.showInfo(
            'Este producto ha sido modificado',
            'Producto modificado'
          );

          this.router.navigate(['/list-products']);
        },
        (error) => {
          console.log(error);
          this.notifyService.showWarning(
            'Ha habido algún problema y no se ha modificado el producto',
            'Error en update'
          );

          this.productForm.reset(); //reinicia el formulario
        }
      );
    } else {
      this._productService.saveProduct(PRODUCT).subscribe(
        (data) => {
          console.log(data);

          this.notifyService.showInfo(
            'Este producto ha sido guardado con éxito',
            '¡Producto guardado!'
          );

          this.router.navigate(['/list-products']);
        },
        (error) => {
          console.log(error);
          this.productForm.reset();
        }
      );
    }
  }

  isUpdate() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productService.getProduct(this.id).subscribe((data) => {
        this.productForm.setValue({
          product: data.name,
          id_category: data.id_category,
          location: data.location,
          price: data.price,
        });
      });
    }
  }
}
