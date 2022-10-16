import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-product-item-sidebar',
  templateUrl: './product-item-sidebar.component.html',
  styleUrls: ['./product-item-sidebar.component.css']
})
export class ProductItemSidebarComponent implements OnInit {

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
