import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-checkout',
  templateUrl: './guest-checkout.component.html',
  styleUrls: ['./guest-checkout.component.css']
})
export class GuestCheckoutComponent implements OnInit {
  cart
  constructor() { }

  ngOnInit() {
    this.cart = JSON.parse(sessionStorage.getItem('cart'))
    // console.log('this cart ', this.cart)
  }

}
