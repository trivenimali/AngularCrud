import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'
import { AuthService } from '../service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  ref = firebase.firestore().collection('books');
  ref1 = firebase.firestore().collection('users');

  constructor(private authService: AuthService, private firestore: AngularFirestore) {
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {

      uid = user.uid;

    }
    console.log(user);
  }

//get details of books
  getBooks(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let books = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(data);
          
          books.push({
            key: doc.id,
            uid: data.id,
            title: data.title,
            description: data.description,
            author: data.author
          });
        });
        observer.next(books);
      });
    });
  }

  //function for showing details of a book
  getBook(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          uid: data.uid,
          title: data.title,
          description: data.description,
          author: data.author
        });
      });
    });
  }

  //adding books
  postBooks(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
          uid: data.id,
        });
      });
    });
  }

 
//updating book details
  updateBooks(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  //deleting book 
  deleteBooks(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
