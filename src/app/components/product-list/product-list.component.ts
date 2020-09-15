import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'creado_por', 'edit', 'delete', 'star'];
  products: Product[] = [];

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
      }, error => console.log(error));
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe(data => {
      this.snackBar.open(data.mensaje, '', {
        duration: 3000
      });
      this.listProduct();
    });
  }
}
