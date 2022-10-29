import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { BookSummary } from '../model';
import { LandingService } from './landing.service';
// import { Favorite, HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  // favorites: Favorite[] = [];
  // displayedColumns: string[] = ["name", "car_park_no", "delete"];
  // content?: String;
  
  content?: string;
  email = sessionStorage.getItem("email")
  admin : boolean = false 

  booksList: BookSummary[] = []

  constructor(private httpClientService: HttpClientService, private landingSvc: LandingService, public loginService : AuthenticationService) { }

  // ngOnInit(): void {
  //   this.httpClientService.getFavorites().subscribe(
  //     response => this.handleSuccessfulResponse(response));
  // }
  ngOnInit(): void {

    this.admin = false

    this.callAllBooks()

    // this.httpClientService.getGreeting().subscribe({
    //   next: data => {
    //     this.content = data;
    //   },
    //   error: err => {console.log(err)
    //     if (err.error) {
    //       // this.content = JSON.parse(err.error).message;
    //       this.content = err.error;
    //     } else {
    //       this.content = "Error with status: " + err.status;
    //     }
    //   }
    // });
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



  // ngAfterViewInit(): void {
  //   console.info(">>>>> email" , this.email)
  //   if (this.email == "fred@gmail.com") {
  //     this.admin = true
  //   }
  // }

  // handleSuccessfulResponse(response: any) {
  //   this.favorites = response;
  // }

}
