import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AddNewItemsService } from './add-new-items.service';
import { AddNewItem } from './add-new-items.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetail } from '../model';

@Component({
  selector: 'app-add-new-items',
  templateUrl: './add-new-items.component.html',
  styleUrls: ['./add-new-items.component.css']
})
export class AddNewItemsComponent implements OnInit {

  @ViewChild('bookPhotoUpload')
  bookPhotoUpload!: ElementRef
  
  constructor(private fb: FormBuilder, private addNewItemsSvc: AddNewItemsService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  itemForm!: FormGroup
  user = JSON.parse(sessionStorage.getItem('username') || '{}');
  book_id = this.activatedRoute.snapshot.paramMap.get("book_id")

  ngOnInit(): void {
    if (!this.book_id) {
      this.itemForm = this.intialiseForm()
    } else {
      this.getBookDetailsFromBookId(this.book_id)  // this branch is not used
    }

    console.info(">>>>> book ID is : ", this.book_id)
    
  }

  intialiseForm() {
    return this.fb.group({
      username: this.fb.control<string>(this.user),
      genres: this.fb.control<string>('', [Validators.required]),
      bookTitle: this.fb.control<string>('', [Validators.required]),
      edition: this.fb.control<string>('', [Validators.required]),
      authors: this.fb.control<string>('', [Validators.required]),
      format: this.fb.control<string>('', [Validators.required]),
      bookPhoto: this.fb.control<any>('', [ Validators.required ]),
      description: this.fb.control<string>('', [ Validators.required ]),
      price: this.fb.control<string>("0.10",[ Validators.required ]),
      pages: this.fb.control<number>(100,[ Validators.required ]),
      rating: this.fb.control<string>("5.5",[ Validators.required ])
    })
  }

  saveBook() {
    console.info(">>>>>> save button pressed")
    console.info(">>>> form details", this.itemForm.value)
    console.info('>>> book Upload Link ', this.bookPhotoUpload.nativeElement.files[0])

    const myFile = this.bookPhotoUpload.nativeElement.files[0]
    const form = this.itemForm.value as AddNewItem


    this.addNewItemsSvc.upload(myFile, form)
      .then(result => {
        console.info('>>> result from upload: ', result)
        this.ngOnInit();
        this.router.navigate(['/admin-landing'])
      }) 
      .catch(error => {
        console.error('>> error: ', error)
      })

  }

  getBookDetailsFromBookId(book_id : string) { // this code is not in use
    this.addNewItemsSvc.getBookDetailById(book_id)
    .then(result => {
      console.info('>>> result from getting the book details from edit button: ', result)
      this.populateForm(result)
    }) 
    .catch(error => {
      console.error('>> error: ', error)
    })
  }


  populateForm(result: BookDetail) { // code not in use
    this.itemForm = this.fb.group({
      username: this.fb.control<string>(this.user),
      genre: this.fb.control<string>(result.genre, [Validators.required]),
      bookTitle: this.fb.control<string>(result.title, [Validators.required]),
      edition: this.fb.control<string>(result.edition, [Validators.required]),
      authors: this.fb.control<string>(result.authors, [Validators.required]),
      format: this.fb.control<string>(result.format, [Validators.required]),
      bookPhoto: this.fb.control<any>(result.pic, [ Validators.required ]),
      description: this.fb.control<string>(result.description, [ Validators.required ]),
      price: this.fb.control<string>(result.price.toString(),[ Validators.required ]),
      pages: this.fb.control<number>(result.pages,[ Validators.required ]),
      rating: this.fb.control<string>(result.rating.toString(),[ Validators.required ])
    })
  }

}
