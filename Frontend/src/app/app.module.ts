import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
// import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AddNewItemsComponent } from './components/add-new-items/add-new-items.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AddNewItemsService } from './components/add-new-items/add-new-items.service';
import { LandingService } from './components/landing/landing.service';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { BooksDetailService } from './components/books-detail/books-detail.service';
import { CartService } from './components/cart/cart.service';
import { SubmitOrderService } from './components/cart/submitorder.service';
import { CartComponent } from './components/cart/cart.component';
import { BooksListDialog } from './components/landing/dialog/landing-dialog.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate:[AuthGuardService] },
  { path: 'add-item', component: AddNewItemsComponent, canActivate:[AuthGuardService] },
  // { path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGuardService]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
  { path: 'books-detail/:book_id', component: BooksDetailComponent, canActivate:[AuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate:[AuthGuardService] },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    RegisterComponent,
    BooksDetailComponent,
    AddNewItemsComponent,
    CartComponent,
    BooksListDialog
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularMaterialModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }, 
    AddNewItemsService,
    LandingService,
    BooksDetailService,
    DecimalPipe,
    CartService,
    SubmitOrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
