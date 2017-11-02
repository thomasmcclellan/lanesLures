import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { AuthService } from "./auth.service";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataStorageService {
  constructor(
    private authService: AuthService) {}

    getProductData() {
      return firebase.database().ref('products').once('value')
      .then(data => {
        let products = [];
        let objects = data.val()
        for (let key in objects) {
          products.push({ 
            id: key,
            productName: objects[key].name,
            productImage: objects[key].imageURL,
            productDescription: objects[key].description,
            productPrice: objects[key].price
          })
        }
        console.log('here')
        console.log(products)
        return products
      }
      )
    }
}