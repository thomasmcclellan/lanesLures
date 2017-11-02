import { Subject } from "rxjs/Subject";

export class CartService {
    cart = new Subject<any[]>();
    updatedCart = new Subject<any>();


    addToTheCart(cart) {
        this.cart = cart
        if (this.cart) {this.updatedCart.next(this.cart)}
    }
}