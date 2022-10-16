import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product ! : Product;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  discountedPrice(price : number , discountPercentage : number){
    return price - ( price * discountPercentage ) / 100 ;
  }

  goToProductItem() : void {
    this.route.navigateByUrl('/product/'+this.product.id , {state : {product : JSON.stringify(this.product)}});
  }

}
