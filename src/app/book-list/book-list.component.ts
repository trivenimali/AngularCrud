import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

displayedColumns = ['title', 'description', 'author'];
dataSource = new BookDataSource(this.cs);

  constructor(private cs: CrudService, private toast:ToastrService) { }

  ngOnInit() {
   // var user = firebase.auth().currentUser;
   // console.log(localStorage.getItem('userUId'));
    
    var userID;
    userID = localStorage.getItem('userUId');
    
    console.log(userID);
  }
  toastMessage() {
    this.toast.success("Record added successfully..!");
  }


}

export class BookDataSource extends DataSource<any> {

  constructor(private cs: CrudService) {
    super()
  }

  connect() {
    return this.cs.getBooks();
  }

  disconnect() {

  }
}
