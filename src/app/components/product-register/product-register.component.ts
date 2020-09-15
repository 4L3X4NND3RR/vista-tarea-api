import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {
  action: string;
  title: string;
  form: FormGroup;

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeComponent = this.router.url.split('/');
    if (routeComponent[2] === 'add-product') {
      this.title = 'Crear producto';
      this.action = 'add'
      this.form = this.formBuilder.group({
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
    } else if (routeComponent[2] === 'edit-product') {
      this.title = 'Editar producto';
      this.action = 'edit';
      this.form = this.formBuilder.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
      this.fillFields();
    }
  }

  fillFields() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id: number = +this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(id).subscribe(
        data => {
          this.form.get('id').setValue(data[0].id);
          this.form.get('id').disable({onlySelf: true});
          this.form.get('nombre').setValue(data[0].nombre);
          this.form.get('precio').setValue(data[0].precio);
          this.form.get('creado_por').setValue(data[0].creado_por);
        }
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let product: Product = new Product();
      product.nombre = this.form.get('nombre').value;
      product.precio = this.form.get('precio').value;
      product.creado_por = this.form.get('creado_por').value;
      if (this.action == 'edit') {
        product.id = this.form.get('id').value;
        this.productService.updateProduct(product).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', {
              duration: 3000
            });
            this.router.navigate(['administracion/productos']);
          }, error => {
            console.log(error);
          }
        );
      } else if (this.action == 'add') {
        this.productService.createProduct(product).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', {
              duration: 3000
            });
            this.router.navigate(['administracion/productos']);
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }
}
