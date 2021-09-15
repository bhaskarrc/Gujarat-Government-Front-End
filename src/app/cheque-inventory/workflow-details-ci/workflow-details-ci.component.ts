import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Observable } from 'rxjs';
import { BrwoseDatagrant, ListValue } from 'src/app/model/common-grant';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderElement } from 'src/app/model/common-listing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/model/standing-charge';
import { takeUntil, startWith, map } from 'rxjs/operators';
declare function SetGujarati();
declare function SetEnglish();

@Component({
  selector: 'app-workflow-details-ci',
  templateUrl: './workflow-details-ci.component.html',
  styleUrls: ['./workflow-details-ci.component.css']
})
export class WorkflowDetailsCiComponent implements OnInit {

  currentLang = new BehaviorSubject<string>('Eng');
  isLangChange = false;
  hasFocusSet: number;
  public showData: Boolean = true;
  showAction: Boolean = true;

  fileBrowseIndex: number;
  date: any = new Date();
  brwoseData: BrwoseDatagrant[] = [{
    name: undefined,
    file: undefined,
    uploadedBy: undefined

  }];
  dataSourceBrowse = new MatTableDataSource(this.brwoseData);
  displayedBrowseColumns = ['attachmentType', 'fileName', 'browse', 'uploadedFileName', 'action'];
  headerJso: HeaderElement[] = [
    { label: 'PPO No', value: '	PR-1/05/2016/277322' },
    { label: 'Pensioner Name', value: 'Brijesh Shah' },
    { label: 'Scheme', value: 'IRLA' }
  ];

  displayData: Boolean = false;

  attachment = [
    { fileName: 'Attachment 1', fileType: 'image', filePath: '../../../assets/sample-attachments/image-sample.jpg', imgStatus: false },
    { fileName: 'Attachment 2', fileType: 'pdf', filePath: '../../../assets/sample-attachments/pdf-sample.pdf', pdfStatus: false },
  ];
  sample = 'src/assets/img/pdf-test.pdf';
  fieldArray = Array.apply(null, { length: 10 }).map(Number.call, Number);
  show = false;
  page = 1;
  totalPages: number;
  isLoaded = false;
  sampleFlag: boolean;
  tabDisable = true;
  selectedIndex: number;

  actionForm: FormGroup;

  errorMessages = {
    FIN_YEAR: 'Please select any Financial Year',
    DEPARTMENT: 'Please select any Department',
  };

  forwardDialog_history_list: any[] = [
    {
      id: 1, userName: 'Shri S M Modi', designation: 'Deputy Section Officer',
      role: 'Creator', date: '1/11/2019',
      // tslint:disable-next-line: max-line-length
      comment: 'Please correct standing charge estimate for object head and correct all the calculations.Please verify last 3 year account as well as CSS grant received till date.Ask cooncerned officer from respective office to send necessay details at the earliest to department.'
    },
    {
      id: 2, userName: 'Shri C Patel', designation: 'Section Officer', role: 'Verifier',
      date: '10/11/2019', comment: 'We may approve'
    },
    {
      id: 3, userName: 'Shri P M Shah', designation: 'Deputy Secretaryr'
      , role: 'Approver', date: '11/11/2019', comment: 'We may approve'
    },
  ];

  action_list: ListValue[] = [

  ];

  user_list: ListValue[] = [
    { value: '1', viewValue: 'Satendra Zala (DDO)' },
  ];

  attachmentType_list: ListValue[] = [
    { value: '1', viewValue: 'WorkFlow' },
  ];

  actionCtrl: FormControl = new FormControl();
  filteredAction: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  userCodeCtrl: FormControl = new FormControl();
  filteredUserCode: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  attachmentTypeCodeCtrl: FormControl = new FormControl();
  filteredAttachmentTypeCode: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private _onDestroy = new Subject<void>();

  constructor(private elem: ElementRef,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkflowDetailsCiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private el: ElementRef,
  ) { }

  filteredOptions: Observable<string[]>;
  options: any;
  myControl = new FormControl();
  additionalText = new FormControl();

  ngOnInit() {
    this.selectActionList();
    this.createForm();
    if (this.action_list) {
      this.filteredAction.next(this.action_list.slice());
    }
    this.actionCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterObjValue(this.action_list, this.actionCtrl.value, this.filteredAction);
      });
    if (this.user_list) {
      this.filteredUserCode.next(this.user_list.slice());
    }
    this.userCodeCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterObjValue(this.user_list, this.userCodeCtrl.value, this.filteredUserCode);
      });
    this.filteredAttachmentTypeCode.next(this.attachmentType_list.slice());
    this.attachmentTypeCodeCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterObjValue(this.attachmentType_list, this.attachmentTypeCodeCtrl.value, this.filteredAttachmentTypeCode);
      });
    console.log('data', this.data);
    this.options = this.data;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.actionForm.patchValue({
      'actionCode': '1',
      'userCode': '1'
    });
  }

  gotoListing() {
    this.router.navigate(['']);
  }

  filterObjValue(arrValue, searchValue, filteredValue) {
    if (!arrValue) {
      return;
    }
    // get the search keyword
    let search = searchValue;
    if (!search) {
      filteredValue.next(arrValue.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the values
    filteredValue.next(
      arrValue.filter(item => item.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  uploadAttachment() {
    this.tabDisable = false;
    this.selectedIndex = 2;
  }
  createForm() {
    this.actionForm = this.fb.group({
      actionCode: [''],
      userCode: [''],
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }

  forwardConsolidate() {
    console.log('forwardConsolidate');
    this.dialogRef.close('yes');
  }

  nextPage() {
    this.page += 1;
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
  }

  previousPage() {
    this.page -= 1;
    if (this.page < 1) {
      this.page = 1;
    }
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }
  checkDisplayFile(data) {
    for (let i = 0; i < this.attachment.length; i++) {
      if (data.fileType === 'image') {
        if (this.showAction = true) {
          this.showAction = false;
        }
        if (this.attachment[i].fileName === data.fileName) {
          this.attachment[i].imgStatus = !this.attachment[i].imgStatus;
          this.show = this.attachment[i].imgStatus ? true : false;
        } else {
          this.attachment[i].imgStatus = false;
        }
      } else if (data.fileType === 'pdf') {
        if (this.showAction = true) {
          this.showAction = false;
        }
        if (this.attachment[i].fileName === data.fileName) {
          this.attachment[i].pdfStatus = !this.attachment[i].pdfStatus;
          this.show = this.attachment[i].pdfStatus ? true : false;
        } else {
          this.attachment[i].pdfStatus = false;
        }
      } else {
      }
      if (this.show === false) {
        this.showAction = true;
        if (this.attachment[i].fileType === 'image') {
          this.attachment[i].imgStatus = false;
        } else if (this.attachment[i].fileType === 'pdf') {
          this.attachment[i].pdfStatus = false;
        }
      }
    }
    console.log(data);
  }


  onFileSelection(fileSelected) {
    if (fileSelected.target && fileSelected.target.files) {
      this.dataSourceBrowse.data[this.fileBrowseIndex].file = fileSelected.target.files[0];
    }
  }

  openFileSelector(index) {
    this.el.nativeElement.querySelector('#fileBrowse').click();
    this.fileBrowseIndex = index;
  }

  onBrowseSelectChange() { }

  addBrowse() {
    if (this.dataSourceBrowse) {
      const data = this.dataSourceBrowse.data[this.dataSourceBrowse.data.length - 1];
      if (data && data.name && data.file) {
        const p_data = this.dataSourceBrowse.data;
        p_data.push({
          name: undefined,
          file: undefined,
          uploadedBy: undefined
        });
        this.dataSourceBrowse.data = p_data;
      } else {
        this.toastr.error('Please fill the detail.');
      }
    }
  }
  checkDisplayFileToggle() {
    this.showAction = true;
    this.show = false;
  }
  deleteBrowse(index) {
    this.dataSourceBrowse.data.splice(index, 1);
    this.dataSourceBrowse = new MatTableDataSource(this.dataSourceBrowse.data);
  }

  setEnglishOnFocusOut() {
    SetEnglish();
  }
  toggleLanguage() {
    this.isLangChange = true;
    const elements = this.elem.nativeElement.querySelectorAll('.hasfocus')[0];
    if (elements !== undefined) {
      if (this.currentLang.value === 'Guj') {
        SetEnglish();
        this.currentLang.next('Eng');
      } else {
        SetGujarati();
        this.currentLang.next('Guj');
      }
      elements.focus();
    }
  }

  // selects the action list as per the parent component which has called the method
  selectActionList() {
    switch (this.data) {
      case 'cts-account-mapping':
        this.action_list = [
          { value: '1', viewValue: 'Submit' }
        ];
        break;
      case 'yearly-indent':
        this.action_list = [
          { value: '1', viewValue: 'Submit' },
          { value: '2', viewValue: 'Verify' },
          { value: '3', viewValue: 'Approve' },
          { value: '4', viewValue: 'Forward' },
          { value: '5', viewValue: 'Send Back' }
        ];
        break;
      case 'indent-request':
        this.action_list = [
          { value: '1', viewValue: 'Submit' },
          { value: '2', viewValue: 'Verify' },
          { value: '3', viewValue: 'Approve' },
          { value: '4', viewValue: 'Forward' },
          { value: '5', viewValue: 'Send Back' }
        ];
        break;
      default:
        this.action_list = [
          { value: '1', viewValue: 'Forward' },
          { value: '2', viewValue: 'Return' },
          { value: '3', viewValue: 'Send Back' },
          { value: '4', viewValue: 'Verify' },
          { value: '5', viewValue: 'Approve' },
          { value: '6', viewValue: 'Reject' },
          { value: '7', viewValue: 'Cancel' },
          { value: '8', viewValue: 'Pull back' },
          { value: '9', viewValue: 'Save' },
          { value: '10', viewValue: 'Send to Case Authority' },
          { value: '11', viewValue: 'Send to Peer' },
          { value: '12', viewValue: 'Send to STO' },
          { value: '13', viewValue: 'Forward to Inward' },
          { value: '14', viewValue: 'Send to Outward' },
          { value: '15', viewValue: 'Send to Auditor' },
          { value: '16', viewValue: 'Forwad to Cheque Branch' },
          { value: '17', viewValue: 'Forwad to Verifier' },
          { value: '18', viewValue: 'Send Back to Case Authority' },
        ];
    }
  }
}
