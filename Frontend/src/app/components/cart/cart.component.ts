import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem, NewOrder } from '../model';
import { CartService } from './cart.service';
import { SubmitOrderService } from './submitorder.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartSvc: CartService, private fb: FormBuilder, private submitSvc: SubmitOrderService,
              private router: Router ) { }
 

  productList: any = []
  grandTotal : number = 0

  bookOrderForm!: FormGroup
  bookArray!: FormArray
  

  ngOnInit(): void {
    this.cartSvc.getAllItems()
      .subscribe(result => {
        this.productList = result
        this.grandTotal = this.cartSvc.getTotalPrice()
        
        this.bookOrderForm = this.createForm()        
        for (let i=0; i<this.productList.length; i++) {
          this.addToList(this.productList[i])
        }

        console.info('>>> in subscription: ', this.productList)
        console.info('>>> grand total: ', this.grandTotal)
        console.info('>>> todo Form: ', this.bookOrderForm.value)
      })


  }

  createForm() {
    this.bookArray = this.fb.array([]) 
    
    return this.fb.group({
      bookLineOrder: this.bookArray,
      grandTotal: this.grandTotal.toString(),
      username: sessionStorage.getItem("email")?.toString()
    })
  }

  addToList(productList : any) {
    const todoItem = this.fb.group({
      title: this.fb.control<string>(productList.title),
      book_id : this.fb.control<string>(productList.book_id),
      quantity: this.fb.control<number>(1),
      price: this.fb.control(productList.price.toString())
    })

    this.bookArray.push(todoItem)
  }

  removeItem(item: any) {
    console.info(">>>> remove item triggered")
    this.cartSvc.removeCartItem(item)
  }

  processForm() {
    console.info(">>> form is being processed")
    const newOrder = this.bookOrderForm.value as NewOrder

    this.submitSvc.processOrder(newOrder)
      .then(result => {
        console.info('>>>> result from process of the order: ', result)
        this.cartSvc.removeAllCart()        
        alert(`Your order is already processed!`)
        this.router.navigate([''])
      })
      .catch((error: HttpErrorResponse) => {
        console.error('>>>> error: ', error)
        alert(`Error: message=${error.message}, data=${error.error}`)
      })
  }


  
}
