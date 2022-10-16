import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop-sidebar-default',
  templateUrl: './shop-sidebar-default.component.html',
  styleUrls: ['./shop-sidebar-default.component.css']
})
export class ShopSidebarDefaultComponent implements OnInit,OnDestroy {

  products : Product[] = []
  productsFiltered : Product[] = []
  categories : string[] = []
  productSubscription : Subscription | undefined ;
  isDataLoaded = false ;
  category : string = "";

  priceFilter : string[] = [ 
    "less than 20",
    "20 - 30",
    "30 - 45",
    "45 - 80",
    "80 - 100",
    "100 and Above"
  ]
  discountFilter : string[] = [ 
    "less than 10%",
    "20% - 30%",
    "30% - 45%",
    "45% - 80%",
    "80% - 100%",
  ]
  ratingFilter : number[] = [
    1,2,3,4,5
  ]

  selectedPriceFilter : string[] = [];
  
  page : number = 0;
  count : number = 0;
  pageSize = 4;

  constructor(
    private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe(
      (productList : any) => {
        this.products = productList["products"];
        this.productsFiltered = this.products;
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

  onCategoryFilterCheckboxChange(event: any) {
    const category = event.target.value;
    this.productsFiltered = this.products.filter(product => category == product.category);
  }

  onRatingFilterCheckboxChange(event: any) {
    const rating = event.target.value;
    this.productsFiltered = this.products.filter(product => rating == Math.trunc(product.rating));
  }

  onDiscountFilterCheckboxChange(event: any) {
    if(event.target.value == "less than 10%")
      this.productsFiltered = this.products
            .filter(product => (product.discountPercentage < 10));
    else if(event.target.value == "20% - 30%")
      this.productsFiltered = this.products
            .filter(product => (product.discountPercentage > 20 && product.discountPercentage < 30));
    else if(event.target.value == "30% - 45%")
      this.productsFiltered = this.products
            .filter(product => (product.discountPercentage > 30 && product.discountPercentage < 45));
    else if(event.target.value == "45% - 80%")
      this.productsFiltered = this.products
            .filter(product => (product.discountPercentage > 45 && product.discountPercentage < 80));
    else if(event.target.value == "80% - 100%")
      this.productsFiltered = this.products
            .filter(product => (product.discountPercentage > 80 && product.discountPercentage < 100));
  }

  onPriceFilterCheckboxChange(event: any) {
    if(event.target.value == "less than 2000")
      this.productsFiltered = this.products
            .filter(product => (product.price < 20));
    else if(event.target.value == "2000 - 3000")
      this.productsFiltered = this.products
            .filter(product => (product.price > 20 && product.price < 30));
    else if(event.target.value == "3000 - 4500")
      this.productsFiltered = this.products
            .filter(product => (product.price > 30 && product.price < 45));
    else if(event.target.value == "4500 - 8000")
      this.productsFiltered = this.products
            .filter(product => (product.price > 45 && product.price < 80));
    else if(event.target.value == "8000 - 10000")
      this.productsFiltered = this.products
            .filter(product => (product.price > 80 && product.price < 100));
    else if(event.target.value == "10000 and Above")
      this.productsFiltered = this.products
            .filter(product => (product.price > 100));
  }

  ngOnDestroy(): void {
      this.productSubscription?.unsubscribe();
  }

}
