import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ListValue, CreateAcListRefund } from 'src/app/model/pdpla';



@Component({
  selector: 'app-refund-request-listing-dat',
  templateUrl: './refund-request-listing-dat.component.html',
  styleUrls: ['./refund-request-listing-dat.component.css']
})
export class RefundRequestListingDatComponent implements OnInit {
  // Form Group
  pdplaform: FormGroup;
  // Form Control
  subMajorCtrl: FormControl = new FormControl();
  pdplaType_list: ListValue[] = [
    { value: '1', viewValue: 'PD ' },
    { value: '2', viewValue: 'PLA' }
  ];

  pdplaCtrl: FormControl = new FormControl();

  majorHead_list: ListValue[] = [
    { value: '1', viewValue: '8448: Deposits of Local Funds(Bearing Interest)' },
    { value: '2', viewValue: '8342: Deposits of Local Funds(Bearing Interest)' },

  ];

  majorCtrl: FormControl = new FormControl();

  subMajorHead_list: ListValue[] = [
    { value: '1', viewValue: '01' },
    { value: '2', viewValue: '00' },
  ];

  minorHead_list: ListValue[] = [
    {
      value: '1',
      viewValue: '101 : National Mineral Exploration Trust Deposite'
    },
    {
      value: '117 : Defined Contribution Pension Scheme for Government Employees',
      viewValue: '117 : Defined Contribution Pension Scheme for Government Employees'
    },

  ];

  minorHeadCtrl: FormControl = new FormControl();

  subHead_list: ListValue[] = [
    { value: '1', viewValue: '00' },
    { value: '2', viewValue: '01' },
    { value: '3', viewValue: '02' },
  ];

  subHeadCtrl: FormControl = new FormControl();
  Element_Data: CreateAcListRefund[] = [
    {
      reqNo: 'PDPLARC0515001',
      refDate: '26-May-2016',
      pdplaOfcName: 'GSRTC',
      pdacNo: 'GSRTC',
      pdacName: 'GSRTC-1',
      terName: 'Ahmedabad',
      disName: 'Ahmedabad',
      toName: 'Ahmedabad',
      closBal: '1500.00',
      remBal: '1200.00',
      reaFundAmt: '300.00',
      cardexNo: '123',
      ddoNo: '543',
      pendingWith: 'Mr. ABC (Account Officer)',
      status: 'Pending',
      headChargeable: '8448:01:101:00',

    },
  ];
  dataSourceRefundProcess = new MatTableDataSource<CreateAcListRefund>(this.Element_Data);
  displayedColumnsrefundListing: any[] = [
    'position',
    'reqNo',
    'refDate',
    'cardexNo',
    'ddoNo',
    'pdplaOfcName',
    'pdacNo',
    'pdacName',
    'headChargeable',
    'disName',
    'toName',
    'closBal',
    'reaFundAmt',
    'remBal',
    'status',
    'pendingWith',
    'action',
  ];

  constructor(private fb: FormBuilder) { }

  status_list: any[] = [
    { value: '1', viewValue: 'Draft ' },
    { value: '2', viewValue: 'Pending' },
    { value: '3', viewValue: 'Approved' },
    { value: '4', viewValue: 'Cancelled' },
  ];

  statusCtrl: FormControl = new FormControl();

  ngOnInit() {
    this.pdplaform = this.fb.group({
    });
  }
}

