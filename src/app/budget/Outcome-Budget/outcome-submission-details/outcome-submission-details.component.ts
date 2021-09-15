import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatSlideToggleChange, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CommonListing } from 'src/app/model/common-listing';
import { AchieveAgainstTargetDetails } from 'src/app/model/budget';
import { budgetMessage } from 'src/app/common/error-message/common-message.constants';
import { MacroOutcomeWorkflowComponent } from '../../macro-outcome-details/macro-outcome-workflow/macro-outcome-workflow.component';

@Component({
  selector: 'app-outcome-submission-details',
  templateUrl: './outcome-submission-details.component.html',
  styleUrls: ['./outcome-submission-details.component.css']
})
export class OutcomeSubmissionDetailsComponent implements OnInit {
// Entry field Details
  demandList: CommonListing[] = [
    { value: '1', viewValue: '001:Agriculture and Co-operation Department' }
  ];

  majorHeadList: CommonListing[] = [
    { value: '1', viewValue: '2205: Art and Culture' }
  ];

  subMajorHeadList: CommonListing[] = [
    { value: '1', viewValue: '00: ' }
  ];

  minorHeadList: CommonListing[] = [
    { value: '1', viewValue: '101: Fine Arts Education' }
  ];

  subHeadList: CommonListing[] = [
    { value: '1', viewValue: '01: Grants to Sangeet Natya Bharati' }
  ];

  detailedHeadList: CommonListing[] = [
    { value: '1', viewValue: '00: Grants to Sangeet Natya Bharati' }
  ];

  typeOfSchemeList: CommonListing[] = [
    { value: '1', viewValue: '100% State Sponsored Scheme' },
    { value: '2', viewValue: '100% Centrally Sponsored Scheme' },
    { value: '3', viewValue: 'Partially Sponsored Scheme' }
  ];

// Lisiting table Data
  SchemeData: AchieveAgainstTargetDetails[] = [
      {typeOfScheme: 'Normal', budgetHead: '001:2403:00:800:01:00', nameOfScheme: 'Rinderpest Eradication Programme',
      financialProvision: '0.15', physicalTarget: 'No. of Soil Health Card', physicalTargetInput: 10,
      unit: 'Nos.', quarter1target: 0, quarter1achievement: 0, quarter2target: 0, quarter2achievement: 0,
      quarter3target: 0, quarter3achievement: 0, quarter4target: 0, quarter4achievement: 0,
      cumulativeAchievementActual: 0, cumulativeAchievementIn: 0, quarterlyAchievement1: '', quarterlyAchievement2: '',
      quarterlyAchievement3: '', quarterlyAchievement4: '',
      achievementq1: '', achievementq2: '', achievementq3: '', achievementq4: ''},

      {typeOfScheme: 'Normal', budgetHead: '001:2403:00:800:02:00',
      nameOfScheme: 'Live Stock Census cell in Directorate of Animal Husbandry',
      financialProvision: '0.28', physicalTarget: 'Distribution of micronutrients', physicalTargetInput: 20,
      unit: 'Staff', quarter1target: 0, quarter1achievement: 0, quarter2target: 0, quarter2achievement: 0,
      quarter3target: 0, quarter3achievement: 0, quarter4target: 0, quarter4achievement: 0,
      cumulativeAchievementActual: '', cumulativeAchievementIn: '', quarterlyAchievement1: '', quarterlyAchievement2: '',
      quarterlyAchievement3: '', quarterlyAchievement4: '',
      achievementq1: '', achievementq2: '', achievementq3: '', achievementq4: ''},

      { typeOfScheme: 'Normal', budgetHead: '001:2403:00:101:01:00', nameOfScheme: 'Construction of docks, berths and jetties',
      financialProvision: '25.81', physicalTarget: 'Distribution of Certified seeds', physicalTargetInput: 30,
      unit: 'No. of Beneficiaries', quarter1target: 0, quarter1achievement: 0, quarter2target: 0,
      quarter2achievement: 0, quarter3target: 0, quarter3achievement: 0, quarter4target: 0, quarter4achievement: 0,
      cumulativeAchievementActual: '', cumulativeAchievementIn: '', quarterlyAchievement1: '', quarterlyAchievement2: '',
      quarterlyAchievement3: '', quarterlyAchievement4: '',
      achievementq1: '', achievementq2: '', achievementq3: '', achievementq4: ''},

      { typeOfScheme: 'Normal', budgetHead: '001:2404:00:105:07:00', nameOfScheme: 'Mechanization of Fishing Crafts',
      financialProvision: '4.30', physicalTarget: 'water carrying pipeline', physicalTargetInput: 40,
      unit: 'Days', quarter1target: 0, quarter1achievement: 0, quarter2target: 0, quarter2achievement: 0,
      quarter3target: 0, quarter3achievement: 0, quarter4target: 0, quarter4achievement: 0,
      cumulativeAchievementActual: '', cumulativeAchievementIn: '', quarterlyAchievement1: '', quarterlyAchievement2: '',
      quarterlyAchievement3: '', quarterlyAchievement4: '',
      achievementq1: '', achievementq2: '', achievementq3: '', achievementq4: ''}
  ];
// Listing Table
  headColumnSecond: string[] = ['quarter1', 'quarter2', 'quarter3', 'quarter4'];

  headColumnThird: string[] = ['srno', 'typeOfScheme', 'budgetHead', 'financialProvision',
      'physicalTarget', 'unit', 'quarter1target', 'quarter1achievement',
      'quarter2target', 'quarter2achievement', 'quarter3target', 'quarter3achievement', 'quarter4target',
      'quarter4achievement'];

  headColumnLetter: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O'];
  SchemeDataColumn: string[] = [
        'srno', 'typeOfScheme', 'budgetHead', 'financialProvision', 'physicalTarget', 'physicalTargetInput',
          'unit', 'quarter1target', 'quarter1achievement', 'quarter2target', 'quarter2achievement', 'quarter3target',
          'quarter3achievement', 'quarter4target', 'quarter4achievement'];

  date: Date = new Date();
  showScheme = false;
  spanVal = 25;
  showTabs = false;
  macroOutcomeForm: FormGroup;
  selectedIndex = 0;
  demandCtrl: FormControl = new FormControl();
  majorHeadCtrl: FormControl = new FormControl();
  schemeTypeCtrl: FormControl = new FormControl();
  subMajorHeadCtrl: FormControl = new FormControl();
  minorHeadCtrl: FormControl = new FormControl();
  subHeadCtrl: FormControl = new FormControl();
  detailedHeadCtrl: FormControl = new FormControl();
  SchemeDataSource = new MatTableDataSource(this.SchemeData);
  errorMessages = budgetMessage;
  tabDisable: Boolean = true;
  showSection = true;

  constructor( private fb: FormBuilder, private router: Router,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.macroOutcomeFormData();
  }

  macroOutcomeFormData() {
    this.macroOutcomeForm = this.fb.group({
      dept: ['Agriculture, Farmers Welfare & Co-Operation Department'],
      bpnCode: ['03: Agriculture, Farmers Welfare & Co-Operation Department'],
      finYear: ['2021-2022'],
      deptField: ['Agriculture, Farmers Welfare & Co-Operation Department'],
      bpnCodeField: ['03:Agriculture, Farmers Welfare & Co-Operation Department'],
      demand: [''],
      majorHead: [''],
      subMajorHead: [''],
      minorHead: [''],
      subHead: [''],
      detailedHead: [''],
      schemeType: [''],
    });
  }
  public toggle(event: MatSlideToggleChange) {
    if (event.checked) {
      this.spanVal = 25;
      this.headColumnSecond = ['quarter1', 'quarter2', 'quarter3', 'quarter4',
        'cumulativeAchievement', 'quarterlyAchievement', 'achievements'];

      this.headColumnThird = ['srno', 'typeOfScheme', 'budgetHead', 'financialProvision',
      'physicalTarget', 'unit', 'quarter1target', 'quarter1achievement',
      'quarter2target', 'quarter2achievement', 'quarter3target', 'quarter3achievement', 'quarter4target',
      'quarter4achievement', 'cumulativeAchievementActual', 'cumulativeAchievementIn', 'quarterlyAchievement1',
       'quarterlyAchievement2', 'quarterlyAchievement3', 'quarterlyAchievement4',
        'achievementq1', 'achievementq2', 'achievementq3', 'achievementq4'];

      this.headColumnLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];

      this.SchemeDataColumn = [
        'srno', 'typeOfScheme', 'budgetHead', 'financialProvision', 'physicalTarget', 'physicalTargetInput',
          'unit', 'quarter1target', 'quarter1achievement', 'quarter2target', 'quarter2achievement', 'quarter3target',
          'quarter3achievement', 'quarter4target', 'quarter4achievement', 'cumulativeAchievementActual',
          'cumulativeAchievementIn', 'quarterlyAchievement1', 'quarterlyAchievement2',
          'quarterlyAchievement3', 'quarterlyAchievement4', 'achievementq1', 'achievementq2', 'achievementq3', 'achievementq4'
      ];

    } else {
      this.spanVal = 15;
      this.headColumnSecond = ['quarter1', 'quarter2', 'quarter3', 'quarter4'];

      this.headColumnThird = ['srno', 'typeOfScheme', 'budgetHead', 'financialProvision',
      'physicalTarget', 'unit', 'quarter1target', 'quarter1achievement',
      'quarter2target', 'quarter2achievement', 'quarter3target', 'quarter3achievement', 'quarter4target',
      'quarter4achievement'];

      this.headColumnLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O'];

      this.SchemeDataColumn = [
        'srno', 'typeOfScheme', 'budgetHead', 'financialProvision', 'physicalTarget', 'physicalTargetInput',
          'unit', 'quarter1target', 'quarter1achievement', 'quarter2target', 'quarter2achievement', 'quarter3target',
          'quarter3achievement', 'quarter4target', 'quarter4achievement'];
    }
  }

  // To display Type of Scheme
  updateScheme() {
    if ((this.macroOutcomeForm.controls['demand'].value != '') && (this.macroOutcomeForm.controls['majorHead'].value != '') &&
      (this.macroOutcomeForm.controls['subMajorHead'].value != '') && (this.macroOutcomeForm.controls['minorHead'].value != '') &&
      (this.macroOutcomeForm.controls['subHead'].value != '') && (this.macroOutcomeForm.controls['detailedHead'].value != '')) {
      this.showScheme = true;
      this.macroOutcomeForm.controls.schemeType.setValue('100% State Sponsored Scheme');
    }
  }
  // When add button click
    search() {
      this.showTabs = true;
    }

// Allow only decimal
  decimalKeyPress(event: any) {
    const pattern = /^\d+(\\d{0,0})?$/;
    const inputChar = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    let tempstr = event.target.value;
    tempstr += inputChar;
    if (!pattern.test(tempstr)) {
      event.preventDefault();
      return false;
    }
  }
  // For Getting Tab index
    getTabIndex(tabIndex) {
      this.selectedIndex = tabIndex;
      const temp = this.selectedIndex;
    }
  // Go to next tab
  nextTab() {
    this.selectedIndex++;
  }
// For 2 point decimal
  decimalPoint(data, key) {
    if (data[key]) {
      data[key] = Number(data[key]).toFixed(2);
    }
  }
  // Workflow
  openWorkflow(): void {
    const dialogRef = this.dialog.open(MacroOutcomeWorkflowComponent, {
      width: '2700px',
      height: '600px'
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
