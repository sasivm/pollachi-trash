import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  trashDataSource: MatTableDataSource<any>;

  adminTable = new FormGroup({
    dateFilter: new FormControl()
  });

  dummyDataResponse = [
    { name: 'Sasi', mobile: 7502271291, address: 'NCP, 642120', pickupDate: '22-07-2019', pickupTime: '05:04' },
    { name: 'Kumar', mobile: 6381724674, address: 'NGM, 643456', pickupDate: '09-03-2020', pickupTime: '21:59' },
    { name: 'Sasi', mobile: 7502271291, address: 'NCP, 642120', pickupDate: '22-07-2019', pickupTime: '05:04' },
    { name: 'Kumar', mobile: 6381724674, address: 'NGM, 643456', pickupDate: '09-03-2020', pickupTime: '21:59' },
    { name: 'Sasi', mobile: 7502271291, address: 'NCP, 642120', pickupDate: '22-07-2019', pickupTime: '05:04' },
    { name: 'Kumar', mobile: 6381724674, address: 'NGM, 643456', pickupDate: '09-03-2020', pickupTime: '21:59' },
    { name: 'Sasi', mobile: 7502271291, address: 'NCP, 642120', pickupDate: '22-07-2019', pickupTime: '05:04' },
    { name: 'Kumar', mobile: 6381724674, address: 'NGM, 643456', pickupDate: '09-03-2020', pickupTime: '21:59' },
    { name: 'Sasi', mobile: 7502271291, address: 'NCP, 642120', pickupDate: '22-07-2019', pickupTime: '05:04' },
    { name: 'Kumar', mobile: 6381724674, address: 'NGM, 643456', pickupDate: '09-03-2020', pickupTime: '21:59' },
  ];

  constructor(private _dataService: CommonService, private _datePipe: DatePipe) { }

  ngOnInit(): void {
    // this._dataService.getTrashList().subscribe((response: any[]) => {
    this.trashDataSource = new MatTableDataSource(this.dummyDataResponse);
    console.log(this.trashDataSource.data);
    // });
  }

  get displayedColumns() {
    const columnsList = ['name', 'mobile', 'address', 'date', 'time'];
    return columnsList;
  }

  copyPhoneNumber(phoneInput) {
    let phoneField = document.createElement('input');
    phoneField.style.display = 'none';
    phoneField.value = phoneInput;
    phoneField.select();
    document.execCommand('copy');
    phoneField.remove();
  }

  loadSellerTable() {
    this.trashDataSource.data = [];
    let selectedDate = this.adminTable.get('dateFilter').value;
    selectedDate = this._datePipe.transform(selectedDate, 'yyyy-MM-dd');
    console.log(selectedDate);
    this._dataService.getFilteredTrashList(selectedDate).subscribe(resData => {
      this.trashDataSource.data = resData;
    });
  }

}
