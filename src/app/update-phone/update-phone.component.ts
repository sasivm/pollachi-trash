import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})

export class UpdatePhoneComponent implements OnInit, AfterViewInit {

  phoneUpdate = new FormGroup({
    phoneNumber: new FormControl(),
    confirmCode: new FormControl()
  });

  errorState = false;
  errorMessage = '';

  windowRef: any;

  constructor(private _authService: AuthService, private fbAuth: AngularFireAuth,) { }

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
    const numberExp = /^[0-9]*$/;
    this.errorState = false;
    const phoneNumber: string = this.phoneUpdate.get('phoneNumber').value + '';
    const isNumberValid = (phoneNumber.length === 10 && numberExp.test(phoneNumber));

    if (isNumberValid) {
      const appVerifier = this.windowRef.recaptchaVerifier;
      this.fbAuth.auth.signInWithPhoneNumber(`+91${phoneNumber}`, appVerifier).then(result => {
        console.log('otp sent');
        console.log(result);
        this.windowRef.confirmationResult = result;
        this.phoneUpdate.get('phoneNumber').disable({ onlySelf: true });
      }).catch(error => {
        this.errorState = true;
        this.errorMessage = 'Please retry';
      });
    } else {
      this.errorState = true;
      this.errorMessage = 'Please enter vaild mobile number';
    }
  }

  verifyCode() {
    const numberExp = /^[0-9]*$/;
    const code = this.phoneUpdate.get('confirmCode').value;
    this.errorState = false;

    if (code && numberExp.test(code)) {
      this.windowRef.confirmationResult.confirm(code).then(response => {
        const profile = this._authService.currentUser;
        const phoneNumber: string = this.phoneUpdate.get('phoneNumber').value + '';
        // profile.updatePhoneNumber()
      }).catch(err => {
        this.errorState = true;
        this.errorMessage = 'Please enter vaild Code';
        console.log('Incorrect code !!!', code);
      });
    } else {
      this.errorState = true;
      this.errorMessage = 'Please enter vaild Code';
    }
  }

  get phonumberState(): boolean {
    return this.phoneUpdate.get('phoneNumber').disabled;
  }

}
