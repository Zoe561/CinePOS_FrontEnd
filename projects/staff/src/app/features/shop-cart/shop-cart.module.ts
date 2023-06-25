import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { MatButtonModule } from '@angular/material/button';
import { ShopCartItemComponent } from './components/shop-cart-item/shop-cart-item.component';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';



@NgModule({
  declarations: [
    ShopCartComponent,
    ShopCartItemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ShareLibsModule
  ],
  exports: [
    ShopCartComponent
  ]
})
export class ShopCartModule { }
