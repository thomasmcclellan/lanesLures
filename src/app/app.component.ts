import { Component } from '@angular/core';
import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  ngOnInit(){
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseURL,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId
    });
    this.onFetchData();
  }

  onNavigate(feature: string) {
    // this.loadedFeature = feature;
  }

  onFetchData() {
    // this.dataStorageService.getData();

  }
}
