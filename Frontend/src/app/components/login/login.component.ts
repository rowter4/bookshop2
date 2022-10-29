import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// @NgModule({
//   declarations: [ 
//     HeaderComponent,
//   ],
//   imports: [],
//   providers: [],
//   bootstrap: []
// })

export class LoginComponent implements OnInit {

  email = ''
  password = ''
  invalidLogin = false
  
  @Input()
  error!: string | null;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.email, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.message;

      }
    )
    

  }

}