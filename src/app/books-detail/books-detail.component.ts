import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit {
  book={};

  constructor(private route: ActivatedRoute, private router: Router, private cs: CrudService, private toast:ToastrService) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  //get perticular book details
  getBookDetails(id) {
    this.cs.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

  //delete book
  deleteBook(id) {
    this.cs.deleteBooks(id)
      .subscribe(res => {
          this.router.navigate(['books']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  toastMessage() {
    this.toast.success("Record deleted successfully..!");
  }


}
