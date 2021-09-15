
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';


const ELEMENT_DATA: any[] = [
  {
    tNo: '100000023',
    cpIn: '565689783354899',
    cIn: '565689783354899',
    status: 'Yes',
    vDate: '15-May-2019',
    fileNo: 'AD',
  },

  {
    tNo: '100000024',
    cpIn: '565689783354897',
    cIn: '565689783354895',
    status: 'No',
    vDate: '15-May-2018',
    fileNo: 'SD',
  },
];
@Component({
  selector: 'app-block-cpin-ha-listing',
  templateUrl: './block-cpin-ha-listing.component.html',
  styleUrls: ['./block-cpin-ha-listing.component.css']
})
export class BlockCpinHaListingComponent implements OnInit {
  todayDate = Date.now();
  initiatiomdate = new Date((new Date()));
  maxDate = new Date();
  isSubmitted: boolean = false;
  blockCpinhaForm: FormGroup;
  selection = new SelectionModel<any>(true, []);
  displayedColumns = ['checkBox', 'tNo', 'cpIn', 'cIn', 'status', 'vDate', 'fileNo', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private fb: FormBuilder, public dialog: MatDialog, ) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.blockCpinhaForm = this.fb.group({
      tId: [''],
      cinNo: [''],
      cin: [''],
      status: [''],
      fDate: [''],
      fNo: [''],

    });
  }

  onSave() {
    if (this.blockCpinhaForm.valid) {
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  delete(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

}


