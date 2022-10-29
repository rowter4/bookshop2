import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BookDetail } from "../model";
import { AddNewItem } from "./add-new-items.model";
// import { AddItem } from './add-new-items.model';

@Injectable()
export class AddNewItemsService {

    constructor(private http: HttpClient) { }

    upload(uploadPhoto: File | Blob, form: AddNewItem) {

        const data = new FormData()
        data.set('file', uploadPhoto)
        data.set('form', new Blob([JSON.stringify(form)], {
            type: 'application/json'
        }));
        
        return firstValueFrom(
            this.http.post<any>('/upload', data)
        )
    }

    getBookDetailById(bookId: string) { // this branch is not being used
        console.info("Book id in angular service: ", bookId)
        return firstValueFrom(
            this.http.get<BookDetail>(`/book-detail/${bookId}`)  
        )
    }
}