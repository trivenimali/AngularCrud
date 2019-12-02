import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {
  book={};

  constructor(private route: ActivatedRoute, private router: Router, private cs: CrudService, private toast:ToastrService) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id) {
    this.cs.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

}
