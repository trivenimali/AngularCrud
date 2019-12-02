import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import * as firebase from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { MustMatch } from '../must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted: true;
  User;
  errorMessage;
  successMessage;
  emailPattern: string = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

  constructor(private authservice: AuthService, private router: Router, private formBuilder: FormBuilder, private group: ReactiveFormsModule) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({                //created formGroup for registration 
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[^ @]*@[^ @]*")]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      /*  {
         validator: MustMatch('password', 'confirmPassword')
     } */
    );
  }
  get f() {
    console.log(this.registerForm.controls);
    return this.registerForm.controls;
  }

  register() {
    console.log(this, this.registerForm.value);
    this.isSubmitted = true;
    this.authservice.register(this.registerForm.value).then(res => {
      console.log(res);

      const user =
      {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,

      }

      this.authservice.userAdd(res.user.uid, user).then(res => {
        console.log("success");
        this.router.navigate(['/login']);

      });
    },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

}
