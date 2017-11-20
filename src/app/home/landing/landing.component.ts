import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ContentService } from '../../services/content.service';
import { Image } from '../../services/content.service';
import * as firebase from 'firebase';
import {style, state, animate, transition, trigger} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  subscription: Subscription
  products: any
  cart
  errorMsg: boolean
  // Defines variables for admins to be able to update images.
  isAdmin = true;
  homeCurrentUpload: Image;
  homeImage1Src: string;
  homeImage2Src: string;
  homeImage3Src: string;
  homeImage4Src: string;
  homeImage5Src: string;
  homeImage6Src: string;
  homeImage7Src: string;
  homeImage8Src: string;
  homeImage9Src: string;
  homeImage10Src: string;
  homeImage11Src: string;
  homeImage12Src: string;
  homeImage13Src: string;
  homeImage14Src: string;
  homeImage15Src: string;
  homeImage1Description: string;
  homeImage2Description: string;
  homeImage3Description: string;
  homeImage4Description: string;
  homeImage5Description: string;
  homeImage6Description: string;
  homeImage7Description: string;
  homeImage8Description: string;
  homeImage9Description: string;
  homeImage10Description: string;
  homeImage11Description: string;
  homeImage12Description: string;
  homeImage13Description: string;
  homeImage14Description: string;
  homeImage15Description: string;
  homeSelectedFile1: FileList;
  homeSelectedFile2: FileList;
  homeSelectedFile3: FileList;
  homeSelectedFile4: FileList;
  homeSelectedFile5: FileList;
  homeSelectedFile6: FileList;
  homeSelectedFile7: FileList;
  homeSelectedFile8: FileList;
  homeSelectedFile9: FileList;
  homeSelectedFile10: FileList;
  homeSelectedFile11: FileList;
  homeSelectedFile12: FileList;
  homeSelectedFile13: FileList;
  homeSelectedFile14: FileList;
  homeSelectedFile15: FileList;
  homeUploadingImage1 = false;
  homeUploadingImage2 = false;
  homeUploadingImage3 = false;
  homeUploadingImage4 = false;
  homeUploadingImage5 = false;
  homeUploadingImage6 = false;
  homeUploadingImage7 = false;
  homeUploadingImage8 = false;
  homeUploadingImage9 = false;
  homeUploadingImage10 = false;
  homeUploadingImage11 = false;
  homeUploadingImage12 = false;
  homeUploadingImage13 = false;
  homeUploadingImage14 = false;
  homeUploadingImage15 = false;
  pic1Hover = false;
  pic2Hover = false;
  pic3Hover = false;
  pic4Hover = false;
  pic5Hover = false;
  pic6Hover = false;



  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private cartService: CartService, private contentService: ContentService) {
    // Pull updated content from Firebase
    this.getContent();
    // If there is a current user with a uid
    if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
      const thisSaved = this;
      // Query Firebase to see if the current user is on the approved Admin list
      firebase.database().ref('/isAdmin').once('value').then(function (isAdminTable) {
        const arrayOfAdmins = isAdminTable.val();
        // If the array of admins includes the current user's uid, set our isAdmin variable to true, otherwise it will be false
        thisSaved.isAdmin = arrayOfAdmins.hasOwnProperty(firebase.auth().currentUser.uid);
        // *Note: Does not work for page refreshes, only first login & redirect.
      });
    }
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










  // Pulls page content from Firebase and assigns it to content based on admin status
  getContent() {
    const thisSaved = this;
    this.contentService.getPageContent('homePage').then(function (pageContent) {
      // Pulls relevant info out of Firebase and assigns it to each specific variable
      thisSaved.homeImage1Src = pageContent.image1.url;
      thisSaved.homeImage2Src = pageContent.image2.url;
      thisSaved.homeImage3Src = pageContent.image3.url;
      thisSaved.homeImage4Src = pageContent.image4.url;
      thisSaved.homeImage5Src = pageContent.image5.url;
      thisSaved.homeImage6Src = pageContent.image6.url;
      thisSaved.homeImage7Src = pageContent.image7.url;
      thisSaved.homeImage8Src = pageContent.image8.url;
      thisSaved.homeImage9Src = pageContent.image9.url;
      thisSaved.homeImage10Src = pageContent.image10.url;
      thisSaved.homeImage11Src = pageContent.image11.url;
      thisSaved.homeImage12Src = pageContent.image12.url;
      thisSaved.homeImage13Src = pageContent.image13.url;
      thisSaved.homeImage14Src = pageContent.image14.url;
      thisSaved.homeImage15Src = pageContent.image15.url;
      thisSaved.homeImage1Description = pageContent.image1.description;
      thisSaved.homeImage2Description = pageContent.image2.description;
      thisSaved.homeImage3Description = pageContent.image3.description;
      thisSaved.homeImage4Description = pageContent.image4.description;
      thisSaved.homeImage5Description = pageContent.image5.description;
      thisSaved.homeImage6Description = pageContent.image6.description;
      thisSaved.homeImage7Description = pageContent.image7.description;
      thisSaved.homeImage8Description = pageContent.image8.description;
      thisSaved.homeImage9Description = pageContent.image9.description;
      thisSaved.homeImage10Description = pageContent.image10.description;
      thisSaved.homeImage11Description = pageContent.image11.description;
      thisSaved.homeImage12Description = pageContent.image12.description;
      thisSaved.homeImage13Description = pageContent.image13.description;
      thisSaved.homeImage14Description = pageContent.image14.description;
      thisSaved.homeImage15Description = pageContent.image15.description;
    });
  }




  // Detects when a new image has been inserted and fills the appropriate variable
  homeDetectImage1(event) {
    this.homeSelectedFile1 = event.target.files;
  }
  homeDetectImage2(event) {
    this.homeSelectedFile2 = event.target.files;
  }
  homeDetectImage3(event) {
    this.homeSelectedFile3 = event.target.files;
  }
  homeDetectImage4(event) {
    this.homeSelectedFile4 = event.target.files;
  }
  homeDetectImage5(event) {
    this.homeSelectedFile5 = event.target.files;
  }
  homeDetectImage6(event) {
    this.homeSelectedFile6 = event.target.files;
  }
  homeDetectImage7(event) {
    this.homeSelectedFile7 = event.target.files;
  }
  homeDetectImage8(event) {
    this.homeSelectedFile8 = event.target.files;
  }
  homeDetectImage9(event) {
    this.homeSelectedFile9 = event.target.files;
  }
  homeDetectImage10(event) {
    this.homeSelectedFile10 = event.target.files;
  }
  homeDetectImage11(event) {
    this.homeSelectedFile11 = event.target.files;
  }
  homeDetectImage12(event) {
    this.homeSelectedFile12 = event.target.files;
  }
  homeDetectImage13(event) {
    this.homeSelectedFile13 = event.target.files;
  }
  homeDetectImage14(event) {
    this.homeSelectedFile14 = event.target.files;
  }
  homeDetectImage15(event) {
    this.homeSelectedFile15 = event.target.files;
  }



  // Uploads a new image
  homeUploadImage1() {
    if (!this.homeImage1Description || !this.homeSelectedFile1) {
      return;
    }
    // Display the upload progress bar for image 1 and no others
    this.homeUploadingImage1 = true;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile1.item(0));
    this.homeCurrentUpload.description = this.homeImage1Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image1', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage1Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage2() {
    if (!this.homeImage2Description || !this.homeSelectedFile2) {
      return;
    }
    // Display the upload progress bar for image 2 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = true;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile2.item(0));
    this.homeCurrentUpload.description = this.homeImage2Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image2', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage2Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage3() {
    if (!this.homeImage3Description || !this.homeSelectedFile3) {
      return;
    }
    // Display the upload progress bar for image 3 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = true;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile3.item(0));
    this.homeCurrentUpload.description = this.homeImage3Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image3', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage3Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage4() {
    if (!this.homeImage4Description || !this.homeSelectedFile4) {
      return;
    }
    // Display the upload progress bar for image 4 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = true;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile4.item(0));
    this.homeCurrentUpload.description = this.homeImage4Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image4', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage4Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage5() {
    if (!this.homeImage5Description || !this.homeSelectedFile5) {
      return;
    }
    // Display the upload progress bar for image 5 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = true;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile5.item(0));
    this.homeCurrentUpload.description = this.homeImage5Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image5', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage5Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage6() {
    if (!this.homeImage6Description || !this.homeSelectedFile6) {
      return;
    }
    // Display the upload progress bar for image 6 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = true;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile6.item(0));
    this.homeCurrentUpload.description = this.homeImage6Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image6', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage6Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage7() {
    if (!this.homeImage7Description || !this.homeSelectedFile7) {
      return;
    }
    // Display the upload progress bar for image 7 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = true;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile7.item(0));
    this.homeCurrentUpload.description = this.homeImage7Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image7', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage7Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage8() {
    if (!this.homeImage8Description || !this.homeSelectedFile8) {
      return;
    }
    // Display the upload progress bar for image 8 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = true;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile8.item(0));
    this.homeCurrentUpload.description = this.homeImage8Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image8', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage8Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage9() {
    if (!this.homeImage9Description || !this.homeSelectedFile9) {
      return;
    }
    // Display the upload progress bar for image 9 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = true;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile9.item(0));
    this.homeCurrentUpload.description = this.homeImage9Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image9', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage9Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage10() {
    if (!this.homeImage10Description || !this.homeSelectedFile10) {
      return;
    }
    // Display the upload progress bar for image 10 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = true;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile10.item(0));
    this.homeCurrentUpload.description = this.homeImage10Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image10', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage10Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage11() {
    if (!this.homeImage11Description || !this.homeSelectedFile11) {
      return;
    }
    // Display the upload progress bar for image 11 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = true;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile11.item(0));
    this.homeCurrentUpload.description = this.homeImage11Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image11', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage11Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage12() {
    if (!this.homeImage12Description || !this.homeSelectedFile12) {
      return;
    }
    // Display the upload progress bar for image 12 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = true;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile12.item(0));
    this.homeCurrentUpload.description = this.homeImage12Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image12', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage12Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage13() {
    if (!this.homeImage13Description || !this.homeSelectedFile13) {
      return;
    }
    // Display the upload progress bar for image 13 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = true;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile13.item(0));
    this.homeCurrentUpload.description = this.homeImage13Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image13', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage13Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage14() {
    if (!this.homeImage14Description || !this.homeSelectedFile14) {
      return;
    }
    // Display the upload progress bar for image 14 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = true;
    this.homeUploadingImage15 = false;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile14.item(0));
    this.homeCurrentUpload.description = this.homeImage14Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image14', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage14Src = newURL.toString();
    });
  }



  // Uploads a new image
  homeUploadImage15() {
    if (!this.homeImage15Description || !this.homeSelectedFile15) {
      return;
    }
    // Display the upload progress bar for image 15 and no others
    this.homeUploadingImage1 = false;
    this.homeUploadingImage2 = false;
    this.homeUploadingImage3 = false;
    this.homeUploadingImage4 = false;
    this.homeUploadingImage5 = false;
    this.homeUploadingImage6 = false;
    this.homeUploadingImage7 = false;
    this.homeUploadingImage8 = false;
    this.homeUploadingImage9 = false;
    this.homeUploadingImage10 = false;
    this.homeUploadingImage11 = false;
    this.homeUploadingImage12 = false;
    this.homeUploadingImage13 = false;
    this.homeUploadingImage14 = false;
    this.homeUploadingImage15 = true;
    // Set file-to-be-uploaded to the file taken from the input fields
    this.homeCurrentUpload = new Image(this.homeSelectedFile15.item(0));
    this.homeCurrentUpload.description = this.homeImage15Description;
    // Upload the file via ContentService function (pageName, whichElement, newImage)
    const thisSaved = this;
    this.contentService.pushUpload('homePage', 'image15', this.homeCurrentUpload).then(function (newURL) {
      // Updates thumbnail image
      thisSaved.homeImage15Src = newURL.toString();
    });
  }






}
