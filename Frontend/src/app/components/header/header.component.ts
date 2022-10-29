import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
// import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService : AuthenticationService, private router : Router) { }

  // email !: any
  email = sessionStorage.getItem("email")
  admin : boolean = false 

  ngOnInit(): void {
    this.admin = false
    // this.email = sessionStorage.getItem("email")
    
  }

  ngAfterViewInit(): void {
    console.info(">>>>> email" , this.email)
    if (this.email == "fred@gmail.com") {
      this.admin = true
    }
  }

  addItem() {
    console.info(">>>> add item clicked")
    this.router.navigate(['add-item'])
  }

  

}
