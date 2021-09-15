import { Component, OnInit, Inject, ElementRef, ViewChild, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ListValue } from 'src/app/model/common-grant';
import { MatTableDataSource, MatSort } from '@angular/material';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DialogData } from 'src/app/model/standing-charge';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ddoMasage } from 'src/app/common/error-message/common-message.constants';
import {
  HeadDataDetails,
  EdpDetails,
  ChequeDetails,
  ReceiptDetails,
  ReceiptDataSummary,
  ReceiptSummaryDeduction,
  GtrDetailsFoutryList,
  ChequeListTypeDialog2
} from 'src/app/model/ddo-forms';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { DdoDirective } from 'src/app/common/directive/ddo-directive';
import { HeaderElement } from 'src/app/model/common-listing';


const ELEMENT_DATA: HeadDataDetails[] = [

  {
    fundType: 'Consolidated',
    voted: 'Voted',
    stateCss: 'State',
    bSubHeadSt: '017:2054:00:095:01:00:C2 ',
    subHeadDes: 'Treasuries',
    expenditure: 'Standing Charges',
    itemName: '-',
    schemeNo: '000000',
    grantRecievedTillDate: '1000',
    GrantUsedBills: '0',
    Balance: '1000',
    GrantUsedSaved: '2500',
    MoreGrant: '1500'
  },
  {
    fundType: 'Consolidated',
    voted: 'Voted',
    stateCss: 'State',
    bSubHeadSt: '017:2054:00:095:01:00:C2 ',
    subHeadDes: 'Treasuries',
    expenditure: 'Standing Charges',
    itemName: '-',
    schemeNo: '000000',
    grantRecievedTillDate: '1000',
    GrantUsedBills: '100',
    Balance: '900',
    GrantUsedSaved: '2400',
    MoreGrant: '1500'
  },
  {
    fundType: 'Consolidated',
    voted: 'Voted',
    stateCss: 'State',
    bSubHeadSt: '017:2054:00:095:01:00:C2 ',
    subHeadDes: 'Treasuries',
    expenditure: 'Standing Charges',
    itemName: '-',
    schemeNo: '000000',
    grantRecievedTillDate: '1000',
    GrantUsedBills: '900',
    Balance: '100',
    GrantUsedSaved: '1600',
    MoreGrant: '1500'
  },
  {
    fundType: 'Consolidated',
    voted: 'Voted',
    stateCss: 'State',
    bSubHeadSt: '017:2054:00:095:01:00:C2 ',
    subHeadDes: 'Treasuries',
    expenditure: 'New Item',
    itemName: 'Purchase of new car for Director of Agriculture',
    schemeNo: '000000',
    grantRecievedTillDate: '3000',
    GrantUsedBills: '1700',
    Balance: '1300',
    GrantUsedSaved: '800',
    MoreGrant: '-'
  }


];
@Component({
  selector: 'app-gtr-fourty-eight',
  templateUrl: './gtr-fourty-eight.component.html',
  styleUrls: ['./gtr-fourty-eight.component.css']
})

export class GtrFourtyEightComponent implements OnInit {
  isInputEdpCode1 = true;
  majorHeadVal = '';
  subMajorHeadVal = '';
  minorHeadVal = '';
  subHeadVal = '';
  detailHeadVal = '';
  objectClassVal = '';
  headChargeableVal;
  isItemList = false;
  checkTable = true;
  epayment = false;
  paymentTypeDropDown = true;
  gtrfourtyFout = 'FORM G.T.R  48  - Service Postage Stamps';
  refNuber = 'Reference Number:';
  refNuberDate = 'Reference Date:';
  home = 'Home';
  ddo = 'DDO';
  createBill = 'Create Online Bill';
  billPreForm = 'Bill Preparation Form';
  ddoInfo = 'DDO Information';
  budgetDetail = 'Budget Details';
  detailHeaderLable2 = 'Service Postage Stamps Details';
  isInputEdpCode = true;
  isDelete = false;
  ddoParty = false;
  fileBrowseIndex: number;
  todayDate = Date.now();
  date = new FormControl(new Date());
  tabDisable: Boolean = true;
  selectedIndex: number;
  billpreprationformFourtyFour: FormGroup;
  errormsg;
  billRigister;
  BillTransit;
  message;
  amount;
  maxDate = new Date();

  // list
  grossTotl: HeaderElement[] = [
    { label: 'Gross Total', value: '5000.00' },
    { label: 'Recovery', value: '0.00' },
    { label: 'Deduction A', value: '0.00' },
    { label: 'Deduction B', value: '0.00' },
    { label: 'Net Total', value: '5000.00' },
    { label: 'Amount in Rs.', value: 'Five Thousand Only' },
    { label: 'Appropriation For', value: '80000.00' },
    { label: 'Expenditure including this bill', value: '10000.00' },
    { label: 'Balance', value: '70000.00' },
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private el: ElementRef, private router: Router) {

  }

  // lists
  financialYearList: ListValue[] = [
    { value: '1', viewValue: '2019' },
    { value: '2', viewValue: '2020' },
    { value: '3', viewValue: '2021' }
  ];

  monthList: ListValue[] = [
    { value: '1', viewValue: 'January' },
    { value: '2', viewValue: 'February' },
    { value: '3', viewValue: 'March' },
    { value: '4', viewValue: 'April' },
    { value: '5', viewValue: 'May' },
    { value: '6', viewValue: 'June' },
    { value: '7', viewValue: 'July' },
    { value: '8', viewValue: 'August' },
    { value: '9', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' }
  ];

  classTypeList: ListValue[] = [
    { value: '1', viewValue: '1-Voted' },
    { value: '2', viewValue: '2-Charged' }
  ];

  fundTypeList: ListValue[] = [
    { value: '1', viewValue: '3-Consolidated' },
    { value: '2', viewValue: '4-Contingency' }
  ];

  schemeTypeList: ListValue[] = [
    { value: '1', viewValue: '1-State' },
    { value: '2', viewValue: '2-CSS' }
  ];

  demandList: ListValue[] = [
    { value: '017', viewValue: '017:Treasury and Accounts Administration' }
  ];

  majorHeadList: ListValue[] = [
    { value: '2054', viewValue: '2054 : Treasury and Accounts Administration' }
  ];
  subMajorHeadList: ListValue[] = [
    { value: '00', viewValue: '00' }
  ];

  minorHeadList: ListValue[] = [
    { value: '095', viewValue: '095:Directorate of Accounts and Treasuries' },
    { value: '096', viewValue: '096:Pay and Accounts Offices' },
    { value: '097', viewValue: '097:Treasury Establishment' },
  ];

  subHeadList: ListValue[] = [
    { value: '01', viewValue: '01:GES-1 Directorate' },
    { value: '01', viewValue: '01:Pay and Accounts offices ' },
    { value: '01', viewValue: '01:Treasuries' },
  ];

  detailHeadList: ListValue[] = [
    { value: '00', viewValue: '00:GES-1 Directorate' },
    { value: '00', viewValue: '00:Pay and Accounts offices' },
    { value: '00', viewValue: '00:Treasuries' },
  ];

  objectClassList: ListValue[] = [
    { value: 'C2', viewValue: 'C2 : Administrative Expenses' }
  ];
  exemptedTypeList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' }
  ];

  billCodeList: ListValue[] = [
    { value: '1', viewValue: '1 - Pay allow Retirement benefit i.e. ltc & leave encas. at reti' },
    { value: '2', viewValue: '2 - Widow Relief Assistance To Aged Helpless' },
    { value: '3', viewValue: '3 - Bills Of Scarcity' },
    { value: '4', viewValue: '4 - Bills Of Diet Charges Of Hospital' },
    { value: '5', viewValue: '5 - Scolarship / Stipend Bills' },
    { value: '6', viewValue: '6 - Relief On Salestax Levied On Diesel Of Fisherman' },
    { value: '7', viewValue: '7 - Telephone / Light Bills' },
    { value: '8', viewValue: '8 - Petrol / Diesel Bill' }
  ];

  billCategoryList: ListValue[] = [
    { value: '1', viewValue: 'Regular' },
    { value: '2', viewValue: 'Regular/Challan' },
    { value: '3', viewValue: 'TC' },
    { value: '4', viewValue: 'NIL' },
  ];

  paymentTypeList: ListValue[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'e-payment' }
  ];

  typeList: ListValue[] = [
    { value: '1', viewValue: 'Standing Charges' },
    { value: '2', viewValue: 'New Item' },
    { value: '3', viewValue: 'New Work' },
    { value: '4', viewValue: 'Item Continuous' },
    { value: '5', viewValue: 'Work-In-Progress' }
  ];

  chequeTypeList: ListValue[] = [
    { value: '1', viewValue: 'Beneficiary' },
    { value: '2', viewValue: 'Contractor' },
    { value: '3', viewValue: 'GST TDS' },
    { value: '4', viewValue: 'Scholarship' },
    { value: '5', viewValue: 'Service Provider' },
    { value: '5', viewValue: 'Supplier' }
  ];

  chequeList: ListValue[] = [
    { value: '1', viewValue: 'Party Cheque' },
    { value: '2', viewValue: 'DDO Cheque' }
  ];

  itemNameList: ListValue[] = [
    {
      value: '1',
      viewValue: 'Purchase of new car for Director of Agriculture'
    },
    { value: '2', viewValue: 'Purchase of Furniture for the Director Office' },
    { value: '3', viewValue: 'Purchase Furniture for record room of Office' },
    {
      value: '4',
      viewValue: 'Purchase of new Furniture for the Joint Director Office'
    },
    {
      value: '5',
      viewValue: 'Purchase of new Furniture for the Deputy Director'
    }
  ];

  attachmentTypeCode: ListValue[] = [
    { value: '01', viewValue: 'Supporting Document' },
    { value: '02', viewValue: 'Sanction Order' },
    { value: '03', viewValue: 'Others' }
  ];

  // edp details
  expenditureColumn = [
    'budgetCode',
    'description',
    'edpCode',
    'amount',
    'action'
  ];
  expenditureList: EdpDetails[] = [
    { budgetCode: '1300', description: 'Post & Telegraph Expeness', edpCode: '1302', amount: '5000.00' },
  ];
  expenditureDataSource = new MatTableDataSource<EdpDetails>(this.expenditureList);

  // reecipt details
  receiptColumn = [
    'edpCode',
    'description',
    'dedType',
    'majorHead',
    'subMajorHead',
    'minerHead',
    'subHead',
    'amount',
    'action'
  ];
  receiptDataSource = new MatTableDataSource<ReceiptDetails>([]);

  // receipt data summary
  summaryData = [
    'edpCode',
    'chlanDate',
    'pdAccount',
    'party',
    'amount',
    'action'
  ];
  summaryDataSource = new MatTableDataSource<ReceiptDataSummary>([]);


  // receipt summary deduction
  deductionCol = ['expenditure', 'recovery', 'decuctionA', 'decuctionB'];
  deductionList: ReceiptSummaryDeduction[] = [
    { decuctionA: '0.00', decuctionB: '0.00', expenditure: '500.00', recovery: '0.00' }
  ];
  deductionDataSource = new MatTableDataSource<ReceiptSummaryDeduction>(this.deductionList);


  // cheque details
  CheckColumn = [
    'chequeType', 'partyName', 'address', 'accountNo', 'chequeAmount', 'action'];
  checkList: ChequeDetails[] = [
    {
      partyName: '',
      chequeType: '1',
      chequeAmount: '0.00',
      address: '',
      accountNo: ''
    }
  ];
  checkDataSource = new MatTableDataSource<ChequeDetails>(this.checkList);

  // gtr details
  gtrTbableColumn = ['billNo', 'billDate', 'amount', 'voucharNo', 'voucharDate', 'obtainDated', 'postageRegister'];
  gtrDetailList: GtrDetailsFoutryList[] = [
    {
      billNo: '0120',
      amount: '5000.00',
      billDate: '01-Feb-2020',
      voucharNo: '14261',
      voucharDate: '02-Feb-2020',
      obtainDated: '',
      postageRegister: ''
    },
  ];
  gtrDetailDataSource = new MatTableDataSource<GtrDetailsFoutryList>(this.gtrDetailList);

  // e-payment details
  epaymentColumn = ['payeeName', 'accountNo', 'ifscCode', 'amount', 'action'];
  epaymentDataSource = new MatTableDataSource([]);


  // recovery details
  recoveryColumn = ['budgetCode', 'description', 'edpCode', 'amount', 'action'];
  recoveryDataSource = new MatTableDataSource([]);

  // form control
  monthOfCtrl: FormControl = new FormControl();
  financialYearCtrl: FormControl = new FormControl();
  classCtrl: FormControl = new FormControl();
  fundTypeCtrl: FormControl = new FormControl();
  schemeTypeCtrl: FormControl = new FormControl();
  typeCtrl: FormControl = new FormControl();
  demandCtrl: FormControl = new FormControl();
  majorHeadCtrl: FormControl = new FormControl();
  subMajorHeadCtrl: FormControl = new FormControl();
  minorHeadCtrl: FormControl = new FormControl();
  subHeadCtrl: FormControl = new FormControl();
  detailHeadCtrl: FormControl = new FormControl();
  objClassCtrl: FormControl = new FormControl();
  exemptedCtrl: FormControl = new FormControl();
  billCodeCtrl: FormControl = new FormControl();
  billCatCtrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();
  checkTypeCtrl: FormControl = new FormControl();
  itemCtrl: FormControl = new FormControl();
  checkTypeTwoCtrl: FormControl = new FormControl();
  directiveObject = new DdoDirective(this.dialog);


  ngOnInit() {
    this.errormsg = ddoMasage;
    this.billpreprationformFourtyFour = this.fb.group({
      monthOf: ['2'],
      financialYear: ['2'],
      classExp: ['1', Validators.required],
      fundType: ['1', Validators.required],
      type: ['1', Validators.required],
      schemeType: ['1', Validators.required],
      ddoGrantHead: [''],
      schemeNo: [''],
      demand: ['', Validators.required],
      majorHead: ['', Validators.required],
      subMajorHead: ['', Validators.required],
      minorHead: ['', Validators.required],
      subHead: ['', Validators.required],
      detailHead: ['', Validators.required],
      objectClass: ['', Validators.required],
      itemName: ['', Validators.required],
      exempted: ['2'],
      headChargeable: ['', Validators.required],
      billCode: ['', Validators.required],
      billCategory: ['1', Validators.required],
      previousBill: [''],
      paymentType: ['1', Validators.required],
      establishment: ['']
    });
  }

  // sets payment type dropdown value
  billValues(data) {
    if (data.value === '3' || data.value === '4') {
      this.paymentTypeDropDown = false;
    }
    if (data.value === '1' || data.value === '2') {
      this.paymentTypeDropDown = true;
    }
  }

  // get tab index
  getTabIndex(tabIndex) {
    this.selectedIndex = tabIndex;
    const temp = this.selectedIndex;
  }

  // go to next
  goToNext() {
    this.tabDisable = false;
    this.selectedIndex = 1;
  }

  // sets payment type grid on basis of selection of payment type
  payment(data) {
    if (data.value === '1') {
      this.epayment = false;
      this.checkTable = true;
    }
    if (data.value === '2') {
      this.checkTable = false;
      this.epayment = true;
    }
  }

  // selects item
  itemSelect(selectedValue) {
    if (selectedValue.value !== '1') {
      return (this.isItemList = true);
    }
    if (selectedValue.value === '1') {
      return (this.isItemList = false);
    }
  }

  // get total amount
  getTotalAmount(): number {
    let chequeAmount = 0;
    this.checkDataSource.data.forEach(element => {
      chequeAmount = chequeAmount + Number(element.chequeAmount);
    });
    return chequeAmount;
  }

  // total epay amount
  totalAmountEpay(): number {
    let amount = 0;
    this.epaymentDataSource.data.forEach(element => {
      amount = amount + Number(element.amount);
    });
    return amount;
  }

  // calculate total expenditure amount
  totalExpeAmount(): number {
    let amount = 0;
    this.expenditureDataSource.data.forEach((element) => {
      amount = amount + Number(element.amount);
    });
    return amount;
  }

  // calculate total recovery amount
  totalRecovery(): number {
    let amount = 0;
    this.recoveryDataSource.data.forEach((element) => {
      amount = amount + Number(element.amount);
    });
    return amount;
  }

  // calculate total summary amount
  totalSummary(): number {
    let amount = 0;
    this.summaryDataSource.data.forEach((element) => {
      amount = amount + Number(element.amount);
    });
    return amount;
  }

  // calculate receipt total
  reciptTotal(): number {
    let amount = 0;
    this.receiptDataSource.data.forEach((element) => {
      amount = amount + Number(element.amount);
    });
    return amount;
  }

  // open ddo grant head dialog box
  openDialog(data?): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(GTR48Dialog, {
      width: '1900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.majorHeadVal = this.majorHeadList[0].value;
      this.subMajorHeadVal = this.subMajorHeadList[0].value;
      this.minorHeadVal = this.minorHeadList[0].value;
      this.subHeadVal = this.subHeadList[0].value;
      this.detailHeadVal = this.detailHeadList[0].value;
      this.objectClassVal = this.objectClassList[0].value;
      let headcharge;
      if (result == null) {
        headcharge = this.majorHeadList[0].value
          + ':'
          + this.subMajorHeadList[0].value
          + ':'
          + this.minorHeadList[0].value
          + ':'
          + this.subHeadList[0].value
          + ':'
          + this.detailHeadList[0].value
          + ':'
          + this.objectClassList[0].value;
      } else {
        headcharge = result;
      }
      this.billpreprationformFourtyFour.patchValue({
        schemeNo: '000000',
        subMajorHead: this.subMajorHeadList[0].value,
        minorHead: this.minorHeadList[0].value,
        subHead: this.subHeadList[0].value,
        detailHead: this.detailHeadList[0].value,
        type: this.typeList[0].value,
        objectClass: this.objectClassList[0].value,
        billCategory: this.billCategoryList[0].value,
        majorHead: this.majorHeadList[0].value,
        demand: this.demandList[0].value,
        headChargeable: headcharge,
      });
    });
  }

  // calculate headChargable on major head change
  majorHeadChange(data) {
    this.majorHeadVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      subMajorHead: '',
      subHead: '',
      minorHead: '',
      detailHead: '',
      type: '1',
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headChargable on sub major head change
  subMajorHeadChange(data) {
    this.subMajorHeadVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      subHead: '',
      minorHead: '',
      detailHead: '',
      type: '1',
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headChargable on minor head change
  minorHeadChange(data) {
    this.minorHeadVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      subHead: '',
      detailHead: '',
      type: '1',
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headChargable on sub head change
  subHeadChange(data) {
    this.subHeadVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      detailHead: '',
      type: '1',
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headChargable on detail head change
  detailHeadChange(data) {
    this.detailHeadVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      type: '1',
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headChargable on object class change
  objectChange(data) {
    this.objectClassVal = data.value;
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      headChargeable: this.headChargeableVal,
      schemeNo: '000000'
    });
  }

  // calculate headChargable on demand change
  demandChange(data) {
    if (data.value === '017') {

      this.billpreprationformFourtyFour.patchValue({
        majorHead: undefined,
        subMajorHead: '',
        subHead: '',
        minorHead: '',
        detailHead: '',
        objectClass: '',
        headChargeable: '',
      });
    }
  }

  // calculae headchargable on item change
  itemChange(data) {
    this.headChargeableVal = this.majorHeadVal
      + ':'
      + this.subMajorHeadVal
      + ':'
      + this.minorHeadVal
      + ':'
      + this.subHeadVal
      + ':'
      + this.detailHeadVal
      + ':'
      + this.objectClassVal;
    this.billpreprationformFourtyFour.patchValue({
      objectClass: '',
      headChargeable: '',
      schemeNo: ''
    });
  }

  // calculate headchargabe on type of estimate change
  typeChange(data) {
    if (data.value !== 1) {
      this.headChargeableVal = this.majorHeadVal
        + ':'
        + this.subMajorHeadVal
        + ':'
        + this.minorHeadVal
        + ':'
        + this.subHeadVal
        + ':'
        + this.detailHeadVal
        + ':'
        + this.objectClassVal;
      this.billpreprationformFourtyFour.patchValue({
        itemName: '',
        objectClass: '',
        headChargeable: '',
        schemeNo: ''
      });
    } else {
      this.headChargeableVal = this.majorHeadVal
        + ':'
        + this.subMajorHeadVal
        + ':'
        + this.minorHeadVal
        + ':'
        + this.subHeadVal
        + ':'
        + this.detailHeadVal
        + ':'
        + this.objectClassVal;
      this.billpreprationformFourtyFour.patchValue({
        itemName: '',
        objectClass: '',
        headChargeable: '',
        schemeNo: ''
      });
    }
  }

  // reset form
  resetForm() {
    this.billpreprationformFourtyFour.reset();
  }

  // opens dialog box on selection of value from cheque list type
  checkDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(GTR48DialogCheckList, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const p_data = this.epaymentDataSource.data;
      this.isInputEdpCode = false;
      this.isDelete = true;

      p_data.push({
        chequeType: 'Supplier',
        designation: 'Pay of Officers',
        payeeName: 'ABC Ltd',
        accountNo: 32373007812,
        ifscCode: 'SBIN002636',
        amount: '5000.00'
      });
      this.epaymentDataSource.data = p_data;
    });
  }

  // add new row in edp-details
  addLeave() {
    const p_data = this.expenditureDataSource.data;
    this.isInputEdpCode = false;
    this.isDelete = true;
    p_data.push({
      budgetCode: '',
      description: '',
      edpCode: '',
      amount: '0.00'
    });
    this.expenditureDataSource.data = p_data;
  }

  // add new row in payment type cheque
  addNewRow() {
    const p_data = this.checkDataSource.data;
    p_data.push({
      chequeType: '1',
      partyName: '',
      accountNo: '',
      chequeAmount: '0.00',
      address: ''
    });
    this.checkDataSource.data = p_data;
  }

  // add new row in receipt-data summary
  addNewRowReceipt(data) {
    const Col_Data = this.summaryDataSource.data;
    Col_Data.push({
      edpCode: '9720',
      challanDate: '',
      pdAccount: '',
      party: '',
      amount: ''
    });
    this.summaryDataSource.data = Col_Data;
  }

  // add new row in receipt details
  addNewEdpRow() {
    const Col_Data = this.receiptDataSource.data;
    Col_Data.push({
      edpCode: '',
      description: '',
      dedType: '',
      majorHead: '',
      subMajorHead: '',
      minerHead: '',
      subHead: '',
      amount: '0.00'
    });
    this.receiptDataSource.data = Col_Data;
    this.isInputEdpCode1 = false;
  }

  // fill edp description
  fillEdpDescription() {
    const Col_Data = this.receiptDataSource.data;
    Col_Data.push({
      edpCode: '9520',
      description: 'Surcharge On Income Tax',
      dedType: 'A',
      majorHead: '8658',
      subMajorHead: '00',
      minerHead: '112',
      subHead: '00',
      amount: '0.00'
    });
    Col_Data.splice(this.receiptDataSource.data.length - 2, 1);
    this.receiptDataSource.data = Col_Data;
  }

  // add row in recovery details
  addRecovery() {
    const Col_Data = this.recoveryDataSource.data;
    Col_Data.push({
      budgetCode: '',
      description: '',
      edpCode: '',
      amount: ''
    });
    this.recoveryDataSource.data = Col_Data;
  }

  // add recovery data
  recoveryData() {
    const Col_Data = this.recoveryDataSource.data;
    Col_Data.push({
      budgetCode: '0102',
      description: 'Pay of Establishment',
      edpCode: '0102',
      amount: '0.00'
    });
    Col_Data.splice(this.recoveryDataSource.data.length - 2, 1);
    this.recoveryDataSource.data = Col_Data;
  }

  // remove row in receipt details
  removeRow(index) {
    this.receiptDataSource.data.splice(index, 1);
    this.summaryDataSource.data = [];
    this.receiptDataSource = new MatTableDataSource(
      this.receiptDataSource.data
    );

  }

  // delete row in edp-details
  deletExpenditureRow(index) {
    this.expenditureDataSource.data.splice(index, 1);
    this.expenditureDataSource = new MatTableDataSource(
      this.expenditureDataSource.data
    );
  }

  // delete row in e-payment details
  deleteEPaymentRow(index) {
    this.epaymentDataSource.data.splice(index, 1);
    this.epaymentDataSource = new MatTableDataSource(
      this.epaymentDataSource.data
    );
  }

  // remove row in receipt-data summary
  removeRowSummary(index) {
    this.summaryDataSource.data.splice(index, 1);
    this.summaryDataSource = new MatTableDataSource(this.summaryDataSource.data);
  }

  // delete row in cheque payment type
  addDeleteChequeDataRow(index) {
    this.checkDataSource.data.splice(index, 1);
    this.checkDataSource = new MatTableDataSource(this.checkDataSource.data);
  }

  // delete row in recovery details
  deleteRowRecovery(index) {
    this.recoveryDataSource.data.splice(index, 1);
    this.recoveryDataSource = new MatTableDataSource(
      this.recoveryDataSource.data
    );
  }

  // change party name on basis of cheque type
  changeDDovalue(data, i) {

    if (data.value === '1') {
      this.ddoParty = false;
      this.checkList.splice(i, 1, {
        chequeType: '1',
        partyName: '',
        address: '',
        accountNo: '',
        chequeAmount: '0.00',
      });
      this.checkDataSource = new MatTableDataSource(this.checkList);
    }
    if (data.value === '2') {
      this.ddoParty = false;
      this.checkList.splice(i, 1, {
        chequeType: '2',
        partyName: 'District Treasury Officer, District Treasury Office, Gandhinagar',
        address: '',
        accountNo: '',
        chequeAmount: '0.00',
      });
      this.checkDataSource = new MatTableDataSource(this.checkList);
      this.ddoParty = true;

    }
  }

  // navigates to report
  goToReport() {
    this.router.navigate(['/ddo/report-gtr-48']);
  }

  // naviagte to cheque list
  gotoCheckList() {
    this.router.navigate(['/ddo/cheque-list']);
  }

}
/*end 1 Component checkDataSource*/


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'gtr48-dialog',
  templateUrl: 'gtr48-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class GTR48Dialog {
  constructor(private router: Router,
    public dialogRef: MatDialogRef<GTR48Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  displayedColumns: string[] = [
    'fundType',
    'voted',
    'stateCss',
    'bSubHeadSt',
    'subHeadDes',
    'expenditure',
    'itemName',
    'schemeNo',
    'grantRecievedTillDate',
    'GrantUsedBills',
    'Balance',
    'GrantUsedSaved',
    'MoreGrant'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // closes dialog on click of close button
  onNoClick(): void {
    this.dialogRef.close();
  }

  // closes pop up on selecting budget head
  selectBudgetHead(data): void {
    this.dialogRef.close();
  }
}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'gtr-48dialog-CheckList-dialog',
  templateUrl: 'gtr-48-dialog-Check-List.html',
})
// tslint:disable-next-line: component-class-suffix
export class GTR48DialogCheckList {
  elementData: ChequeListTypeDialog2[] = [
    {
      venderDetails: ' ',
      vender: 'ABC Ltd',
      checkType: 'Contractor',
      accountNo: '3600178925',
      ifscCode: 'SBIN002636',
      bankBranchName: 'sargasan',
      panNo: 'EOXPS8331P',
      rateOfIncomeTax: '10.00',
      mobileNo: '8825077304'
    },
    {
      venderDetails: ' ',
      vender: 'XAT Ltd',
      checkType: 'Contractor',
      accountNo: '3600178926',
      ifscCode: 'SBIN002636',
      bankBranchName: 'Kudasan',
      panNo: 'EOXPS8331Q',
      rateOfIncomeTax: '10.00',
      mobileNo: '8825077604'
    },
    {
      venderDetails: ' ',
      vender: 'YAB Ltd',
      checkType: 'Contractor',
      accountNo: '3600178927',
      ifscCode: 'SBIN002636',
      bankBranchName: 'sargasan',
      panNo: 'EOXPS8331R',
      rateOfIncomeTax: '10.00',
      mobileNo: '8825077604'
    },
    {
      venderDetails: ' ',
      vender: 'ZCCB Ltd',
      checkType: 'Contractor',
      accountNo: '3600178985',
      ifscCode: 'SBIN002636',
      bankBranchName: 'Kudasan',
      panNo: 'EOXPS8331S',
      rateOfIncomeTax: '10.00',
      mobileNo: '8825077904'
    },
    {
      venderDetails: ' ',
      vender: 'CAXD Ltd',
      checkType: 'Contractor',
      accountNo: '3600178929',
      ifscCode: 'SBIN002638',
      bankBranchName: 'Randesan',
      panNo: 'EOXPS8331T',
      rateOfIncomeTax: '10.00',
      mobileNo: '8825077104'
    },
    {
      venderDetails: ' ',
      vender: 'VET Ltd',
      checkType: 'Contractor',
      accountNo: '3600178922',
      ifscCode: 'SBIN002639',
      bankBranchName: 'sargasan',
      panNo: 'EOXPS8331U',
      rateOfIncomeTax: '10.00', mobileNo: '8825077504'
    },
    {
      venderDetails: ' ',
      vender: 'NETR Ltd',
      checkType: 'Contractor',
      accountNo: '3600178921',
      ifscCode: 'SBIN002640',
      bankBranchName: 'Randesan',
      panNo: 'EOXPS8331V', rateOfIncomeTax: '10.00', mobileNo: '8825077704'
    },
  ];

  // variable
  filterElementData: ChequeListTypeDialog2[];

  // form group
  smartSearch: FormGroup;
  dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.elementData);
  directiveObj = new CommonDirective(this.route);
  selection = new SelectionModel<ChequeListTypeDialog2>(true, []);
  displayedColumns: string[] = [
    'select',
    'vender',
    'checkType',
    'accountNo',
    'ifscCode',
    'bankBranchName',
    'panNo',
    'rateOfIncomeTax',
    'mobileNo'];
  checkTypeNameCtrl: FormControl = new FormControl();
  @ViewChild(MatSort) sort: MatSort;
  checkTypeNameList: ListValue[] = [
    { value: '1', viewValue: 'Beneficary' },
    { value: '2', viewValue: 'Contractor' },
    { value: '3', viewValue: 'Grant In Aid' },
    { value: '4', viewValue: 'GST / TDS' },
    { value: '5', viewValue: 'Scholorship' },
    { value: '6', viewValue: 'Service Provider' },
    { value: '7', viewValue: 'Supplier ' },
  ];
  error_message = 'Please enter valid format of PAN No. in format Like :  AAAAA1111A';
  isIFSCValid;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GTR48DialogCheckList>, private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.smartSearch = this.fb.group({

      vendorName: [''],
      checkTypeName: [''],
      accountNoName: [''],
      ifscCode: [''],
      branchName: [''],
      panNoName: ['', Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)],
      rateOfIncomeTax: [''],
      mobileNoName: ['']
    });
  }

  // checks the data from the table on the basis of the field value
  onSearch() {
    const formVal = this.smartSearch.value;
    if (formVal.vendorName !== '' && formVal.vendorName != null) {
      this.filterElementData = this.elementData.filter(
        searchByVendor => searchByVendor.vender.toLowerCase() === formVal.vendorName.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
    }

    if (formVal.checkTypeName !== '' && formVal.checkTypeName != null) {
      if (formVal.checkTypeName === '1') {
        const checkTypeNameValue = 'Beneficary';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '2') {
        const checkTypeNameValue = 'Contractor';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '3') {
        const checkTypeNameValue = 'Grant In Aid';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '4') {
        const checkTypeNameValue = 'GST / TDS';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '5') {
        const checkTypeNameValue = 'Scholorship';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '6') {
        const checkTypeNameValue = 'Service Provider';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
      if (formVal.checkTypeName === '7') {
        const checkTypeNameValue = 'Supplier';
        this.filterElementData = this.elementData.filter(
          searchByCheckType => searchByCheckType.checkType.toLowerCase() === checkTypeNameValue.toLowerCase());
        this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      }
    }

    if (formVal.accountNoName !== '' && formVal.accountNoName != null) {
      this.filterElementData = this.elementData.filter(
        searchByAccount => searchByAccount.accountNo.toLowerCase() === formVal.accountNoName.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
    }

    if (formVal.ifscCode !== '' && formVal.ifscCode != null) {
      this.filterElementData = this.elementData.filter(
        searchByifscCode => searchByifscCode.ifscCode.toLowerCase() === formVal.ifscCode.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
      if (this.filterElementData.length !== 0) {
        this.isIFSCValid = true;
      } else {
        this.isIFSCValid = false;
      }
    }


    if (formVal.branchName !== '' && formVal.branchName != null) {
      this.filterElementData = this.elementData.filter(
        searchByBranch => searchByBranch.bankBranchName.toLowerCase() === formVal.branchName.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);

    }

    if (formVal.panNoName !== '' && formVal.panNoName != null) {
      this.filterElementData = this.elementData.filter(
        searchByPan => searchByPan.panNo === formVal.panNoName);
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
    }

    if (formVal.rateOfIncomeTax !== '' && formVal.rateOfIncomeTax != null) {
      this.filterElementData = this.elementData.filter(
        searchByrateOfIncomeTax => searchByrateOfIncomeTax.rateOfIncomeTax.toLowerCase() === formVal.rateOfIncomeTax.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
    }

    if (formVal.mobileNoName !== '' && formVal.mobileNoName != null) {
      this.filterElementData = this.elementData.filter(
        searchByMobile => searchByMobile.mobileNo.toLowerCase() === formVal.mobileNoName.toLowerCase());
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.filterElementData);
    }


    if ((formVal.vendorName === '' || formVal.vendorName == null)
      && (formVal.checkTypeName === '' || formVal.checkTypeName == null)
      && (formVal.accountNoName === '' || formVal.accountNoName == null)
      && (formVal.panNoName === '' || formVal.panNoName == null)
      && (formVal.mobileNoName === '' || formVal.mobileNoName == null)
      && (formVal.branchName === '' || formVal.branchName == null)
      && (formVal.ifscCode === '' || formVal.ifscCode == null)) {
      this.dataSource = new MatTableDataSource<ChequeListTypeDialog2>(this.elementData);
    }
  }

  // checks is IFSC code valid or not
  checkIfsc() {
    const formVal = this.smartSearch.value;
    if (formVal.ifscCode !== '' && formVal.ifscCode != null) {
      this.filterElementData = this.elementData.filter(
        searchByifscCode => searchByifscCode.ifscCode.toLowerCase() === formVal.ifscCode.toLowerCase());

      if (this.filterElementData.length !== 0) {
        this.isIFSCValid = true;
      } else {
        this.isIFSCValid = false;
      }
    }
  }

  // returns thr form control
  get fc() {
    return this.smartSearch.controls;
  }

  // reset the form
  clearForm() {
    this.smartSearch.reset();

  }

  // closes dialog on click of close button
  onNoClick(): void {
    this.dialogRef.close();
  }

}