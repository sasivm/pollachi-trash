import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-phone-confirmation',
  templateUrl: './phone-confirmation.component.html',
  styleUrls: ['./phone-confirmation.component.css']
})
export class PhoneConfirmationComponent implements OnInit {

  phoneConfirm = new FormGroup({
    confirmCode: new FormControl(),
    displayName: new FormControl()
  });

  phoneConfirmState = true;

  errorState = false;
  errorMessage = null;

  windowRef: any;

  constructor(private _authService: AuthService, private router: Router, private _dataService: CommonService) { }

  ngOnInit(): void {
    this.windowRef = this._authService.windowRef;
  }

  submitForm() {
    this.errorState = false;
    if (!this.phoneConfirmState) {
      const name = this.phoneConfirm.get('displayName').value;
      if (name && name.length > 1) {
        const profile = this._authService.currentUser;
        profile.updateProfile({ displayName: name }).then(res => {
          const request = {
            'name': name,
            'mail': profile.email,
            'mobileNumber': profile.phoneNumber,
            'id': profile.uid
          }
          this._dataService.createCustomerProfile(request).then(res => {
            console.log('new user')
            this.router.navigate(['dashboard']);
          }).catch(err => {
            this.errorState = true;
            this.errorMessage = 'Please submit name again';
          });
        }).catch(err => {
          console.log(err);
          this.errorState = true;
          this.errorMessage = 'Please submit name again';
        });

      } else {
        this.errorState = true;
        this.errorMessage = 'Please enter vaild name';
      }
    } else {
      this.verifyLoginCode();
    }
  }

  verifyLoginCode() {
    const numberExp = /^[0-9]*$/;
    const code = this.phoneConfirm.get('confirmCode').value;

    if (code && numberExp.test(code)) {
      this.windowRef.confirmationResult.confirm(code).then(response => {
        const { isNewUser } = response.additionalUserInfo;
        const displayName = response.displayName;
        if (isNewUser || !(displayName)) {
          this.phoneConfirmState = false;
        } else {
          this.router.navigate(['dashboard']);
        }
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

}
