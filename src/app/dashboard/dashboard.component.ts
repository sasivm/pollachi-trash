import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  trashList = [
    { name: 'steel1', icon: '', price: '' },
    { name: 'stee2', icon: '', price: '' },
    { name: 'stee3', icon: '', price: '' },
    { name: 'stee4', icon: '', price: '' },
    { name: 'steel1', icon: '', price: '' },
    { name: 'stee2', icon: '', price: '' },
    { name: 'stee3', icon: '', price: '' },
    { name: 'stee4', icon: '', price: '' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateSellTrash() {
    this.router.navigate(['sellTrash']);
  }

}
