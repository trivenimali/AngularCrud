import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { BooksCreateComponent } from './books-create/books-create.component';
import { BooksEditComponent } from './books-edit/books-edit.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ui 
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from "@angular/material";

//text editor
import {  AngularEditorModule  } from '@kolkov/angular-editor';

//toastMessages
import { ToastrModule } from 'ngx-toastr';
//routing guard
import { AuthGuardGuard } from './auth/auth-guard.guard';
//services
import { AuthService} from './service/auth.service';
import { CrudService} from './service/crud.service';
import { environment } from 'src/environments/environment';
import { BookListComponent } from './book-list/book-list.component';
import { ShowBookComponent } from './show-book/show-book.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/book-list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'book-list',
    component: BookListComponent,

  },
  {
    path: 'show-book',
    component: ShowBookComponent,

  },
  {
    path: 'books',
    component: BooksComponent,
    data: { title: 'Book List' },
    canActivate:[AuthGuardGuard]

  },
  {
    path: 'books-detail/:id',
    component: BooksDetailComponent,
    data: { title: 'Books Details' },
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'books-create',
    component: BooksCreateComponent,
    data: { title: 'Create Books' },
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'books-edit/:id',
    component: BooksEditComponent,
    data: { title: 'Edit Books' },
    canActivate:[AuthGuardGuard]
  },

];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    BooksDetailComponent,
    BooksCreateComponent,
    BooksEditComponent,
    BookListComponent,
    ShowBookComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularEditorModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthGuardGuard,CrudService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
