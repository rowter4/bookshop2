// import { NgModule } from "@angular/core";
// import { RouterModule, Routes } from "@angular/router";
// import { LandingComponent } from "./components/landing/landing.component";
// import { LoginComponent } from "./components/login/login.component";
// import { LogoutComponent } from "./components/logout/logout.component";
// import { RegisterComponent } from "./components/register/register.component";
// import { AuthGuardService } from "./service/auth-guard.service";
// import { AddNewItemsComponent } from './components/add-new-items/add-new-items.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// const routes: Routes = [
//     { path: '', component: LandingComponent,canActivate:[AuthGuardService] },
//     { path: 'add-item', component: AddNewItemsComponent, canActivate:[AuthGuardService] },
//     // { path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGuardService]},
//     { path: 'register', component: RegisterComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },
//   ];

//   @NgModule({
//     declarations: [
//       AddNewItemsComponent      
//     ],
//     imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule { }