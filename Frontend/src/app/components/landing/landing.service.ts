import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    getName() : Promise<string> {
        const email = sessionStorage.getItem("email")
        console.info(">>> email able to see:" , email);
        
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.post<any>('/name', email, {headers})     
        )              
    }

    deleteBook(book_id: number) {
        console.info(">>> book_id able to see:" , book_id);

        return firstValueFrom(
            this.http.delete<any>(`/book-summary/${book_id}`)     
        )              
    }
}