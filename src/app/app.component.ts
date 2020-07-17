import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  
  title = 'pollachi-trash';
  userExist: boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    const profile = this._auth.currentUser;
    this.userExist = !!(profile && profile.uid);
    const redirectPage = (this.userExist) ? 'dashboard' : 'login';
    this.router.navigate([redirectPage]);
  }

  ngAfterViewInit() {
    const profile = this._auth.currentUser;
    this.userExist = !!(profile && profile.uid);
  }

}
