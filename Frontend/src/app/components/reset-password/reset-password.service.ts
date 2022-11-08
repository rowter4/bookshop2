import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom, lastValueFrom } from "rxjs"


@Injectable()
export class ResetPasswordService {

    constructor(private http: HttpClient) { }

    updateNewPassword(details: any) {

        console.info(">>> details inside update password service: ", details)

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return lastValueFrom(
            this.http.post<any>('/resetpassword', details, { headers })
        )
    }
}