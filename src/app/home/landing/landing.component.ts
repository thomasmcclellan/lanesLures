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
    this.cart = JSON.parse(sessionStorage.getItem('cart'))
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
    if (this.cart.find(item => item.id == key)) { //if there is already an item in the cart of this product, adds quantity to the item
      let oldIndex = this.cart.findIndex(item => item.id == key)
      console.log(this.cart[oldIndex])
      this.cart[oldIndex].quantity =  this.cart[oldIndex].quantity + parseInt(quantity)
      this.cart[oldIndex].thisItemTotal = this.cart[oldIndex].quantity * this.cart[oldIndex].productPrice
      console.log(this.cart[oldIndex])
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
    } else {
      let newProduct = this.products.find(x => x.id == key) //adds new product to cart
      newProduct.quantity = parseInt(quantity)
      newProduct.thisItemTotal =  newProduct.quantity * newProduct.productPrice  
      this.cart.push(newProduct) // adds product object to cart
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
    }

  }
}
