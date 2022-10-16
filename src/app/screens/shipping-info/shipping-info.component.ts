import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/interface/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit,OnDestroy {

  cartSubscription : Subscription | undefined ;

  isDataLoaded : boolean = false;

  cart : Cart = {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0
  }

  constructor(
    public route : Router,
    private activatedRoute : ActivatedRoute,
    private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.activatedRoute.paramMap.subscribe(
      (result : any) =>{
        if(window.history.state.product){
          this.cart = JSON.parse(window.history.state.cart)
        }else{
          this.cartService.getCart(result.params.id).subscribe(
            (cartItem : any) =>{
              this.cart = cartItem;
            }
          )
        }
        this.isDataLoaded = true
      }
    )
  }

  goToCheckout() : void {
    this.route.navigateByUrl("/ordercompleted")
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

}
