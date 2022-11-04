import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LineItem } from "../model";


@Injectable()
export class PastOrderDetailService {

    constructor(private http: HttpClient) {}


    getPastDetailOrders(ord_id: string)  {
        const params = new HttpParams().set("ord_id", ord_id)

        return firstValueFrom(
            this.http.get<LineItem[]>('/pastorderdetail', { params })
        )
    }
}