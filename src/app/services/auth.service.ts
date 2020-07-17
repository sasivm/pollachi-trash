import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  GoogleAuthLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.fireAuth.auth.signInWithPopup(provider);
  }

  get windowRef() {
    return window;
  }

  get currentUser() {
    const profile = this.fireAuth.auth.currentUser;
    return profile;
  }

}
