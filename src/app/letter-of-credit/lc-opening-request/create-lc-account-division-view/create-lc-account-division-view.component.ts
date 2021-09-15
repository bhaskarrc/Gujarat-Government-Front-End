import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ListValue, Treasury } from 'src/app/model/letter-of-credit';
import { LetterOfCreditDirectives } from 'src/app/common/directive/letter-of-credit-directive';
import { truncate } from 'fs';
import { lcMessage } from 'src/app/common/error-message/common-message.constants';

@Component({
  selector: 'app-create-lc-account-division-view',
  templateUrl: './create-lc-account-division-view.component.html',
  styleUrls: ['./create-lc-account-division-view.component.css'],
})
export class CreateLcAccountDivisionViewComponent implements OnInit {
  OfficeName_list: any[] = [
    { value: '1', viewValue: 'Director, Sardar Patel Zological Park, kevadia' },
  ];

  // List of Circle Names
  CircleNameList: any[] = [
    { value: '1', viewValue: 'Dir. Parks & Garden, G. S. Gnr.', code: 'SE005' },
    { value: '2', viewValue: 'Other', code: '' },
    {
      value: '3',
      viewValue: 'Pay & Accounts Officer, N.W.R. & W.S. Deptt. Gnr.',
      code: 'EE014',
    },
    {
      value: '4',
      viewValue: 'Supdt. Eng. Elect. Eng. R.& B. Circle, Gnr.',
      code: 'SE003',
    },
    {
      value: '5',
      viewValue: 'Supdt. Eng. State Road Project Circle, Gnr.',
      code: 'SE009',
    },
    {
      value: '6',
      viewValue: 'Supt.Engr.C.P.Circle, Gandhinagar',
      code: 'SE001',
    },
  ];

  // List of Bank Branch
  BankBranch_list: ListValue[] = [
    { value: '1', viewValue: 'State Bank of India (LIC Road, Godhra)' },
  ];

  // List of Major Head
  majorHead_list: ListValue[] = [
    {
      value: '1',
      viewValue: '8782 - Cash Remittances and adjustment between Officers',
    },
  ];

  // List of Sub Major Head
  subMajorHead_list: ListValue[] = [{ value: '1', viewValue: '00' }];

  // List of Minor Head
  minorHead_list: ListValue[] = [
    { value: '1', viewValue: '102 - Public Works Remittances' },
    { value: '2', viewValue: '103 - Forest Remittances' },
  ];

  // List of Sub Head
  subHead_list: ListValue[] = [{ value: '1', viewValue: '01 - Remittances' }];

  // List of Detailed Head
  detailedHead_list: ListValue[] = [{ value: '1', viewValue: '00' }];

  // Table Data for Treasury LC Data
  TreasuryLCData: Treasury[] = [{ employeeNumber: '', employeeName: '' }];

  // Table Columns for Treasury Lc Data
  TreasuryLCDataColumn: string[] = ['srNo', 'employeeNumber', 'employeeName'];

  // Table Data for Sub Treasury LC Data
  SubTreasuryLCData: Treasury[] = [{ employeeNumber: '', employeeName: '' }];

  // Table Columns for Sub Treasury Lc Data
  SubTreasuryLCDataColumn: string[] = [
    'srNo',
    'employeeNumber',
    'employeeName',
  ];

  // List of Attachments
  attachmentTypeCode: any[] = [
    { type: 'stamp-view', attachmentType: 'Supporting Document' },
  ];

  // List of Head of department
  headOfDepartmentList: any[] = [
    { value: '1', viewValue: 'Principal Chief conservator of forest' },
    { value: '2', viewValue: 'Principal Chief conservator of Wild life' },
  ];

  // List Bank Name
  BankName_list: ListValue[] = [
    { value: '1', viewValue: 'State Bank of India' },
  ];
  showTreasuryVar = true;
  errorMessage = lcMessage;
  divisionOfficeAddressValue =
    'Deputy Conservator of Forest, Neat Temple, Gandhinagar';
  administrativeDepartmentValue = 'Forest and Environment Department';
  treasuryOffice = 'District Treasury Office, Gandhinagar';
  districtValue = 'Gandhinagar';
  cardexNoValue = '986';
  ddoCodeValue = '986';
  ddoNameValue = 'Deputy Conservator of Forest';
  noOfSanctionedValue = '2';
  majorHeadValue = '8782';
  subMajorHeadValue = '00';
  minorHeadValue = '103';
  subHeadValue = '01';

  todayDate = new Date();
  anticipatedDateValue = new Date(2019, 1, 15);
  // selectedIndex: number;
  // tabDisable: Boolean = true;
  showRemarksVar = false;
  showDesignationVar = false;
  lcOpeningRequestCreateForm: FormGroup;
  OfficeNameCtrl: FormControl = new FormControl();
  budgetProvisionCtrl: FormControl = new FormControl();
  detailsOfStaffCtrl: FormControl = new FormControl();
  designationCtrl: FormControl = new FormControl();
  BankNameCtrl: FormControl = new FormControl();
  BankBranchCtrl: FormControl = new FormControl();
  CircleNameCtrl: FormControl = new FormControl();
  majorHeadCtrl: FormControl = new FormControl();
  subMajorHeadCtrl: FormControl = new FormControl();
  minorHeadCtrl: FormControl = new FormControl();
  subHeadCtrl: FormControl = new FormControl();
  detailedHeadCtrl: FormControl = new FormControl();
  headOfDepartmentCtrl: FormControl = new FormControl();
  TreasuryLCDataSource = new MatTableDataSource(this.TreasuryLCData);
  SubTreasuryLCDataSource = new MatTableDataSource(this.SubTreasuryLCData);

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    public dialog: MatDialog,
    private router: Router
  ) { }

  // Create object to access Methods of Letter of Credit Directive
  directiveObject = new LetterOfCreditDirectives(
    this.router,
    this.dialog,
    this.el
  );

  ngOnInit() {
    this.lcOpeningRequestCreateFormData();
  }

  // Initialize Form Fields
  lcOpeningRequestCreateFormData() {
    this.lcOpeningRequestCreateForm = this.fb.group({
      divisionName: [
        {
          value: 'Director, Sardar Patel Zological Park, kevadia',
          disabled: true,
        },
      ],
      officeName: [
        {
          value: 'Director, Sardar Patel Zological Park, kevadia',
          disabled: true,
        },
      ],
      divisionOfficeAddress: [
        'At. Po. Limadi (Kevadiya), Ta : Darudeshwar, Dist: Narmada, Gujarat, India',
      ],
      administrativeDepartment: ['Forest And Environment Department'],
      treasuryOffice: [
        { value: 'District Treasury Office, Gandhinagar', disabled: true },
      ],
      district: [{ value: 'Gandhinagar', disabled: true }],
      cardexNo: [{ value: '141', disabled: true }],
      ddoCode: [{ value: '467', disabled: true }],
      ddoName: [
        {
          value: 'Director, Sardar Patel Zological Park, kevadia',
          disabled: true,
        },
      ],
      circleNameHeader: ['2'],
      headOfDepartment: [{ value: '2', disabled: true }],
      otherCircleName: [
        {
          value: 'Conservator of Forest, Wild Life Circle, Vadodara',
          disabled: true,
        },
      ],
      budgetProvision: [''],
      remarks: [{ value: '', disabled: true }],
      lcRemarks: [{ value: '', disabled: true }],
      majorHead: ['1'],
      subMajorHead: ['1'],
      minorHead: ['1'],
      subHead: ['1'],
      bankAccountNumber: ['12345678'],
      bankName: [{ value: '1', disabled: true }],
      bankBranch: ['1'],
      divisionCode: [{ value: '', disabled: true }],
      circleCode: [{ value: 'D098', disabled: true }],
      circleName: ['1'],
      ddoIFMSUserID: ['GAGUJ12345'],
      ddoFullName: ['Test'],
      agAuthorizationNo: [{ value: '', disabled: true }],
      agAuthorizationDate: [{ value: '', disabled: true }],
      detailedHead: ['1'],
      agRemarks: [{ value: '', disabled: true }],
      bankCode: [{ value: '1257', disabled: true }],
      bankRemarks: [{ value: '', disabled: true }],
    });
  }
}
