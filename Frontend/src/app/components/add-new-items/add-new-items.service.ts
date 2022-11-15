import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BookDetail } from "../model";

@Injectable()
export class AddNewItemsService {

    constructor(private http: HttpClient) { }

    upload(uploadPhoto: File | Blob, form: BookDetail) {

        const data = new FormData()
        data.set('file', uploadPhoto)
        data.set('form', new Blob([JSON.stringify(form)], {
            type: 'application/json'
        }));
        
        console.info("add new item triggered ") 
        return firstValueFrom(
            this.http.post<any>('/upload', data)
        )
    }

}