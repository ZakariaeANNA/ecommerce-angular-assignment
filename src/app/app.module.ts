import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { FaqComponent } from './screens/faq/faq.component';
import { ContactComponent } from './screens/contact/contact.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
import { ShopGridDefaultComponent } from './screens/shop-grid-default/shop-grid-default.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShopSidebarDefaultComponent } from './screens/shop-sidebar-default/shop-sidebar-default.component';
import { ProductItemSidebarComponent } from './components/product-item-sidebar/product-item-sidebar.component';
import { ShoppingCartComponent } from './screens/shopping-cart/shopping-cart.component';
import { ShippingInfoComponent } from './screens/shipping-info/shipping-info.component';
import { OrderCompletedComponent } from './screens/order-completed/order-completed.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    FaqComponent,
    ContactComponent,
    NavigationComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ShopGridDefaultComponent,
    ShopSidebarDefaultComponent,
    ProductItemSidebarComponent,
    ShoppingCartComponent,
    ShippingInfoComponent,
    OrderCompletedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
