import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  token!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private resetPasswordSvc: ResetPasswordService, private router: Router) { }

  newPassword = new FormControl(null, [
    (control: AbstractControl) => Validators.required(control), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),
  ]);

  confirmPassword = new FormControl(null, [
    (control: AbstractControl) => Validators.required(control), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),
  ]);

  resetPasswordForm = this.fb.group(
    {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );



  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params["token"];
        console.log(">>>> token", this.token); 
      }
      );

  }

  onSubmit(): void {
    console.log(">>>> password reset", this.resetPasswordForm);
    console.log(">>>> new password value", this.resetPasswordForm.value.newPassword);
    console.log(">>>> read token again", this.token);

    if (!this.resetPasswordForm?.valid) {
      return;
    }

    let details = {
      newPassword: this.resetPasswordForm.value.newPassword,
      resetPasswordToken: this.token
    }

    
    this.resetPasswordSvc.updateNewPassword(details)
      .then(result => {
        console.info(">>>>> order details : ", result)
        alert("Your password is changed successfully!")
        this.router.navigate(['login']);
        
      })
      .catch(error => {
        console.info(">>>>>> error order details: ", error)
        return;
      })
    

  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}


