import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl(),
    mobile: new FormControl(),
    mail: new FormControl(),
    address: new FormControl(),
    pickupDate: new FormControl(),
    pickupTime: new FormControl(),
  });

  errorMsgList: any[] = [];
  footerClass = `alert alert-danger row`;

  isRegisterUser = false;

  constructor(private _dataService: CommonService, private fireAuth: AngularFireAuth,
    private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    const userProfile = this._auth.currentUser;
    if (userProfile) {
      const { displayName, email, phoneNumber } = this._auth.currentUser;
      const initalLoad: any = {
        name: displayName,
        mail: email,
        mobile: phoneNumber
      };
      this.contactForm.patchValue(initalLoad);
    } else {
      const annoymUserInfo = (JSON.parse(sessionStorage.getItem('annonymusUser')));
      if (annoymUserInfo && annoymUserInfo.name) {
        this.contactForm.get('name').setValue(annoymUserInfo.name);
      }
    }

  }

  returnBack() {
    this._router.navigate(['dashboard'])
  }

  submitForm(): void {
    this.errorMsgList = [];
    const isFormValid = this.validateContactForm();

    if (isFormValid) {
      this.footerClass = `alert alert-secondary row`;
      this.errorMsgList.push('Please wait ...');
      const prepareRequest = this.contactForm.getRawValue();
      console.log(prepareRequest);
      this._dataService.addSellTrashDetails(prepareRequest).then(response => {
        console.log(response);
        this.errorMsgList = [];
        this.footerClass = `alert alert-success row`;
        this.errorMsgList.push('Data saveds sucessfully !!!');
      }).catch(err => {
        console.log(err);
        this.errorMsgList = [];
        this.errorMsgList.push(err.toString());
      });
    }
  }

  validateContactForm(): boolean {
    const nameRegExp = /^[a-zA-Z]+$/;
    const spaceRemove = /\s/g;
    const numberRegExp = /^[0-9]*$/;

    const name = this.contactForm.get('name').value;
    const mobileNumber = this.contactForm.get('mobile').value;
    const address = this.contactForm.get('address').value;

    !(name && (nameRegExp.test(name.replace(spaceRemove, '')))) && this.errorMsgList.push('Please enter valid Name');
    !((mobileNumber) && (mobileNumber.length === 10) && (numberRegExp.test(mobileNumber))) && this.errorMsgList.push('Please enter valid Mobile Number');
    !((address) && (address.length > 5)) && this.errorMsgList.push('Please enter valid Address');

    this.footerClass = `alert alert-danger row`;
    return (this.errorMsgList.length > 0) ? false : true;
  }

  resetForm(): void {
    this.contactForm.reset();
    this.errorMsgList = [];
    this.footerClass = '';
  }

}
