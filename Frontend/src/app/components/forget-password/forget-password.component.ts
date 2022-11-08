import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router: Router) { }
  // form: any = {
  //   email: null
  // };

  email = ''

  ngOnInit(): void {
  }

  submitReactivation(): void {
    // const { email } = this.email;

    this.authService.forgetPassword(this.email).subscribe({
      next: data => {
        console.log(">>>>> details from the password reset" , data);
        alert("Email successfully send to your email. \nPlease do check your email for the verification link.")
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['login'])
      },
      error: err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    });
  }
}
