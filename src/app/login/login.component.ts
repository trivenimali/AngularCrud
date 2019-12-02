import { Component, OnInit } from '@angular/core'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: true;
  errorMessage;
  successMessage;
  email: string;
  password: string;
  uid: string;
  user: any;


  constructor(private authservice: AuthService, private router: Router,
    private formBuilder: FormBuilder, private firestore: AngularFirestore, private auth: AngularFireAuth) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  login() {
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {

      uid = user.uid;

    }
    console.log(uid);
    console.log(this, this.loginForm.value);
    this.isSubmitted = true;

    //let user = ;
    this.authservice.login(this.loginForm.value).then(res => {
      console.log(res);
      localStorage.setItem('userUId', res.user.uid);

      //console.log(userId);
      this.router.navigate(['books']);
      //     const user=
      //     {
      //     password: this.loginForm.value.password,
      //     email:this.loginForm.value.email
      //     }

      //       this.authservice.userAdd(res.user.uid, user).then(res => {
      //       console.log("success");
      //       this.router.navigate(['/home']);

      // });
    },

      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })

  }



}
