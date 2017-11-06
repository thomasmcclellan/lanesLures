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
    this.cart = this.cartService.getCart()
    this.products =  await this.dataStorageService.getProductData()
    let object2 = sessionStorage.getItem('cart')
  }

  onFetchData() {
    return this.dataStorageService.getProductData()
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`)
  }

  onSelected() {
    alert ('Thank you for your order!')
  }

  addToCart(key, quantity) {
    let newProduct = this.products.find(x => x.id == key)
    newProduct.quantity = quantity
    this.cart.push(newProduct) // adds product object to cart
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
  }
}
