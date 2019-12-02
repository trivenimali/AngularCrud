import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.css']
})
export class BooksCreateComponent implements OnInit {
  booksForm: FormGroup;
  title: string = '';
  description: string = '';
  author: string = '';
  uid: string;
  userId;
  //price:number;

  constructor(private router: Router, private cs: CrudService,
    private formBuilder: FormBuilder, private toast: ToastrService) {
    /*  this.userId = localStorage.getItem('userUID');
     console.log(this.userId);  */
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {

      uid = user.uid;

    }
    console.log(uid);

    this.userId = localStorage.getItem('uid');

  }

  ngOnInit() {
    this.booksForm = this.formBuilder.group({
      // 'id':[this.uid],
      'id': [localStorage.getItem('userUId')],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      //'price':[null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.cs.postBooks(form)
      .subscribe(res => {
        let id = res['key'];
        //let uid=res['key1'];
        this.router.navigate(['/books']);
      }, (err) => {
        console.log(err);
      });
  }

  toastMessage() {
    this.toast.success("Record added successfully..!");
  }


}
