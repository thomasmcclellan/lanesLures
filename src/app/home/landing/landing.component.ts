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
  errorMsg: boolean

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private cartService: CartService) {
   }

  async ngOnInit() {
    if (sessionStorage.getItem('cart')) {
      this.cart = JSON.parse(sessionStorage.getItem('cart'))      
    } else {
      this.cart = []
    }
    this.products =  await this.dataStorageService.getProductData()
    let object2 = sessionStorage.getItem('cart')
    let numInputs = Array.from(document.getElementsByClassName('quantity'))
    
    numInputs.forEach(function (input) {
      input.addEventListener('change', function (e) {
        // console.log('doesn\'t work')
        if ((<HTMLTextAreaElement>e.target).value == '') {
          (<HTMLTextAreaElement>e.target).value = '0'
        }
      })
    })
  }

  onFetchData() {
    return this.dataStorageService.getProductData()
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`)
  }

  onSelected() {
    alert ('Cart has been updated!')
  }

  checkQuantity(key, quantity) {
    if (quantity == null || quantity == 0) {
      this.errorMsg = true
    } else {
      this.addToCart(key, quantity)
    }
  }
  addToCart(key, quantity) {
    if (this.cart.find(item => item.id == key)) { //if there is already an item in the cart of this product, adds quantity to the item
      let index = this.cart.findIndex(item => item.id == key)
      this.cart[index].quantity =  this.cart[index].quantity + parseInt(quantity)
      this.cart[index].thisItemTotal = this.cart[index].quantity * this.cart[index].productPrice
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
      this.errorMsg = false
      this.onSelected()
    } else {
      let newProduct = this.products.find(x => x.id == key) //adds new product to cart
      newProduct.quantity = parseInt(quantity)
      newProduct.thisItemTotal =  newProduct.quantity * newProduct.productPrice  
      this.cart.push(newProduct) // adds product object to cart
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
      this.errorMsg = false
      this.onSelected()
    }

  }
}
