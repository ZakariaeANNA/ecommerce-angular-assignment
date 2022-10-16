import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interface/cart';
import { Product } from '../interface/product';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient : HttpClient,
    private tokenstorage : TokenStorageService
  ) { }

  getCart(cartId : number) : Observable<Cart>{
    return this.httpClient.get<Cart>(`https://dummyjson.com/carts/${cartId}`); 
  }

  saveCart(productId : number , quantity : number) : Observable<Cart[]>{
    const user = this.tokenstorage.getUser();
    const cartItem = {
      userId: user.id,
      products: [
        {
          id: productId,
          quantity: quantity
        },
      ]
    }
    return this.httpClient.post<Cart[]>('https://dummyjson.com/carts/add',cartItem) ; 
  }

  getCartByUser(userId : number) : Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(`https://dummyjson.com/users/${userId}/carts`); 
  }

  updateCart(cartId : number,products : Product[]) : Observable<Cart>{
    const updatedCart = {
      products: products
    }
    return this.httpClient.put<Cart>(`https://dummyjson.com/carts/${cartId}`,updatedCart); 
  }

  removeCart(cartId : number) : Observable<Cart>{
    return this.httpClient.delete<Cart>(`https://dummyjson.com/carts/${cartId}`); 
  }

}
