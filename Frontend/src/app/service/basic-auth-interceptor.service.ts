import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  token!: string;
  // authenticationService: AuthenticationService;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.token = sessionStorage.getItem('token')!;

    if (sessionStorage.getItem("email") && sessionStorage.getItem("token")) {
      req = req.clone({
        headers: 
          // Authorization: 
          // new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))
          new HttpHeaders().set('Authorization', this.token)
        
      })
    }

    return next.handle(req);

  }
}
