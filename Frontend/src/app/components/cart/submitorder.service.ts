import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BookOrderHistory, NewOrder } from "../model";

@Injectable()
export class SubmitOrderService {

    constructor(private http: HttpClient) {}

    processOrder(newOrder: NewOrder){

        console.info(">>>>> new Order information to pass to DB: ", newOrder)
       
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    
          return lastValueFrom(
            this.http.post<any>('/submit-order', newOrder, { headers })
          )
      }
}