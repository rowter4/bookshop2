import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddNewItemsService } from './add-new-items.service';
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
              private activatedRoute: ActivatedRoute) {  }

  itemForm!: FormGroup
  user = sessionStorage.getItem('email') || '';
  book_id = this.activatedRoute.snapshot.paramMap.get("book_id")

  ngOnInit(): void {

    this.itemForm = this.intialiseForm()
    console.info(">>>>> book ID is : ", this.book_id)
    
  }

  intialiseForm() {
    return this.fb.group({
      username: this.fb.control<string>(this.user),
      genre: this.fb.control<string>('', [Validators.required]),
      bookTitle: this.fb.control<string>('', [Validators.required]),
      edition: this.fb.control<string>('', [Validators.required]),
      authors: this.fb.control<string>('', [Validators.required]),
      format: this.fb.control<string>('', [Validators.required]),
      bookPhoto: this.fb.control<any>('', [ Validators.required ]),
      description: this.fb.control<string>('', [ Validators.required ]),
      price: this.fb.control<string>("0.10",[ Validators.required ]),
      pages: this.fb.control<number>(100,[ Validators.required ]),
      rating: this.fb.control<string>("4.5",[ Validators.required ])
    })
  }

  saveBook() {
    console.info(">>>>>> save button pressed")
    console.info(">>>> form details", this.itemForm.value)
    console.info('>>> book Upload Link ', this.bookPhotoUpload.nativeElement.files[0])

    const myFile = this.bookPhotoUpload.nativeElement.files[0]
    const form = this.itemForm.value as BookDetail


    this.addNewItemsSvc.upload(myFile, form)
      .then(result => {
        console.info('>>> result from upload: ', result)
        alert("New Book is Successfully Added!")
        this.router.navigate(['/'])
      }) 
      .catch(error => {
        console.error('>> error: ', error)
      })

  }


}
