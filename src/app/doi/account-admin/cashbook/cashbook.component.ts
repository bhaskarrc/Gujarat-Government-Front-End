import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-grant';
import { CommonListing } from 'src/app/model/common-listing';
import { MatTableDataSource } from '@angular/material';
import { CashBook, CashBookReciver } from 'src/app/model/doiModel';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css']
})
export class CashbookComponent implements OnInit {
  // Date
  todayDate = Date.now();
  maxDate = new Date();
  // Variable
  errorMessage = doiMessage;
  selectedIndex: number;
  // Form Group
  paymentSideForm: FormGroup;
  receiptSideForm: FormGroup;
  // Form Control
  amtDrawnCtrl: FormControl = new FormControl();
  subHeadCtrl: FormControl = new FormControl();
  majorHeadCtrl: FormControl = new FormControl();
  minorHeadCtrl: FormControl = new FormControl();
  subMajorHeadCtrl: FormControl = new FormControl();
  // List
  amtDrawn_list: ListValue[] = [
    { value: '1', viewValue: 'Abstract Bill' },
    { value: '2', viewValue: 'Detailed Bill' },
    { value: '3', viewValue: 'Other' }
  ];
  majorHead_list: CommonListing[] = [
    { value: '1', viewValue: '3451:Secretariat-Economic Services' },
    {
      value: '2', viewValue: '5475:Capital Outlay on other General Economics Services'
    },
    { value: '3', viewValue: '2401:Crop Husbandry' },
    { value: '4', viewValue: '2071:Pensions and Other Retirement Benefits' },
    { value: '5', viewValue: '2058:Stationery and Printing' }
  ];
  subMajorHead_list: CommonListing[] = [
    { value: '1', viewValue: '00:Secretariat-Economic Services' },

    { value: '2', viewValue: '00:Capital Outlay on other General Economics Services' },

    { value: '3', viewValue: '00:Crop Husbandry' },

    { value: '4', viewValue: '00:Secretariat-Economic Services' },

    { value: '5', viewValue: '00:Capital Outlay on other General Economics Services' },

    { value: '6', viewValue: '01:Civil' },

    { value: '7', viewValue: '00:Stationery and Printing' },

    { value: '8', viewValue: '00::Co-operatio' }
  ];
  minorHead_list: CommonListing[] = [
    { value: '1', viewValue: '090:Secretariat' },
    { value: '2', viewValue: '101:Niti Aayog' },
    { value: '3', viewValue: '101:Direction And Administration' },
    { value: '4', viewValue: '102:Food grain Crops' },
    { value: '5', viewValue: '103:Seed' },
    { value: '6', viewValue: '800:Other Expenditure' },
    { value: '7', viewValue: '108:Contribution to Provident Funds' },
    { value: '8', viewValue: '001:Direction and Administration' },
    { value: '9', viewValue: '101:Purchase and Supply of Stationery Stores' },
    { value: '10', viewValue: '103:Government Presses' },
    { value: '11', viewValue: '105:Government Publications' },
    { value: '12', viewValue: '797:Transfer to Reserve fund and Deposite Account' },
    { value: '13', viewValue: '108:Assistance to other co-operatives' },
    { value: '14', viewValue: '800:Other Expenditure' },
  ];
  subHead_list: CommonListing[] = [
    { value: '1', viewValue: '01:Agricultural and Co-operation Department' },

    { value: '2', viewValue: '01:PLN-10 Planning Machinery in Agriculture.and Co-Operation  Development ' },

    { value: '3', viewValue: '01:AGR-15 Information & Technology' },

    { value: '4', viewValue: '02:Expenditure for Training' },

    { value: '5', viewValue: '01:AGR-Renovation Of The Department' },

    { value: '6', viewValue: '01:Direcorate of Agriculture' },

    { value: '7', viewValue: '02:Divisional Establishmen' },

    { value: '8', viewValue: '03:District Establishment' },

    { value: '9', viewValue: '01:Intensive Agricultural District Programme' },

    { value: '10', viewValue: '02:Subsidy For Increase Production and Productivity In Food Grain Crops (To be Opened)' },

    { value: '11', viewValue: '03:National Food Security Mission' },

    { value: '12', viewValue: '04:AGR() Promoting to farmer for Post Harvesting & Management (value addition)' },

    { value: '13', viewValue: '01:Multiplication and Distribution of various type of cotton' },

    { value: '14', viewValue: '02:Seed Testing Laboratory' },

    { value: '15', viewValue: '03:AGR 5 -Taluka Seed Multiplication Farms' },

    { value: '16', viewValue: '04:Adj.Establishment of seed cell' },

    { value: '17', viewValue: '01:IND-51 Industries and Mines Department' },

    { value: '18', viewValue: '01:IND-1 Planning Machinery in the Industries & Mines Department' },

    { value: '19', viewValue: '02:IND-1 Monitoring of Plan expenditure in Industries and Mines Department' },

    { value: '20', viewValue: '03:IND-45 Evaluation of Schemes under the Industries and Mines Department' },

    { value: '21', viewValue: '01:IND-44 Information Technology' },

    { value: '22', viewValue: '01:OIN-17 Industries & Mines Department' },

    { value: '23', viewValue: '01:Contribution towards employees Provident Funds Scheme for Presses' },

    { value: '24', viewValue: '01:IND-11 Directorate of Printing and Stationery' },

    { value: '25', viewValue: '01:Stationery offices Stores' },

    { value: '26', viewValue: '01:IND-48 Government Presses' },

    { value: '27', viewValue: '02:IND-42 Apprentice Training in Government Presses' },

    { value: '28', viewValue: '01:IND-32 Government Book Depots' },

    { value: '29', viewValue: '01:Depreciation Reserve Fund for Government Presses' },

    { value: '30', viewValue: '01:IND-48 Government Presses' },

    { value: '31', viewValue: '01:IND-12 Financial Assistance to Minority Handloom Weavers Co-operative Societies' },

    { value: '32', viewValue: '02:IND-22 Industrial to Co-operative Financial Assistance to Co-operative package scheme' }
  ];
  // Table Source
  Payment_Data: CashBook[] = [
    {
      date: '',
      srNoOdSubVoucherNo: '',
      paidTo: '',
      receiptToBeCredited: '',
      payAndAllowance: '',
      advance: '',
      travelAllowance: '',
      total: '',
      permanentAdvance: '',
      amtDrawn: '',
      misc: '',
      majorHead: '',
      subMajorHead: '',
      minorHead: '',
      subHead: ''
    }
  ];
  Receiver_Data: CashBookReciver[] = [{
    rdate: '',
    srNoOfBill: '',
    receivedFrom: '',
    chequeNo: '',
    receiptToBeCredited: '',
    payAndAllowance: '',
    advance: '',
    travelAllowance: '',
    permanentAdvance: '',
    amtDrawn: '',
    misc: '',
    total: '',
    majorHead: '',
    subMajorHead: '',
    minorHead: '',
    subHead: '',
    ddNo: ''
  }];
  paymentDataSource = new MatTableDataSource<any>(this.Payment_Data);
  paymentColumns: string[] = ['position', 'date', 'srNoOdSubVoucherNo', 'paidTo', 'receiptToBeCredited',
    'payAndAllowance', 'advance', 'travelAllowance', 'total', 'permanentAdvance', 'amtDrawn', 'misc', 'majorHead',
    'subMajorHead', 'minorHead', 'subHead', 'action'];
  receiverDataSource = new MatTableDataSource<any>(this.Receiver_Data);
  receiverColumns: string[] = ['position', 'rdate', 'srNoOfBill', 'receivedFrom', 'chequeNo',
    'receiptToBeCredited', 'payAndAllowance', 'advance', 'travelAllowance', 'permanentAdvance', 'amtDrawn', 'misc', 'total',
    'majorHead', 'subMajorHead', 'minorHead', 'subHead', 'action'
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.paymentSideForm = this.fb.group({
      date: [''],
      srNoOdSubVoucherNo: [''],
      paidTo: [''],
      receiptToBeCredited: [''],
      payAndAllowance: [''],
      advance: [''],
      travelAllowance: [''],
      total: [''],
      permanentAdvance: [''],
      amtDrawn: [''],
      misc: [''],
      majorHead: [''],
      subMajorHead: [''],
      minorHead: [''],
      subHead: ['']
    });
    this.receiptSideForm = this.fb.group({
      rdate: [''],
      srNoOfBill: [''],
      receivedFrom: [''],
      chequeNo: [''],
      receiptToBeCredited: [''],
      payAndAllowance: [''],
      advance: [''],
      travelAllowance: [''],
      permanentAdvance: [''],
      amtDrawn: [''],
      misc: [''],
      total: [''],
      majorHead: [''],
      subMajorHead: [''],
      minorHead: [''],
      subHead: [''],
      ddNo: ['']
    });
  }
  addRecord() { }
}
