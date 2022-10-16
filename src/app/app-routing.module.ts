import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { ContactComponent } from './screens/contact/contact.component';
import { FaqComponent } from './screens/faq/faq.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { OrderCompletedComponent } from './screens/order-completed/order-completed.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
import { ShippingInfoComponent } from './screens/shipping-info/shipping-info.component';
import { ShopGridDefaultComponent } from './screens/shop-grid-default/shop-grid-default.component';
import { ShopSidebarDefaultComponent } from './screens/shop-sidebar-default/shop-sidebar-default.component';
import { ShoppingCartComponent } from './screens/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'aboutus',
    component : AboutUsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'shopgriddefault',
    component: ShopGridDefaultComponent
  },
  {
    path: 'shopsidebardefault',
    component: ShopSidebarDefaultComponent
  },
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent
  },
  {
    path: 'shippinginfo/:id',
    component: ShippingInfoComponent
  },
  {
    path: 'ordercompleted',
    component: OrderCompletedComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
