import { FormControl, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';



export class DoiDirectives {


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



}