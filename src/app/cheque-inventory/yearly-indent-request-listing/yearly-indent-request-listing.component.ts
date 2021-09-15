import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ListValue } from 'src/app/model/common-grant';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { CommonListing } from 'src/app/model/common-listing';
import { Router } from '@angular/router';
import { RegularIndent } from 'src/app/model/cheque-inventory';

@Component({
  selector: 'app-yearly-indent-request-listing',
  templateUrl: './yearly-indent-request-listing.component.html',
  styleUrls: ['./yearly-indent-request-listing.component.css']
})
export class YearlyIndentRequestListingComponent implements OnInit {
  // variables
  todayDate = Date.now();
  maxDate = new Date();
  yearlyIndentRequestListingForm: FormGroup;

  // form controls
  financialYearCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();
  chequeFormatTypeCtrl: FormControl = new FormControl();

  // status list
  status_list: ListValue[] = [
    { value: '1', viewValue: 'Saved as Draft' },
    { value: '2', viewValue: 'Approved' },
    { value: '3', viewValue: 'Rejected' },
    { value: '4', viewValue: 'Submitted' }
  ];

  // financialYear list
  financialYear_list: ListValue[] = [
    { value: '1', viewValue: '2016-2017' },
    { value: '2', viewValue: '2017-2018' },
    { value: '3', viewValue: '2019-2020' }
  ];

  // chequeFormatType list
  chequeFormatType_list: CommonListing[] = [
    { value: '1', viewValue: 'Cheque Book' },
    { value: '2', viewValue: 'Continuous Roll' }
  ];

  // table data
  Element_Data: RegularIndent[] = [
    {
      financialYear: '2019-2020',
      refNo: '19-20/BUD/RE/001',
      refDate: new Date('12/08/2019'),
      ddoNo: '2001',
      cardexNo: '1002',
      status: '1',
      department: 'Agriculture Department',
      lyingWith: '',
      edit: true
    },
    {
      financialYear: '2019-2020',
      refNo: '19-20/BUD/RE/002',
      refDate: new Date('11/08/2019'),
      ddoNo: '2001',
      cardexNo: '1002',
      status: '4',
      department: 'Tribal Development Department',
      lyingWith: 'NA',
      edit: true
    },
    {
      financialYear: '2019-2020',
      refNo: '19-20/BUD/RE/003',
      refDate: new Date('11/08/2019'),
      ddoNo: '2001',
      cardexNo: '1002',
      status: '3',
      department: 'Education Department',
      lyingWith: '',
      edit: true
    },
  ];

  dataSource = new MatTableDataSource<RegularIndent>(this.Element_Data);
  displayedColumns: string[] = ['position', 'financialYear', 'refNo', 'refDate', 'ddoNo', 'cardexNo',
    'department', 'status', 'lyingWith', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.yearlyIndentRequestListingForm = this.fb.group({
      financialYear: [''],
      ddoNo: [''],
      cardexNo: [''],
      refNo: [''],
      refDate: [''],
      status: [''],
      chequeFormat: [''],
      department: ['']
    });
    this.dataSource.paginator = this.paginator;

  }

  // clear form
  clearForm() {
    this.yearlyIndentRequestListingForm.reset();
  }

  // delete row
  delete(element) {
    this.dataSource.data.splice(element, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  // edit row
  onEdit(element) {
    element.edit = !element.edit;
  }
  // routing
  closeListingPage() {
    this.router.navigate(['./ci/yearly-indent']);
  }


}