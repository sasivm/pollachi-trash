import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit, AfterViewInit {

  phoneNumber;
  errorState = false;
  errorMessage = null;

  windowRef: any;

  constructor(private _authService: AuthService, private fbAuth: AngularFireAuth,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.windowRef = this._authService.windowRef;
    const invisible = {
      size: 'invisible',
      callback: (res) => this.sendOTPCode()
    };
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', invisible);
  }

  sendOTPCode() {
    // const numberExp = /^[0-9]*$/;
    // this.errorState = false;
    // const phoneNumber: string = this.phoneNumber + '';
    // const isNumberValid = (phoneNumber.length === 10 && numberExp.test(phoneNumber));

    // if (isNumberValid) {
    //   const appVerifier = this.windowRef.recaptchaVerifier;
    //   this.fbAuth.auth.signInWithPhoneNumber(`+91${phoneNumber}`, appVerifier).then(result => {
    //     console.log('otp sent');
    //     console.log(result);
    //     this.windowRef.confirmationResult = result;
    //     this.router.navigate(['confirm'], { relativeTo: this.activateRoute });
    //   }).catch(error => {
    //     this.errorState = true;
    //     this.errorMessage = 'Please retry';
    //   });
    // } else {
    //   this.errorState = true;
    //   this.errorMessage = 'Please enter vaild mobile number';
    // }

    this.router.navigate(['confirm'], { relativeTo: this.activateRoute });
  }

}
