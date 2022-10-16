import { Component, ElementRef, OnInit, ViewChild , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
  isDataLoaded = false;
  
  productSubscription : Subscription | undefined ;

  cartSubscription : Subscription | undefined ;
  
  isAddProductToCartSuccessful : boolean = false;
  isQuantityGreaterThanZero : boolean = true;
  isStockIsEmpty : boolean = false;
  
  product : Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    total: 0,
    rating: 0,
    stock: 0,
    quantity: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  } ;

  quantity : number = 0;
  
  @ViewChild('image') image: ElementRef | undefined;

  constructor(
    private productService : ProductService,
    private cartService : CartService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productSubscription = this.activatedRoute.paramMap.subscribe(
      (result : any) =>{
        if(window.history.state.product){
          this.product = JSON.parse(window.history.state.product)
        }else{
          this.productService.getProduct(result.params.id).subscribe(
            (productItem) =>{
              this.product = productItem;
              if(this.product.stock == 0) this.isStockIsEmpty = true;
            }
          )
        }
        this.isDataLoaded = true
      }
    )
  }

  discountedPrice(price : number , discountPercentage : number){
    return price - ( price * discountPercentage ) / 100 ;
  }

  changeImage(image: any) : void {
    this.image?.nativeElement.setAttribute('src',image)
  }

  onQuantityAddClick() : void {
    this.quantity++;
  }

  onQuantityMinusClick() : void {
    if(this.quantity > 0)
      this.quantity--;
    else
      this.quantity = 0;
  }

  addToCart() : void {
    if(this.quantity == 0)
      this.isQuantityGreaterThanZero = false;
    else{
      this.isQuantityGreaterThanZero = true;
      this.cartSubscription = this.cartService.saveCart(this.product.id,this.quantity).subscribe(
        (result : any) =>{
          this.product.stock -= this.quantity;
          this.isAddProductToCartSuccessful = true;
        }      
      );
    }
  }
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
}

}
