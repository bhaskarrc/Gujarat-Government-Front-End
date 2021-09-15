import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SearchInwardNoDppfNpsComponent } from '../search-inward-no-dppf-nps/search-inward-no-dppf-nps.component';
import { SearchCardexDppfNpsComponent } from '../search-cardex-dppf-nps/search-cardex-dppf-nps.component';
import { SearchPpaDppfNpsComponent } from '../search-ppa-dppf-nps/search-ppa-dppf-nps.component';
import { SearchEmployeeDppfNpsComponent } from '../search-employee-dppf-nps/search-employee-dppf-nps.component';
import { SelectionModel } from '@angular/cdk/collections';
import { WorkflowDetailsDppfNpsComponent } from '../workflow-details-dppf-nps/workflow-details-dppf-nps.component';

@Component({
  selector: 'app-nps-sent-withdrawal-cases',
  templateUrl: './nps-sent-withdrawal-cases.component.html',
  styleUrls: ['./nps-sent-withdrawal-cases.component.css']
})
export class NpsSentWithdrawalCasesComponent implements OnInit {
  // List
  withdrawalList: any[] = [
    { value: '1', viewValue: 'Partial' },
    { value: '2', viewValue: 'Final' },
  ];

  finalList: any[] = [
    { value: '1', viewValue: 'Superannuation' },
    { value: '2', viewValue: 'Registration' },
    { value: '3', viewValue: 'Death' },
  ];
  // Table Source
  savedWithdrawalCasesData: any[] = [
    // tslint:disable-next-line: max-line-length
    { employeeId: '', ppanNo: '', pranNo: '', name: '', claimId: '', withdrawal: '', officeName: '', nsdlAck: '', ddoRegistrationNo: '', status: '' }
  ];

  savedWithdrawalCasesDataColumn: string[] = [
    // tslint:disable-next-line: max-line-length
    'srno', 'employeeId', 'ppanNo', 'pranNo', 'name', 'claimId', 'withdrawal', 'officeName', 'nsdlAck', 'ddoRegistrationNo', 'status', 'action'
  ];
  // Date
  todayDate = new Date();
  // Variable
  empdetails = true;
  inwardDetails = true;
  selection = new SelectionModel<any>(true, []);
  // FormGroup
  ddoSideWithdrawalForm: FormGroup;
  // Form Control
  attachmentTypeCodeCtrl: FormControl = new FormControl();
  withdrawalCTRL: FormControl = new FormControl();
  finalCTRL: FormControl = new FormControl();
  savedWithdrawalCasesDataSource = new MatTableDataSource(this.savedWithdrawalCasesData);
  // constructor
  constructor(private fb: FormBuilder, private el: ElementRef, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.ddoSideWithdrawalFormData();
  }

  ddoSideWithdrawalFormData() {
    this.ddoSideWithdrawalForm = this.fb.group({
      employeeNumber: [''],
      ppaNo: [''],
      pranNo: [''],
      withdrawal: [''],
      final: [''],
      name: [''],
      claimID: [''],
      officeName: [''],
      nsdlAcknowledgementNo: [''],
      ddoRegistrationNo: [''],
      status: [''],
    });
  }
  // Workflow Details DppfNps 
  workflowDetails(): void {
    const dialogRef = this.dialog.open(WorkflowDetailsDppfNpsComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  printDetails() {
    // this.router.navigate(['/dppf-nps/print-annexure-two']);
  }

  search() {

  }
  // Search Ppa DppfNps 

  openDialogPPANumber() {
    const dialogRef = this.dialog.open(SearchPpaDppfNpsComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.inwardDetails = true;
        this.ddoSideWithdrawalForm.patchValue({
          ppaNo: result[0].ppaNo,
        });
      }
    });
  }
  // Search Employee DppfNps 
  openDialogEmployeeNumber() {
    const dialogRef = this.dialog.open(SearchEmployeeDppfNpsComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.empdetails = true;
        this.ddoSideWithdrawalForm.patchValue({
          payFixationEmployeeNumber: result[0].employeeNumber,
          employeeName: result[0].employeeName,
          designation: result[0].designation,
        });
      }
    });
  }


}
