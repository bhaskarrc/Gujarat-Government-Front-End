import { CommonListing } from 'src/app/model/common-listing';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CloseConfirmCommonDialogComponent } from '../close-confirm-common-dialog/close-confirm-common-dialog.component';
import { SubmitConfirmCommonDialigComponent } from '../submit-confirm-common-dialig/submit-confirm-common-dialig.component';
import { ToastrService } from 'ngx-toastr';
import { StampDetailsCommonPopupComponent } from '../stamp-details-common-popup/stamp-details-common-popup.component';
import { stampProcessMessage } from 'src/app/common/error-message/common-message.constants';
import { ElementRecSTo } from 'src/app/model/stamp-processing';
import { StampProcessingDirectives } from 'src/app/common/directive/stamp-processing-directive';


// Listing table data

const ELEMENT_DATA: ElementRecSTo[] = [
  {
    deno: '1',
    prevIndent: '20',
    qtyprevIndent: '3',
    reuseQty: '5',
    qtyApp: '10',
    unitQty: '30',
    stampSheet: '6',
    fromSeries: 'A-000001',
    toSeries: 'A-000100',
    reuseQtySub: '5',
  },
  {
    deno: '2',
    prevIndent: '20',
    qtyprevIndent: '4',
    reuseQty: '5',
    qtyApp: '10',
    unitQty: '50',
    stampSheet: '2',
    fromSeries: 'B-000001',
    toSeries: 'B-000100',
    reuseQtySub: '5',
  }, {
    deno: '5',
    prevIndent: '20',
    qtyprevIndent: '6',
    reuseQty: '5',
    qtyApp: '10',
    unitQty: '30',
    stampSheet: '6',
    fromSeries: 'C-000001',
    toSeries: 'C-000100',
    reuseQtySub: '6',
  }, {
    deno: '10',
    prevIndent: '20',
    qtyprevIndent: '3',
    reuseQty: '5',
    qtyApp: '10',
    unitQty: '20',
    stampSheet: '1',
    fromSeries: 'D-000001',
    toSeries: 'D-000100',
    reuseQtySub: '10',
  }, {
    deno: '20',
    prevIndent: '20',
    qtyprevIndent: '3',
    reuseQty: '5',
    qtyApp: '10',
    unitQty: '10',
    stampSheet: '2',
    fromSeries: 'E-000001',
    toSeries: 'E-000100',
    reuseQtySub: '11',
  },
];


@Component({
  selector: 'app-stamp-receipt-sto',
  templateUrl: './stamp-receipt-sto.component.html',
  styleUrls: ['./stamp-receipt-sto.component.css']
})
export class StampReceiptStoComponent implements OnInit {
// Entry Field Details
  indentNumber_List: CommonListing[] = [
  { value: '1', viewValue: '51/00057/072019/23'},
  { value: '2', viewValue: '51/00057/072019/32'},
  { value: '3', viewValue: '51/00057/072019/44'},
  ];


  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // Entry Table
  displayedColumns = ['position', 'deno', 'prevIndent', 'qtyprevIndent', 'reuseQty', 'qtyApp', 'unitQty',
  'stampSheet', 'fromSeries', 'toSeries', 'remark', 'action'];
  indentNumberCtrl: FormControl = new FormControl;
  errorMessages = stampProcessMessage;
  directiveObject = new StampProcessingDirectives(this.router, this.dialog);

  stampSubReceipt: FormGroup;
date: any = new Date();
subTreOffVal = 'Sub Treasury Office, Mansa';
indentToVal = 'District Treasury Office, Gandhinagar';
stampVal: string;
onAdd = false;

constructor(private fb: FormBuilder,
  private router: Router,
  public dialog: MatDialog,
  private toastr: ToastrService,
  private el: ElementRef) {
}

ngOnInit() {
  this.createForm();
}

createForm() {
  this.stampSubReceipt = this.fb.group({
    finYear: ['2019-2020', Validators.required],
    subTreOff: [''],
    recDate: [''],
    indentTo: [''],
    venParty: ['', Validators.required],
    indentNumber: ['', Validators.required],
  });
}

whenAddClick() {
    this.onAdd = true;
}

gotoListing() {
  this.router.navigate(['./stamp-processing/stamp-receipt-sto-list']);
}
}
