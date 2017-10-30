import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebaseConfig from '../../../firebaseConfig';

@Injectable()
export class AuthService {
  token: string;
  uid: string;

  constructor(private router: Router) {}

  signinUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/home']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token
              }
            )
        }
      )
    }

  signout() {
    firebase.auth().signOut()
      .then(
        response => {
          this.router.navigate(['/login']);
        }
      );
    this.token = null;
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getID() {
    return new Promise((resolve, reject) =>{
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user.uid)
      })
    })    
  }

  isAuthenticated(uid) {
    this.uid = uid
    return this.token != null; 
  }

  getUID() {
    return this.uid
  }

  isAdminAuthenticated(uid) {
    if (uid == firebaseConfig.adminUIDs[0]){ 
      return this.token != null;
    } else {
      return null;
    }
  }
}