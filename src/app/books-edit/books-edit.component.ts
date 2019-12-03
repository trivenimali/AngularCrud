import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {

booksForm: FormGroup;
id:string = '';
title:string = '';
description:string = '';
author:string = '';
//price:number;

editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Please enter description..',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top',
 /*  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ] */
};

  constructor(private router: Router, private toast:ToastrService,private route: ActivatedRoute, private cs: CrudService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.booksForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
     
    });
  }

  getBook(id) {
    this.cs.getBook(id).subscribe(data => {
      this.id = data.key;
      this.booksForm.setValue({
        title: data.title,
        description: data.description,
        author: data.author
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.cs.updateBooks(this.id, form)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }
  boardsDetails() {
    this.router.navigate(['/books-details', this.id]);
  }

  toastMessage() {
    this.toast.success("Record updated successfully..!");
  }

}
