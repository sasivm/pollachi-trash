import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  menuList = [
    { name: 'Dashboard', icon: 'apps', link: 'dashboard' },
    { name: 'Sell Trash', icon: 'shopping_cart', link: 'sellTrash' },
    { name: 'Profile', icon: 'account_circle', link: 'profile' },
    { name: 'Activity', icon: 'history', link: 'activity' },
    { name: 'About Us', icon: 'help', link: 'activity' },
    { name: 'Sing Out', icon: 'logout', link: 'logoff' },
  ];

  apptitle = 'Pollachi Trash';
  isAdminAuth = false;

  constructor(private router: Router) { }

  selectedItem(item): void {
    this.router.navigate([item]);
  }

  adminAuth() {
    this.router.navigate(['admin']);
  }

}
