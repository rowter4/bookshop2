import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: any = {
    email: null,
    password: null,
    name: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password, name } = this.form;

    this.authService.register(email, password, name).subscribe({
      next: data => {
        console.log(">>>>> details from the registration" , data);
        alert("Successfully registered!")
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }



}
