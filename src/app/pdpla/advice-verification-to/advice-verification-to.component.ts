import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PDPLAServiceDate } from 'src/app/model/pdpla';
import { PdplaDirectives } from 'src/app/common/directive/pdpla';

@Component({
  selector: 'app-advice-verification-to',
  templateUrl: './advice-verification-to.component.html',
  styleUrls: ['./advice-verification-to.component.css']
})
export class AdviceVerificationToComponent implements OnInit {
  // Table Source
  pdplaSavedAdviceData: PDPLAServiceDate[] = [
    {
      adviceNo: '5', pdplaAccNo: 'DDO', officeName: 'District Panchayat', cardexNo: '986',
      virtualTokenNo: '1', adviceAmount: '500.00', adviceDate: '11-Apr-2010'
    },
    {
      adviceNo: '10', pdplaAccNo: 'DDO', officeName: 'District Panchayat', cardexNo: '986',
      virtualTokenNo: '2', adviceAmount: '500.00', adviceDate: '11-Apr-2010'
    }

  ];

  column: string[] = [
    'select', 'srno', 'adviceNo', 'pdplaAccNo', 'officeName', 'cardexNo', 'virtualTokenNo', 'adviceAmount', 'adviceDate', 'action'
  ];
  // Date
  todayDate = new Date();
  isSearch: boolean;
  selection = new SelectionModel<any>(true, []);
  // Form Group
  pdplaSavedAdviceForm: FormGroup;
  // Table Source
  dataSource = new MatTableDataSource<any>(this.pdplaSavedAdviceData);

  constructor(private fb: FormBuilder, public dialog: MatDialog, public router: Router) { }
  directiveObject = new PdplaDirectives(this.router, this.dialog);
  ngOnInit() {
    this.pdplaSavedAdviceFormData();
  }

  pdplaSavedAdviceFormData() {
    this.pdplaSavedAdviceForm = this.fb.group({
      // Formfields

      adviceNumber: [''],
      adviceDate: [''],
      pdplaAccNo: [''],
      cardexNo: [''],
      totalAmount: [''],
      virtualTokenNo: ['']
    });
  }



  search() { }

  // resets form
  resetForm() {
    this.pdplaSavedAdviceForm.reset();
  }

  // routing
  gotoPage() {
    this.router.navigate(['./pdpla/advice-to']);
  }

}