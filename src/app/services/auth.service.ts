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
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/home']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token
              }
            )
            return
        }
      )
      .catch(
        response => {
          // console.log(response)
          return ('Email or password is incorrect')
        }
      )
    }

  createUser(email: string, password: string) {
   firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res=> {
      this.router.navigate(['/home']);      
      // console.log('user created')
    })
    .catch(res => {
      // console.log('there was an error with login, ', res)
    }) 
  }
  signout() {
    firebase.auth().signOut()
      .then(
        response => {
          this.router.navigate(['/login']);
        }
      )
      .catch(
        response => {
          // console.log(response)
        }
      )
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
        if (user) {resolve(user.uid)}
        else {this.router.navigate(['home'])}
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
      // console.log('true')
      return true
    } else {
      // console.log('false')
      this.router.navigate(['home'])      
      return null;
    }
  }
}