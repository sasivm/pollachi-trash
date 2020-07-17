import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})

export class UserprofileComponent implements OnInit {

  emptyThumbnail = 'assets/user-avatar.png';

  errorState = false;
  errorMessage = '';

  anonymousUser = false;

  profile: any = {};

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    const userProfile = this._auth.currentUser;
    if (userProfile) {
      const { displayName, email, phoneNumber, photoURL } = userProfile;

      const initalLoad: any = {
        displayName: displayName,
        mail: email,
        phoneNumber: phoneNumber
      };

      this.profile = initalLoad;
    } else {
      const anonymUser = JSON.parse(sessionStorage.getItem('annonymusUser'));
      this.anonymousUser = true;
      if (anonymUser && anonymUser.name) {
        this.profile.phoneNumber = anonymUser.name;
      }
    }
  }

  get profileInfo(): any {
    return this.profile;
  }

  // editForm() {
  //   this.userProfile.enable();
  // }

  // updateUserProfile() {
  //   this.errorState = false;
  //   const { name, address } = this.userProfile.getRawValue();
  //   if (name && address) {
  //     const updateProfile = {
  //       'name': name,
  //       'address': address
  //     };
  //     this._dataService.updateCustomerdetails(updateProfile).then(res => {
  //       this.errorMessage = 'Successfully Updated...';
  //       this.errorState = true;
  //     }).catch(err => {
  //       this.errorMessage = 'Somthing went Wrong, Please Retry';
  //       this.errorState = true;
  //     });
  //   } else {
  //     let errorMessage = 'Please enter valid address';
  //     if (!name) {
  //       errorMessage = 'Please enter valid name';
  //     }
  //     this.errorMessage = errorMessage;
  //     this.errorState = true;
  //   }
  // }

  // editPhone() {
  //   this.router.navigate(['updatePhone']);
  // }

}
