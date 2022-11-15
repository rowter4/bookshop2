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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistoryService } from './components/order-history/order-history.service';
import { PastOrderDetailService } from './components/past-order-detail/past-order-detail.service';
import { PastOrderDetailComponent } from './components/past-order-detail/past-order-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ResetPasswordService } from './components/reset-password/reset-password.service';
// import { VoiceRecognitionService } from './components/add-new-items/voice-recognition.service';


const routes: Routes = [
  { path: '', component: LandingComponent, canActivate:[AuthGuardService] },
  { path: 'add-item', component: AddNewItemsComponent, canActivate:[AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent  },
  { path: 'reset_password', component: ResetPasswordComponent  },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
  { path: 'books-detail/:book_id', component: BooksDetailComponent, canActivate:[AuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate:[AuthGuardService] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate:[AuthGuardService] },
  { path: 'orderdetail/:ord_id', component: PastOrderDetailComponent, canActivate:[AuthGuardService] },
  { path: 'about-us', component: AboutUsComponent, canActivate:[AuthGuardService] },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    // FooterComponent,
    HeaderComponent,
    LandingComponent,
    RegisterComponent,
    BooksDetailComponent,
    AddNewItemsComponent,
    OrderHistoryComponent,
    CartComponent,
    BooksListDialog,
    PastOrderDetailComponent,
    AboutUsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RxReactiveFormsModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }, 
    AddNewItemsService,
    LandingService,
    BooksDetailService,
    DecimalPipe,
    CartService,
    SubmitOrderService,
    OrderHistoryService,
    PastOrderDetailService,
    ResetPasswordService
    // VoiceRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
