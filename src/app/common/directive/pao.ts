import { FormControl, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { WorkflowDetailsGrantPaoComponent } from 'src/app/pao/cheque/cheque-for-correction/workflow-details-grant-pao/workflow-details-grant-pao.component';
import { VerifypopupdialogComponent } from 'src/app/treasury-bill/verifypopupdialog/verifypopupdialog.component';
import { TokenSearchDialogComponent } from 'src/app/pao/token-search-dialog/token-search-dialog.component';


export class PaoDirectives {


    constructor(private router: Router, private dialog: MatDialog) { }

    selection = new SelectionModel<any>(true, []);
    // Methods for Checkbox Selection Starts
    masterToggle(dataSourceData) {
        this.isAllSelected(dataSourceData)
            ? this.selection.clear()
            : dataSourceData.forEach(row =>
                this.selection.select(row)
            );
    }

    isAllSelected(dataSourceData) {
        const numSelected = this.selection.selected.length;
        const numRows = dataSourceData.length;
        return numSelected === numRows;
    }

    checkboxLabel(dataSourceData, row?: any): string {
        if (!row) {
            return `${this.isAllSelected(dataSourceData) ? 'select' : 'deselect'} all`;
        }
        return `${
            this.selection.isSelected(row) ? 'deselect' : 'select'
            } row ${row.position + 1}`;
    }


    // opens workflow dialog box
    workflowDetails(): void {
        const dialogRef = this.dialog.open(WorkflowDetailsGrantPaoComponent, {
            width: '1200px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    // verifyPopup Dialg Box
    openVerifyPopup() {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(VerifypopupdialogComponent, {
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'no') {
                console.log('The dialog was closed', result);
            } else if (result === 'yes') {
                console.log('The dialog was closed', result);
            }
        });
    }
    // TOken Search Dialg Box
    tokenDialog() {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(TokenSearchDialogComponent, {
            width: '800px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'no') {
                console.log('The dialog was closed', result);
            } else if (result === 'yes') {
                console.log('The dialog was closed', result);
            }
        });
    }
}