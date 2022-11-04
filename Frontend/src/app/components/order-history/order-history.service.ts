import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BookOrderHistory, LineItem } from "../model";

@Injectable()
export class OrderHistoryService {

    constructor(private http: HttpClient) {}

    getAllPastOrders(email: string) : Promise<BookOrderHistory[]> {
        const params = new HttpParams().set("email", email)
        console.info(">>> email passed to read the pastorders: ", email)

        return firstValueFrom(
            this.http.get<BookOrderHistory[]>(`/pastorders/${email}`, { params })
        )
        
    }

   

}