import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommonService } from '../services/common.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login-method',
  templateUrl: './login-method.component.html',
  styleUrls: ['./login-method.component.css']
})

export class LoginMethodComponent implements OnInit {

  windowRef: any;
  errorMessage = null;
  errorState = false;

  isUserAnnonymus = false;

  customerName = '';
  containerNameError = false;

  constructor(private _authService: AuthService, private fbAuth: AngularFireAuth, private router: Router,
    private _dataService: CommonService) { }

  ngOnInit() {
    const currentUser = this.fbAuth.auth.currentUser;
    console.log(currentUser);
  }

  verifyUser() {
    this.containerNameError = !(this.customerName && this.customerName.length > 1);
    if (!this.containerNameError) {
      const userProfile = (JSON.stringify({ name: this.customerName }));
      sessionStorage.setItem('annonymusUser', userProfile);
      this.router.navigate(['dashboard']);
    }
  }

  logginWithGoogle() {
    this.errorState = false;
    this._authService.GoogleAuthLogin().then((response: any) => {
      console.log(response);
      if (response && response.user) {
        const { isNewUser } = response.additionalUserInfo;
        const { user: { displayName, uid, email, phoneNumber, photoURL } } = response;
        console.log(displayName, uid, email, phoneNumber, photoURL);
        if (isNewUser) {
          const request = {
            'name': displayName,
            'mail': email,
            'mobileNumber': phoneNumber,
            'id': uid
          };
          this._dataService.createCustomerProfile(request).then(res => {
            console.log('new user')
            this.router.navigate(['dashboard']);
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.router.navigate(['dashboard']);
        }
      } else {
        this.errorMessage = 'Something went wrong.Please Retry';
        this.errorState = true;
        console.log(`Response not truthy`, response);
      }
    }).catch(error => {
      this.errorMessage = 'Something went wrong.Please Retry';
      this.errorState = true;
      console.log(error)
    });
  }


  logginWithPhone() {
    this.router.navigate(['phone']);
  }

}

