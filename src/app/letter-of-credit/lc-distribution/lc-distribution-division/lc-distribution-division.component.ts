import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ListValue, LCDistribution } from 'src/app/model/letter-of-credit';
import { LetterOfCreditDirectives } from 'src/app/common/directive/letter-of-credit-directive';


@Component({
  selector: 'app-lc-distribution-division',
  templateUrl: './lc-distribution-division.component.html',
  styleUrls: ['./lc-distribution-division.component.css']
})
export class LcDistributionDivisionComponent implements OnInit {

  isSearch: boolean;
  todayDate = new Date();
  lcVerificationForm: FormGroup;

  // Table Data for LC Distribution
  LcdistributionDATA: LCDistribution[] = [
    {
      referenceNo: '19-20/LC/CLR/001', referenceDate: '02-Apr-2020 08:15',
      divisionCode: 'AFR007', divisionName: 'Dy. Con. of Forest training Center, Gandhinagar',
      lcNo: 'LC57SE001EE0010001', entryType: 'Distribution', lcAmount: '450000000',
      lcIssueDate: '02-Apr-2019 08:21', lyingWith: 'Test User 1', status: 'Authorized', authorizedDate: '02-Apr-2019 11:30',
      receivedFrom: '', receivedDate: '', sentTo: '', sentDate: ''
    },
    {
      referenceNo: '19-20/LC/CLR/002', referenceDate: '02-Apr-2020 08:15',
      divisionCode: 'AFR007', divisionName: 'Dy. Con. of Forest training Center, Gandhinagar',
      lcNo: 'LC57SE001EE0010002', entryType: 'Distribution', lcAmount: '450000000',
      lcIssueDate: '02-Apr-2019 08:21', lyingWith: 'Test User 1', status: 'Authorized', authorizedDate: '02-Apr-2019 01:50',
      receivedFrom: '', receivedDate: '', sentTo: '', sentDate: ''
    },
    {
      referenceNo: '19-20/LC/CLR/003', referenceDate: '02-Apr-2020 08:15',
      divisionCode: 'AFR007', divisionName: 'Dy. Con. of Forest training Center, Gandhinagar',
      lcNo: 'LC57SE001EE0010003', entryType: 'Distribution', lcAmount: '450000000',
      lcIssueDate: '02-Apr-2019 08:21', lyingWith: 'Test User 1', status: 'Authorized', authorizedDate: '02-Apr-2019 05:17',
      receivedFrom: '', receivedDate: '', sentTo: '', sentDate: ''
    },
    {
      referenceNo: '19-20/LC/CLR/004', referenceDate: '02-Apr-2020 08:15',
      divisionCode: 'AFR007', divisionName: 'Dy. Con. of Forest training Center, Gandhinagar',
      lcNo: 'LC57SE001EE0010004', entryType: 'Distribution', lcAmount: '450000000',
      lcIssueDate: '02-Apr-2019 08:21', lyingWith: 'Test User 1', status: 'Authorized', authorizedDate: '02-Apr-2019 09:00',
      receivedFrom: '', receivedDate: '', sentTo: '', sentDate: ''
    }
  ];

  // Table Columns for LC Distribution Table
  LcdistributionDATAColumn: string[] = [
    'select', 'srno', 'referenceNo', 'referenceDate', 'divisionCode',
    'divisionName', 'lcNo', 'entryType', 'lcAmount', 'lcIssueDate', 'lyingWith', 'status', 'authorizedDate', 'action'
  ];

  // List of Entry Type
  EntryTypeList: ListValue[] = [
    { value: '1', viewValue: 'Distribution' },
    { value: '2', viewValue: 'Withdrawal' },
  ];

  // List of Status
  StatusList: ListValue[] = [
    { value: '1', viewValue: 'Authorized' },
    { value: '2', viewValue: 'Pending' },
    { value: '3', viewValue: 'Returned' },
  ];

  valueBetweenError = false;
  EntryTypeCtrl: FormControl = new FormControl();
  StatusCtrl: FormControl = new FormControl();
  LcdistributionDataSource = new MatTableDataSource<LCDistribution>(this.LcdistributionDATA);

  constructor(private fb: FormBuilder, private el: ElementRef, public dialog: MatDialog, private router: Router) { }

  // Create object to access Methods of Letter of Credit Directive
  directiveObject = new LetterOfCreditDirectives(this.router, this.dialog, this.el);

  ngOnInit() {
    this.lcVerificationFormData();
  }

  // Initialize Form Fields
  lcVerificationFormData() {
    this.lcVerificationForm = this.fb.group({
      lcIssueFromDate: [''],
      lcIssueToDate: [''],
      entryType: ['1'],
      status: [''],
      lcAmountBetween: [''],
      and: [''],
      referenceFromDate: [''],
      referenceToDate: [''],
      divisionCode: [''],
      lcNumber: ['']
    });
  }

  // Method to Search
  search() {
    this.isSearch = false;
  }

  // Method to compare amounts
  compareAmount() {
    if (this.lcVerificationForm.controls['lcAmountBetween'].value > this.lcVerificationForm.controls['and'].value) {
      this.valueBetweenError = true;
    } else {
      this.valueBetweenError = false;
    }
  }

}
