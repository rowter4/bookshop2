import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BookSummary } from "../model";



@Injectable()
export class LandingService {

    constructor (private http: HttpClient) {}

    getDetails() : Promise<BookSummary[]> {
        return firstValueFrom(
            this.http.get<BookSummary[]>('/book-summary')
        )              
    }
}