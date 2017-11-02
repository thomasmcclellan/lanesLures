import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  subscription: Subscription
  products: any
  cart

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private cartService: CartService) {
   }

  async ngOnInit() {
    this.cart = []
    this.subscription = this.cartService.updatedCart.subscribe(
      cart => {
        this.cart = cart
        console.log(this.cart)
      }
    )
    this.products =  await this.dataStorageService.getProductData()
    console.log(this.products)
  }

  onFetchData() {
    // this.products = this.dataStorageService.getProductData()
    console.log(this.products)
    return this.dataStorageService.getProductData()
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`)
  }

  addToCart(key) {
    this.cart.push(this.products.find(x => x.id == key)) // adds product object to cart
    this.cartService.addToTheCart(this.cart)
  }
}
