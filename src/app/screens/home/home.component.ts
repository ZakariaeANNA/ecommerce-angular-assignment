import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  leatestProducts : Product[] = []
  headerProducts : Product[] = []
  trendingProducts : Product[] = []
  productSubscription : Subscription | undefined ;
  isDataLoaded = false ;

  constructor(
    private productService : ProductService,
    private route : Router  
  ) { }

  ngOnInit(): void {
    this.getLeatestProducts();
    this.getHeaderProducts();
    this.getTrendingProducts();
  }

  getLeatestProducts(){
    this.isDataLoaded = false;
    this.leatestProducts = [];
    this.productSubscription = this.productService.getProductsByLimit(6).subscribe(
      (productList : any) => {
        this.leatestProducts = productList["products"];
        this.isDataLoaded = true;
      }
    )
  }

  getHeaderProducts(){
    this.isDataLoaded = false;
    this.headerProducts = [];
    this.productSubscription = this.productService.getProductsByLimit(3).subscribe(
      (productList : any) => {
        this.headerProducts = productList["products"];
        this.isDataLoaded = true;
      }
    )
  }

  getTrendingProducts(){
    this.isDataLoaded = false;
    this.trendingProducts = [];
    this.productSubscription = this.productService.getProductsByLimit(4).subscribe(
      (productList : any) => {
        this.trendingProducts = productList["products"];
        this.isDataLoaded = true;
      }
    )
  }

  goToProductItem(product : Product) : void {
    this.route.navigateByUrl('/product/'+product.id , {state : {product : JSON.stringify(product)}});
  }

  ngOnDestroy(): void {
      this.productSubscription?.unsubscribe();
  }

}
