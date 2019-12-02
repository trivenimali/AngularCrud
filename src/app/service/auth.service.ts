import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router, private firestore: AngularFirestore) { }

  isLoggedIn(): boolean {
    return false;
  }
  register(value) {
    console.log(value);
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  userAdd(uid, value) {
    return this.firestore.collection('users').doc(uid).set(value);
  }


  login(value) {
    console.log(value);
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);


  }
}
