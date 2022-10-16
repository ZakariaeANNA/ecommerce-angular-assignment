import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Cart } from 'src/app/interface/cart';
import { Product } from 'src/app/interface/product';
import { User } from 'src/app/interface/user';
import { CartService } from 'src/app/service/cart.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {

  cartSubscription : Subscription | undefined ;

  isCartRemovedSuccessful : boolean = false;
  
  isCartUpdatedSuccessful : boolean = false;

  carts : Cart[] = [];

  loggedUser : User = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: ''
  };

  isDataLoaded = false;

  constructor(
    private tokenStorageService : TokenStorageService,
    private cartService : CartService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.tokenStorageService.getUser();
    if(this.loggedUser.id == null){
      this.route.navigateByUrl("/login");
    }else{
      this.cartSubscription = this.cartService.getCartByUser(this.loggedUser.id).subscribe(
        (cartList : any) => {
          this.carts = cartList["carts"];
          this.isDataLoaded = true
          console.log(this.carts)
        }
      )
    }
  }

  onQuantityAddClick(productSelected : Product) : void {
    this.carts.forEach(cart =>{
      cart.products.forEach(product =>{
        if(product.id == productSelected.id){
            product.quantity++
            product.total += product.discountedPrice
            cart.total += product.price
            cart.discountedTotal += product.discountedPrice
            cart.totalQuantity ++;
            if(product.quantity == 0) cart.totalProducts++
        }
      }); 
    }); 
  }

  onQuantityMinusClick(productSelected : Product) : void {
    this.carts.forEach(cart =>{
      cart.products.forEach(product =>{
        if(product.id == productSelected.id && product.quantity > 0){
            product.quantity--
            product.total -= product.discountedPrice
            cart.total -= product.price
            cart.discountedTotal -= product.discountedPrice
            cart.totalQuantity--;
            if(product.quantity == 0) cart.totalProducts--
        }
      }); 
    }); 
  }

  updateCart(cartId : number , products : Product[]) : void{
    this.cartSubscription = this.cartService.updateCart(cartId,products).subscribe(
      (updatedCart: Cart) => {
        this.carts.filter(cart => cart == updatedCart).forEach(cart => cart = updatedCart)
        this.isCartUpdatedSuccessful = true
        console.log(updatedCart);
      }
    );
  }

  removeCart(cartId : number) : void{
    this.cartSubscription = this.cartService.removeCart(cartId).subscribe(
      (removeCart: Cart) => {
        this.carts = this.carts.filter(cart => {
          return cart.id != removeCart.id;
        });
        this.isCartRemovedSuccessful = true;
      }
    );
  }

  goToShippingInfo(cart: Cart) : void{
    this.route.navigateByUrl("/shippinginfo/"+cart.id,{state : {cart : JSON.stringify(cart)}})
  }

  ngOnDestroy(): void {
      this.cartSubscription?.unsubscribe();
  }

}
