import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  product: any;
  folder: string;
  // image: any;

  constructor(private dataStorageService: DataStorageService,public router: Router) { }

  ngOnInit() {
    // document.getElementById('file').onchange = function(e) {
    //   var image = (<HTMLInputElement>document.getElementById('file')).files[0]
    //   let image2 = image
    //   console.log(image)
    //   console.log(image2)
      
    // }
  }

  filepick(what) {
    // console.log('trash')
    
  }

  addProduct(form: NgForm) {
    let storageRef = firebase.storage().ref()
    var image
      image = (<HTMLInputElement>document.getElementById('file')).files[0] // gets the file

    const value = form.value
    this.product = {
      name: value.name,
      description: value.description,
      price: value.price
    }
    let key
    let imageURL
    firebase.database().ref(`products`).push(this.product)    // promise that adds product to database 
    .then(res => { //gets the key from the promise
      key = res.key
      return key 
    })
    .then (key => { // uses the key to put the image in storage with a filepath based on the key
      return firebase.storage().ref().child('images/' + key).put(image)
    })
    .then (res => { //gets the firebase URL and pushes it to the object of the product so that it can be accessed by app
      imageURL = res.metadata.downloadURLs[0] // not an error
      firebase.database().ref('products').child(key).update({imageURL: imageURL})
    })    
  }
}
