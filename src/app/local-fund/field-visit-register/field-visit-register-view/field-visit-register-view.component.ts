import { CommonListing } from 'src/app/model/common-listing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FieldVisitRegister } from 'src/app/model/local-fund';
@Component({
  selector: 'app-field-visit-register-view',
  templateUrl: './field-visit-register-view.component.html',
  styleUrls: ['./field-visit-register-view.component.css']
})
export class FieldVisitRegisterViewComponent implements OnInit {
  // variable
  referenceNumber = 'Reference Number:';
  referenceNumberDate = 'Reference Date:';
  // date
  todayDate = Date.now();
  // form group
  fieldVisit: FormGroup;
  // form control
  instituteTypeCtrl: FormControl = new FormControl();
  instituteNameCtrl: FormControl = new FormControl();
  auditYearCtrl: FormControl = new FormControl();

  // list start
  instituteTypeList: CommonListing[] = [
    { value: '0', viewValue: 'Maha Nagar Palika' },
    { value: '1', viewValue: 'Nagarpalika' },
    { value: '2', viewValue: 'District Panchayat' },
    { value: '3', viewValue: 'Taluka Panchayat' },
    { value: '4', viewValue: 'University' },
    { value: '5', viewValue: 'Municiple School Board' },
    { value: '6', viewValue: 'Village Panchayat' },
    { value: '7', viewValue: 'Police Welfare Fund' },
    { value: '8', viewValue: 'Provident Fund of District Panchayat' },
    { value: '9', viewValue: 'Provident Fund of Secondary Education office' },
    { value: '10', viewValue: 'Ambaji Temple Trust' },
    { value: '11', viewValue: 'Others' },

  ];

  instituteNameList: CommonListing[] = [
    { value: '0', viewValue: 'Dahegam Nagarpalika' },
    { value: '1', viewValue: 'DMDG' },
  ];
  auditYearList: CommonListing[] = [
    { value: '0', viewValue: '2001-02' },
    { value: '1', viewValue: '2002-03' },
    { value: '2', viewValue: '2003-04' },
    { value: '3', viewValue: '2004-05' },
    { value: '4', viewValue: '2005-06' },
    { value: '5', viewValue: '2006-07' },
    { value: '6', viewValue: '2007-08' },
    { value: '7', viewValue: '2008-09' },
    { value: '8', viewValue: '2009-10' },
    { value: '9', viewValue: '2010-11' },
    { value: '10', viewValue: '2011-12' },
    { value: '11', viewValue: '2012-13' },
    { value: '12', viewValue: '2013-14' },
    { value: '13', viewValue: '2014-15' },
    { value: '14', viewValue: '2015-16' },
    { value: '15', viewValue: '2016-17' },
    { value: '16', viewValue: '2017-18' },
    { value: '17', viewValue: '2018-19' },
    { value: '18', viewValue: '2019-20' },
  ];
  // lists end

  // table data start
  elementData: FieldVisitRegister[] = [
    {
      id: '1',
      district: 'Ahmedabad',
      instituteName: 'AMC',
      instituteType: 'Municiple Corporation',
      auditYear: '2018-19',
      auditDate: '08-Apr-2019',
      sancManDays: '10',
      auditName: 'Mr M K Shah',
      desig: 'Auditor',
      auditSal: '60960',
      visitFromDate: '10-Apr-2019',
      visitToDate: '20-Mar-2019',
      failReason: 'Field Audit',
      reportDate: '25-Mar-2019',
      auditPenAmt: '10000',
      recAmt: '10000',
      amtRecDate: '23-Mar-2019',
      remarks: 'NA'
    },
    {
      id: '5',
      district: 'Ahmedabad',
      instituteName: 'Ahmedabad District Panchayat',
      instituteType: 'District Office',
      auditYear: '2018-19',
      auditDate: '08-Jul-2019',
      sancManDays: '10',
      auditName: 'Mr K S Patel',
      desig: 'Auditor',
      auditSal: '62960',
      visitFromDate: '08-Apr-2019',
      visitToDate: '20-Jul-2019',
      failReason: 'Field Audit',
      reportDate: '22-Jul-2019',
      auditPenAmt: '25000',
      recAmt: '25000',
      amtRecDate: '21-Jul-2019',
      remarks: 'NA'
    },
    {
      id: '8',
      district: 'Ahmedabad',
      instituteName: 'Ahmedabad District LF office',
      instituteType: 'District Office',
      auditYear: '2019-20',
      auditDate: '15-Apr-2010',
      sancManDays: '15',
      auditName: 'Mr. M P Parmar',
      desig: 'Auditor',
      auditSal: '68560',
      visitFromDate: '10-Apr-2020',
      visitToDate: '05-Apr-2020',
      failReason: 'Field Audit',
      reportDate: '8-Apr-2020',
      auditPenAmt: '27000',
      recAmt: '27000',
      amtRecDate: '06-Apr-2020',
      remarks: 'NA'
    },
    {
      id: '10',
      district: 'Ahmedabad',
      instituteName: 'Ahmedabad District Revenue Office',
      instituteType: 'District Office',
      auditYear: '2019-20',
      auditDate: '06-Apr-2010',
      sancManDays: '20',
      auditName: 'Mr. S K Dabhi',
      desig: 'Auditor',
      auditSal: '69745',
      visitFromDate: '15-Apr-2019',
      visitToDate: '27-Apr-2019',
      failReason: 'Field Audit',
      reportDate: '30-Mar-2019',
      auditPenAmt: '34000',
      recAmt: '34000',
      amtRecDate: '28-Mar-2019',
      remarks: 'NA'
    },
  ];
  dataSource = new MatTableDataSource<any>(this.elementData);
  displayedColumns: string[] = [
    'serialNo',
    'id',
    'district',
    'instituteName',
    'instituteType',
    'auditYear',
    'auditDate',
    'sancManDays',
    'auditName',
    'desig',
    'auditSal',
    'visitFromDate',
    'visitToDate',
    'failReason',
    'reportDate',
    'auditPenAmt',
    'recAmt',
    'amtRecDate',
    'remarks',
  ];
  // table data end

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.submitForm();
  }

  // form data
  submitForm() {
    this.fieldVisit = this.fb.group({
      id: ['21'],
      district: ['Ahmedabad'],
      instituteType: [{ value: '2', disabled: true }],
      instituteName: ['District Panchayat - Ahmedabad'],
      auditYear: [{ value: '18', disabled: true }],
      auditDate: [{ value: '20-Apr-2020', disabled: true }],
      auditFromDate: [{ value: '20-Apr-2020', disabled: true }],
      auditToDate: [{ value: '15-Jun-2020', disabled: true }],
      sancManDays: ['10'],
      auditName: ['Mr K S Patel'],
      desig: ['Auditor'],
      auditSal: ['64570'],
      visitFromDate: [{ value: '23-Apr-2020', disabled: true }],
      visitToDate: [{ value: '19-Jun-2020', disabled: true }],
      failReason: ['Field Audit'],
      reportDate: [{ value: '23-Jul-2020', disabled: true }],
      auditPenAmt: ['25000'],
      recAmt: ['25000'],
      amtRecDate: [{ value: '23-Jul-2020', disabled: true }],
      remarks: ['NA'],
    });
  }

}