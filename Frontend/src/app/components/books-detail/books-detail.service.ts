import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BookDetail } from "../model";

@Injectable()
export class BooksDetailService {

    constructor(private http: HttpClient) {}

    getBookDetailById(bookId: string) {
        console.info("Book id in angular service: ", bookId)
        return firstValueFrom(
            this.http.get<BookDetail>(`/book-detail/${bookId}`)  
        )
    }

    
}