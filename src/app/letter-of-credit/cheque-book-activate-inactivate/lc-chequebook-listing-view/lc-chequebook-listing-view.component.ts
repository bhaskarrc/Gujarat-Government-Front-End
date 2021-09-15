import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ListValue, NotActivateInLC, ActivatedChequeInLC, InactivatedChequeInLC } from 'src/app/model/letter-of-credit';
import { LetterOfCreditDirectives } from 'src/app/common/directive/letter-of-credit-directive';

@Component({
  selector: 'app-lc-chequebook-listing-view',
  templateUrl: './lc-chequebook-listing-view.component.html',
  styleUrls: ['./lc-chequebook-listing-view.component.css']
})
export class LcChequebookListingViewComponent implements OnInit {

  // List of cheque Type
  ChequeTypeList: ListValue[] = [
    { value: '1', viewValue: 'Normal' },
    { value: '2', viewValue: 'CTS 2010' }
  ];

  // List of Request Type
  RequestTypeList: ListValue[] = [
    { value: '1', viewValue: 'Activate' },
    { value: '2', viewValue: 'Inactivate' }
  ];

  // Data for Not Activated in LC Table
  NotActivateInLCData: NotActivateInLC[] = [
    { issueDate: '26-MAR-2017', startingChequeSeries: 'EE002-420301', endingChequeSeries: 'EE002-420400' }
  ];

  // Table Columns for Table Not Activated in LC
  NotActivateInLCDataColumn: string[] = [
    'srno', 'issueDate', 'startingChequeSeries', 'endingChequeSeries'
  ];

  // Data for Activated Cheque in LC Table
  ActivatedChequeInLCData: ActivatedChequeInLC[] = [
    { activatedDate: '28-FEB-2018', startingChequeSeries: 'EE002-420401', endingChequeSeries: 'EE002-420500' }
  ];

  // Table Columns for Table Activated Cheque in LC
  ActivatedChequeInLCDataColumn: string[] = [
    'srno', 'activatedDate', 'startingChequeSeries', 'endingChequeSeries'
  ];

  // Data for Table Inactivated Cheque in LC
  InactivatedChequeInLCData: InactivatedChequeInLC[] = [
    { activatedDate: '25-APR-2017', inactivateDate: '26-MAR-2019', startingChequeSeries: 'EE002-420101', endingChequeSeries: 'EE002-420200' }
  ];

  // Table Columns for Table Inactivated Cheque in LC
  InactivatedChequeInLCDataColumn: string[] = [
    'srno', 'inactivateDate', 'activatedDate', 'startingChequeSeries', 'endingChequeSeries'
  ];

  todayDate = Date.now();
  divisionCode = "AFR007"
  divisionName = "Dy. Con. Of Forest Training Center, Gandhinagar";
  bankName = "State Bank Of India, Main Branch, Gandhinagar";
  bankAccountNo = "12345678912340";
  optionActivated = true;
  optionInactivated = false;
  isSearch: boolean;
  lcChequeBookActivateInactivateEditForm: FormGroup;
  ChequeTypeCTRL: FormControl = new FormControl();
  RequestTypeCTRL: FormControl = new FormControl();
  NotActivateInLCDataSource = new MatTableDataSource<NotActivateInLC>(this.NotActivateInLCData);
  ActivatedChequeInLCDataSource = new MatTableDataSource<ActivatedChequeInLC>(this.ActivatedChequeInLCData);
  InactivatedChequeInLCDataSource = new MatTableDataSource<InactivatedChequeInLC>(this.InactivatedChequeInLCData);

  constructor(private fb: FormBuilder, private el: ElementRef, public dialog: MatDialog, private router: Router) { }

  // Create object to access Methods of Letter of Credit Directive
  directiveObject = new LetterOfCreditDirectives(this.router, this.dialog, this.el);

  ngOnInit() {
    this.lcChequeBookActivateInactivateEditFormData();
  }

  // Initialize the Form Fields
  lcChequeBookActivateInactivateEditFormData() {
    this.lcChequeBookActivateInactivateEditForm = this.fb.group({
      divisionCode: [''],
      chequeType: ['2'],
      requestType: ['1']
    });
  }

  // Method to show Results
  showTable() {
    if (this.lcChequeBookActivateInactivateEditForm.controls['requestType'].value == '1') {
      this.optionActivated = true;
      this.optionInactivated = false;
    } else {
      this.optionActivated = false;
      this.optionInactivated = true;
    }
  }
}
