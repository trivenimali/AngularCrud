import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  displayedColumns = ['title', 'description', 'author'];
dataSource = new BookDataSource(this.cs);

  constructor(private cs: CrudService, private toast:ToastrService) { }

  ngOnInit() {
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
