import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const config = {
  apiKey: "AIzaSyCCAfmXUqqBectVBSJzJdOVritkgk5Rge8",
  authDomain: "crudop-9c9be.firebaseapp.com",
  databaseURL: "https://crudop-9c9be.firebaseio.com",
  projectId: "crudop-9c9be",
  storageBucket: "crudop-9c9be.appspot.com",
  messagingSenderId: "3232437873",
  appId: "1:3232437873:web:40847293ea92ad876e6dd0",
  measurementId: "G-KS572ZQGVP"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookSys';
  
  

  ngOnInit() {
    firebase.initializeApp(config);

  }
}
