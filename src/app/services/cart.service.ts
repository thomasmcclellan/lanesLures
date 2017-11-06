import { Subject } from "rxjs/Subject";

export class CartService {
    cart: any[]
    updatedCart = new Subject<any>();

    constructor () {
        this.cart = []
    }

    updateCart(cart) {
        this.cart = cart
        if (this.cart) {this.updatedCart.next(this.cart)}
    }

    getCart() {
        return this.cart
    }
}