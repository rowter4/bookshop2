import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from '../model';
import { PastOrderDetailService } from './past-order-detail.service';

@Component({
  selector: 'app-past-order-detail',
  templateUrl: './past-order-detail.component.html',
  styleUrls: ['./past-order-detail.component.css']
})
export class PastOrderDetailComponent implements OnInit {

  constructor(private pastOrderDetailSvc : PastOrderDetailService, private activatedRoute : ActivatedRoute) { }

  bookOrderDetail : LineItem[] = []
  ordID = this.activatedRoute.snapshot.params['ord_id']
  ts = this.activatedRoute.snapshot.paramMap.get('date')
  total = this.activatedRoute.snapshot.paramMap.get('total')

  ngOnInit(): void {

    console.info(">>>>> timestamp that is seen inside the detail : ", this.ts)
    console.info(">>>>> total amount that is seen inside the detail : ", this.total)
    
    this.pastOrderDetailSvc.getPastDetailOrders(this.ordID)
    .then(result => {
      console.info(">>>>> order details : ", result)
      this.bookOrderDetail = result
    })
    .catch(error => {
      console.info(">>>>>> error order details: ", error)
    })
  }

}
