import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop-grid-default',
  templateUrl: './shop-grid-default.component.html',
  styleUrls: ['./shop-grid-default.component.css']
})
export class ShopGridDefaultComponent implements OnInit,OnDestroy {

  products : Product[] = []
  categories : string[] = []
  productSubscription : Subscription | undefined ;
  isDataLoaded = false ;
  category : string = "";
  sortBy : string = "";
  
  page : number = 0;
  count : number = 0;
  pageSize = 12;


  constructor(
    private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe(
      (productList : any) => {
        this.products = productList["products"];
        this.isDataLoaded = true;
      }
    )
    this.productSubscription = this.productService.getCategories().subscribe(
      (categoriesList : any) => {
        this.categories = categoriesList;
        this.isDataLoaded = true;
      }
    )
  }

  searchByCategory() : void{
    this.isDataLoaded = false;
    this.productSubscription = this.productService.getProductsByCategory(this.category).subscribe(
      (productList : any) => {
        this.products = productList["products"];
        this.isDataLoaded = true;
      }
    )
  }

  handlePageChange(event : any) : void {
    this.page = event;
  }

  handlePageSizeChange(event : any) : void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  sortByFilter() : void{
    if(this.sortBy == "price"){
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    }else if(this.sortBy == "discount"){
      this.products.sort((a, b) => {
        return a.discountPercentage - b.discountPercentage;
      });
    }else if(this.sortBy == "rating"){
      this.products.sort((a, b) => {
        return a.rating - b.rating;
      });
    }
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

}
