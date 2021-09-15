


import { CommonListing } from 'src/app/model/common-listing';
import { Router } from '@angular/router';

import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CloseConfirmCommonDialogComponent } from '../close-confirm-common-dialog/close-confirm-common-dialog.component';
import { SubmitConfirmCommonDialigComponent } from '../submit-confirm-common-dialig/submit-confirm-common-dialig.component';
import { stampProcessMessage } from 'src/app/common/error-message/common-message.constants';
import { StampProcessingDirectives } from 'src/app/common/directive/stamp-processing-directive';
import { BehaviorSubject } from 'rxjs';

declare function SetEnglish();
declare function SetGujarati();
@Component({
  selector: 'app-surprise-verification-dat',
  templateUrl: './surprise-verification-dat.component.html',
  styleUrls: ['./surprise-verification-dat.component.css']
})
export class SurpriseVerificationDatComponent implements OnInit {
  currentLang = new BehaviorSubject<string>('Eng');
  isLangChange = false;
  hasFocusSet: number;

  surpriseVerificationForm: FormGroup;
  directiveObject = new StampProcessingDirectives(this.router, this.dialog);
  date: any = new Date();
// Entry Field Details
  treasury_List: CommonListing[] = [
    { value: '1', viewValue: 'Ahmedabad Treasury Office' },
    { value: '2', viewValue: 'Amreli Treasury Office' },
    { value: '3', viewValue: 'Anand Treasury Office' },
    { value: '4', viewValue: 'Aravalli-Modasa Treasury Office' },
    { value: '5', viewValue: 'Banasakantha – Palanpur Treasury Office' },
    { value: '6', viewValue: 'Bhavnagar Treasury Office' },
    { value: '7', viewValue: 'Bharuch Treasury Office' },
    { value: '8', viewValue: 'Botad Treasury Office' },
    { value: '9', viewValue: 'Chhota Udepur Treasury Office' },
    { value: '10', viewValue: 'Dahod Treasury Office' },
    { value: '11', viewValue: 'Dang – Ahwa Treasury Office' },
    { value: '12', viewValue: 'Devbhoomi Dwarka-Jamkhambhaliya Treasury Office' },
    { value: '13', viewValue: 'Gandhinagar Treasury Office' },
    { value: '14', viewValue: 'Gir somnath (Veraval) Treasury Office' },
    { value: '15', viewValue: 'Jamnagar Treasury Office' },
    { value: '16', viewValue: 'Junagadh Treasury Office' },
    { value: '17', viewValue: 'Kheda-Nadiad Treasury Office' },
    { value: '18', viewValue: 'Kutch (Bhuj) Treasury Office' },
    { value: '19', viewValue: 'Mahesana Treasury Office' },
    { value: '20', viewValue: 'Mahisagar-Lunawada Treasury Office' },
    { value: '21', viewValue: 'Morbi Treasury Office' },
    { value: '22', viewValue: 'Narmada-Rajpipala Treasury Office' },
    { value: '23', viewValue: 'Navsari Treasury Office' },
    { value: '24', viewValue: 'Panchmahal (Godhara) Treasury Office' },
    { value: '25', viewValue: 'Patan Treasury Office' },
    { value: '26', viewValue: 'Porbandar Treasury Office' },
    { value: '27', viewValue: 'Rajkot Treasury Office' },
    { value: '28', viewValue: 'Sabarkantha – Himatnagar Treasury Office' },
    { value: '29', viewValue: 'Tapi – Vyara Treasury Office' },
    { value: '30', viewValue: 'Vadodara Treasury Office' },
    { value: '31', viewValue: 'Valsad Treasury Office' },
    { value: '32', viewValue: 'Surat Treasury Office' },
    { value: '33', viewValue: 'Surendranagar Treasury Office' },
  ];
  subTre_List: CommonListing[] = [
    { value: '1', viewValue: 'Sub Treasury Office, Dahegam, Gandhinagar' },
    { value: '2', viewValue: 'Sub Treasury Office, Mansa, Gandhinagar' },
    { value: '2', viewValue: 'Sub Treasury Office, Kalol, Gandhinagar' },
  ];

  veriType_List: CommonListing[] = [
    { value: '1', viewValue: 'Surprise Verification' },
    { value: '2', viewValue: 'Regular Inspection' },
  ];

  treSubTre_List: CommonListing[] = [
    { value: '1', viewValue: 'Treasury Office' },
    { value: '2', viewValue: 'Sub Treasury Office' },
  ];

  attachmentType_list: CommonListing[] = [
    { value: '1', viewValue: 'Surprise Verification Report' },
    { value: '2', viewValue: 'Regular Inspection Report' },
];

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog,
    private el: ElementRef ) { }
    fileBrowseIndex: number;
  trofficeCtrl: FormControl = new FormControl();
  subTreOffCtrl: FormControl = new FormControl();
  veriTypeCtrl: FormControl = new FormControl();
  treSubTreCtrl: FormControl = new FormControl();
  attachmentTypeCodeCtrl: FormControl = new FormControl();
  errorMessages = stampProcessMessage;
  ngOnInit() {
    this.surpriseVerificationData();
  }

  surpriseVerificationData() {
    this.surpriseVerificationForm = this.fb.group({
      finYear: ['2019-2020', Validators.required],
      toffice: ['Directorate of Accounts & Treasuries', Validators.required],
      troffice: ['', Validators.required],
      trofficeForSub: ['', Validators.required],
      subTreOff: ['', Validators.required],
      treSubTre: ['', Validators.required],
      visitDate: ['', Validators.required],
      verificationoffice: ['Mr.A.B.Sharma', Validators.required],
      desi: ['Account Officer', Validators.required],
      remarks: ['', Validators.required],
      veriType: ['', Validators.required],
    });
  }


  gotoListing() {
    this.router.navigate(['./stamp-processing/treasury-inspection-management-list']);
  }

  // Eng Guj functions starts
    setEnglishOnFocusOut() {
      SetEnglish();
    }
    setGujaratiDefault() {
      if (!this.isLangChange) {
        SetGujarati();
        this.currentLang.next('Eng');
      }
    }
    toggleLanguage() {
      this.isLangChange = true;
      const elements = this.el.nativeElement.querySelectorAll('.hasfocus')[0];
      if (elements != undefined) {
        if (this.currentLang.value == 'Guj') {
          SetEnglish();
          this.currentLang.next('Eng');
        } else {
          SetGujarati();
          this.currentLang.next('Guj');
        }
        elements.focus();
      }
    }
}