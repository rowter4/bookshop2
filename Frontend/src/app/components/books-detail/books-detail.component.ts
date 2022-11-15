import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetail } from '../model';
import { BooksDetailService } from './books-detail.service';
import { CartService } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})


export class BooksDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private booksDetailSvc: BooksDetailService,
              private router : Router, private cartSvc: CartService, 
              private snackBar: MatSnackBar) { }

  bookID!: string
  rating!: any
  rating2!: string
  index!: number
  genreList !: any
  
  bookDetailFromId: BookDetail = {
    genre: "",
    title: "",
    edition: "",
    authors: "",
    format: "",
    description: "",
    price: 0,
    pages: 0,
    rating: '',
    book_id: 0,
    username: '',
    bookTitle: '',
    pic: new Blob()
    
  }
  

  ngOnInit(): void {
    this.bookID = this.activatedRoute.snapshot.params['book_id']
    
    console.info("Book id being passed: ", this.bookID)
    this.booksDetailSvc.getBookDetailById(this.bookID)
      .then(result => {
        console.info("result from calling the individual Id: ", result)
        this.bookDetailFromId = result
        this.rating = result.rating.toString().substring(0, 4)
        this.genreList = result.genre.split("|"); 

        console.log("substring thing", this.rating.toString().substring(0, 5))
        console.info("genre Obtained : ", this.genreList)
        
      })
      .catch(error => {
        console.info("error getting detail from Id : ", error)
      })

    
  }


  navigateBack() {
    this.router.navigate([''])
  }

  addItem() {
    console.info(">>>> add to cart button pressed")
    this.cartSvc.addToCart(this.bookDetailFromId)
    this.snackBar.open('Item Added to Cart', 'Close', {
      duration: 2000
    });
  }

}
