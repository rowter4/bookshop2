import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { BookSummary } from '../model';
import { LandingService } from './landing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksListDialog } from './dialog/landing-dialog.component';
import { filter } from 'rxjs';
// import { Favorite, HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  
  // content?: string;
  email = sessionStorage.getItem("email")
  admin : boolean = false 
  name : any = "{}"

  booksList: BookSummary[] = []
  filteredList: BookSummary[] = []
  _filteredText !: string



  constructor(private httpClientService: HttpClientService, private landingSvc: LandingService, 
              public loginService : AuthenticationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin = false
    this.callAllBooks()
    this.getNameofUser()
    this.filteredList = this.booksList
  }

  get filterText() {
    return this._filteredText
  }

  set filterText(value:string) {
    this._filteredText = value
    this.filteredList = this.filterBooks(value)
  }

  callAllBooks() {
    this.landingSvc.getDetails()    
      .then(result => {
        console.info('>>> all books list result : ', result)
        this.booksList = result
        
      })
      .catch(error => {
        console.error('>>>> error from books list : ', error)
      })
  }

  getNameofUser() {
    this.landingSvc.getName()    
      .then(result => {
        console.info('>>> get name of user result : ', result)
        this.name = result;
        
      })
      .catch(error => {
        console.error('>>>> error from name of user : ', error)
      })
  }

  openDialog(bookTitle: string, book_id: number): void {
    
    let dialogRef = this.dialog.open(BooksListDialog, {
      height: '200px',
      width: '300px',
      data: { title: bookTitle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Dialog result: ${result}`);

        console.log(`Book Id that is being read result: ${book_id}`);

        this.landingSvc.deleteBook(book_id)    
          .then(result => {
            console.info('>>> deleted book resource result : ', result)
            this.ngOnInit()
            // this.name = result;
            
          })
          .catch(error => {
            console.error('>>>> delete book resource of user : ', error)
          })


      }
        
    });
  }

  filterBooks(filteredTerm: string) {
    if (this.booksList.length == 0 || filteredTerm === '') {
        return this.booksList
    } else {
      return this.booksList.filter( book => {
        return book.title.toLowerCase() === filteredTerm.toLowerCase()
      })
    }
  }


}
