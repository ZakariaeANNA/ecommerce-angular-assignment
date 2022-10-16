import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getProduct(id : number) : Observable<Product>{
    return this.httpClient.get<Product>('https://dummyjson.com/products/'+id) ; 
  }
  getProductsByLimit(limit : number) : Observable<Product[]>{
    const skip = Math.floor(Math.random() * 100); 
    return this.httpClient.get<Product[]>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`); 
  }
  getProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`https://dummyjson.com/products?limit=100`); 
  }
  getProductsByCategory(category : string) : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`https://dummyjson.com/products/category/${category}`); 
  }
  getCategories() : Observable<string[]>{
    return this.httpClient.get<string[]>(`https://dummyjson.com/products/categories`); 
  }
}
