import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookOrderHistory } from '../model';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private orderSvc : OrderHistoryService, private router : Router) { }

  bookOrderHistory : BookOrderHistory[] = []
  email !: string
  

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') || '';

    this.orderSvc.getAllPastOrders(this.email)
    .then(result => {
      console.info(">>>>> result from order history", result)
      this.bookOrderHistory = result
    })
    .catch(error => {
      console.info(">>>>>> error from order history: ", error)
    })
  }
  
  getOrderDetail(h : BookOrderHistory) {
    console.info(">>> more buttons pressed")
    this.router.navigate(['orderdetail', h.ord_id, {date: h.ts, total: h.total}])     
    
    let date = h.ts // ts is timestamp
    console.info(">>> order id obtained : ", h.ord_id)
   
  }

}
