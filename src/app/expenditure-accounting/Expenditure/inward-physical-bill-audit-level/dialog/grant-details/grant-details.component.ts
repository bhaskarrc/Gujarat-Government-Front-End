import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
const data: any[] = [{
  orderNo: '1224',
  month: 'may-july',
  headClass: '017:2054:00:097:01:00:C2',
  grandType: 'Revenue',
  state: '10',
  css: '0',
  total: '10',
  controlling: 'Finance department',
  normaLc: 'normal',
}
  ,
{
  orderNo: '1225',
  month: 'may-july',
  headClass: '017:2054:00:096:01:00:C5',
  grandType: 'Revenue',
  state: '10',
  css: '0',
  total: '10',
  controlling: 'Finance department',
  normaLc: 'normal',
},
];

@Component({
  selector: 'app-grant-details',
  templateUrl: './grant-details.component.html',
  styleUrls: ['./grant-details.component.css']
})
export class GrantDetailsPaoAuditComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'orderNo', 'month', 'headClass', 'grandType', 'state', 'css', 'total', 'controlling', 'normaLc'];
  dataSource = new MatTableDataSource(data);
  constructor(public dialogRef: MatDialogRef<GrantDetailsPaoAuditComponent>) { }

  ngOnInit() {
  }
  goToDashboard(): void {
    this.dialogRef.close('no');
  }
}
