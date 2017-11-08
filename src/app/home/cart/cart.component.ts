import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart
  total

  constructor() { }

  ngOnInit() {
    this.cart = JSON.parse(sessionStorage.getItem('cart'))
    this.total = this.cart.map(item => item.thisItemTotal).reduce((a, b) => a + b, 0)
    // console.log(this.total)
  }

}
