import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from '../cart/cart.service';
// import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService : AuthenticationService, private router : Router, private cartService : CartService) { }

  email = sessionStorage.getItem("email")
  admin : boolean = false 
  public totalItem : number = 0

  ngOnInit(): void {
    this.admin = false
   
    this.cartService.getAllItems().subscribe(result => {
      this.totalItem = result.length
      console.info(">>>> total item inside cart: ", this.totalItem)
    })
    
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
