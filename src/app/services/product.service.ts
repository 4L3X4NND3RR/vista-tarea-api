import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/productos';

  constructor(private httpClient: HttpClient) { }

  createProduct(product: Product): Observable<Message> {
    return this.httpClient.post<Message>(this.baseUrl, product);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<Message> {
    return this.httpClient.put<Message>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.baseUrl}/${id}`);
  }
}