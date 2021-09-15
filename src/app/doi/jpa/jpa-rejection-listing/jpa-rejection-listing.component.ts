import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ListValue, AttachmentData, JPAPendingApproval, JPAREJECTION } from 'src/app/model/doiModel';

@Component({
  selector: 'app-jpa-rejection-listing',
  templateUrl: './jpa-rejection-listing.component.html',
  styleUrls: ['./jpa-rejection-listing.component.css']
})
export class JpaRejectionListingComponent implements OnInit {

  todayDate = new Date();
  // Form Group
  jpaClaimEntry: FormGroup;
  // Control
  districtCtrl: FormControl = new FormControl();
  schemeTypeCtrl: FormControl = new FormControl();
  typeOfYearCtrl: FormControl = new FormControl();
  typeMonthCtrl: FormControl = new FormControl();
  // List
  schemeType_list: ListValue[] = [
    {
      value: '1', viewValue: 'Registered Farmer'
    },
    { value: '2', viewValue: 'ITI Students ' },
    { value: '3', viewValue: 'Unorganised Landless Labours    ' },
    { value: '4', viewValue: ' Secondary and Higher Secondary Student ' },
    { value: '5', viewValue: ' Nominee of Registered Farmer  ' },
    { value: '6', viewValue: '  Primary School Student ' },
    { value: '7', viewValue: 'Safai Kamdar' },
    { value: '8', viewValue: 'Orphan Widows  ' },
    { value: '9', viewValue: 'Sports Hostel Trainees  ' },
    { value: '10', viewValue: ' Hira Udhyog Workers' },
    { value: '11', viewValue: ' Handicapped Person ' },
    { value: '12', viewValue: 'Police Personnel DYSP and above ' },
    { value: '13', viewValue: 'Police Personnel PI and PSI and PSO ' },
    { value: '14', viewValue: 'Police Personnel Head Constable and Constable    ' },
    { value: '16', viewValue: 'Police Personnel ATS and Bomb Squad  ' },
    { value: '17', viewValue: 'Police Personnel CM Security and Chetak Commando' },
    { value: '18', viewValue: 'All Jail Guards ' },
    { value: '19', viewValue: 'All uniformed employee of Jail Dept Other than Jail Guards' },
    { value: '20', viewValue: 'Pilgrim of Kailash Mansarovar' },
    { value: '21', viewValue: 'Pilgrim of Amarnath' },
    { value: '22', viewValue: 'Participants of Adventurous Activities' },
    { value: '23', viewValue: 'Shahid Veer Kinarivbrala College Student' },
  ];

  districtList: ListValue[] = [
    { value: '00', viewValue: 'Ahmedabad' },
    { value: '01', viewValue: 'Amreli' },
    { value: '02', viewValue: 'Anand' },
    { value: '03', viewValue: 'Aravalli' },
    { value: '04', viewValue: 'Banaskantha' },
    { value: '05', viewValue: 'Bharuch' },
    { value: '06', viewValue: 'Bhavnagar' },
  ];

  year_list: ListValue[] = [
    { value: '1', viewValue: '2009' },
    { value: '2', viewValue: '2010' },
    { value: '3', viewValue: '2011' },
    { value: '4', viewValue: '2012' },
    { value: '5', viewValue: '2013' },
    { value: '6', viewValue: '2014' },
    { value: '7', viewValue: '2015' },
    { value: '8', viewValue: '2016' },
    { value: '9', viewValue: '2017' },
    { value: '10', viewValue: '2018' },
    { value: '11', viewValue: '2019' },
    { value: '12', viewValue: '2020' },
  ];
  month_list: ListValue[] = [
    { value: '1', viewValue: 'Jan' },
    { value: '2', viewValue: 'Feb' },
    { value: '3', viewValue: 'Mar' },
    { value: '4', viewValue: 'Apr' },
    { value: '5', viewValue: 'May' },
    { value: '6', viewValue: 'Jun' },
    { value: '7', viewValue: 'Jul' },
    { value: '8', viewValue: 'Aug' },
    { value: '9', viewValue: 'Sep' },
    { value: '10', viewValue: 'Oct' },
    { value: '11', viewValue: 'Nov' },
    { value: '12', viewValue: 'Dec' },

  ];
  attachmentTypeCode: any[] = [
    { value: '01', viewValue: 'Supporting Document' },
    { value: '02', viewValue: 'Sanction Order' },
    { value: '03', viewValue: 'Others' },
    // { type: 'view' }
  ];


  // Table Source

  Element_Data: JPAREJECTION[] = [


    {
      srno: '1',
      claimId: '141	',
      policyNo: '	DOI/JPA/48/P/2019-20/000001',
      scheme: 'NOMINEE OF REGISTERED FARMER',
      DecPersonName: 'PRAJAPATI AMBALAL MAGANBHAI',
      applicantName: 'PRAJAPATI MANJULABEN',
      district: 'VADODARA',
      taluka: 'KARJAN',
      claimEnterDate: '	21-09-2019',
      status: 'Send For Update ',
      remarks: 'Name Spelling Mistake in Bank Passbook',
      sendOn: '17-07-2020 03:08:40 PM    ',
      fieldName: 'Name As per Bank Detail',
      sendBy: 'M N Sharma',
      action: ''
    },
    {
      srno: '2',
      claimId: '271',
      policyNo: 'DOI/JPA/48/P/2019-20/000001',
      scheme: 'NOMINEE OF REGISTERED FARMER',
      DecPersonName: 'ARCHITBHAI ARVINDBHAI GAYAKVAD',
      applicantName: 'SANKUBEN ARVINDBHAI GAYAKVAD',
      district: 'THE DANGS',
      taluka: 'AHWA',
      claimEnterDate: '4/10/2019',
      status: 'Send For Update ',
      remarks: 'Driving Licence Not Update',
      sendOn: '  18-07-2020 11:01:34 AM',
      fieldName: 'Diving Licence',
      sendBy: 'G R Damor',
      action: ''
    },
    {
      srno: '3',
      claimId: '285',
      policyNo: 'DOI/JPA/48/P/2019-20/000001	',
      scheme: 'NOMINEE OF REGISTERED FARMER',
      DecPersonName: '	THAKOR HIRAJI P	',
      applicantName: 'PRAVINBHAI CHAUHAN',
      district: '	GANDHINAGAR	',
      taluka: 'DEHGAM',
      claimEnterDate: '	5/10/2019',
      status: 'Send For Update ',
      remarks: 'Deceased Person Date of Death update',
      sendOn: '18-07-2020 11:01:34 AM',
      fieldName: 'Date Of Death',
      sendBy: 'M N Sharma',
      action: ''
    },
    {
      srno: '4',
      claimId: '849',
      policyNo: '	DOI/JPA/48/P/2019-20/000001',
      scheme: '	UNORGANISED LANDLESS LABOURS	',
      DecPersonName: 'SANDHAVANI IKBALBHAI HASAMBHAI	',
      applicantName: 'SADHAVANI HASMBHAI',
      district: '	JAMNAGAR	',
      taluka: 'JAMNAGAR CITY',
      claimEnterDate: '	6/11/2019',
      status: 'Send For Update ',
      remarks: 'Name As Per AADHAR',
      sendOn: '18-07-2020 11:01:34 AM',
      fieldName: 'Name as per aadhar',
      sendBy: 'M V Vasava',
      action: ''
    },
    {
      srno: '5',
      claimId: '901	',
      policyNo: 'DOI/JPA/48/P/2019-20/000001',
      scheme: '	NOMINEE OF REGISTERED FARMER',
      DecPersonName: '	PARMAR BHARATBHAI MAYABHAI	',
      applicantName: 'PARAMAR MAYABHAI LAGHARBHAI',
      district: '	SURENDRANAGAR	',
      taluka: 'MULI	',
      claimEnterDate: '8/11/2019',
      status: 'Send For Update ',
      remarks: 'Name As Per AADHAR',
      sendOn: '10/7/2020 15:40',
      fieldName: 'Date of Death',
      sendBy: 'P P Solanki',
      action: ''
    },
    {
      srno: '6',
      claimId: '915',
      policyNo: '	DOI/JPA/48/P/2018-19/000001	',
      scheme: 'UNORGANISED LANDLESS LABOURS',
      DecPersonName: '	SAMBAI VIRJI KOLI',
      applicantName: '	KOLI RAMESH	',
      district: 'KACHCHH',
      taluka: '	BHUJ',
      claimEnterDate: '9/12/2019',
      status: 'Send For Update ',
      remarks: 'Name As Per AADHAR',
      sendOn: '17-06-2020 03:28:50 PM',
      fieldName: 'Name as per aadhar',
      sendBy: 'M N Sharma',
      action: ''
    },
    {
      srno: '7',
      claimId: '1042	',
      policyNo: 'DOI/JPA/48/P/2019-20/000001',
      scheme: '	UNORGANISED LANDLESS LABOURS',
      DecPersonName: '	DEEPAK RATILAL SURTI',
      applicantName: '	MAHYAVANSHI RATILAL BABUBHAI',
      district: '	VALSAD	',
      taluka: 'UMBERGAON	',
      claimEnterDate: '22-11-2019',
      status: 'Send For Update ',
      remarks: 'Deceased Person Date of Death update',
      sendOn: '17-06-2020 03:28:50 PM',
      fieldName: 'Date of Death',
      sendBy: 'M N Sharma',
      action: ''
    },
    {
      srno: '8',
      claimId: '1043	',
      policyNo: 'DOI/JPA/48/P/2018-19/000001',
      scheme: '	UNORGANISED LANDLESS LABOURS	',
      DecPersonName: 'VASAVA SANDIPKUMAR',
      applicantName: '	VASAVA RAMJIBHAI',
      district: '	SURAT	',
      taluka: 'UMARPADA	',
      claimEnterDate: '22-11-2019',
      status: 'Send For Update ',
      remarks: 'Deceased Person Date of Death update',
      sendOn: '17-06-2020 03:28:50 PM',
      fieldName: 'Name as per aadhar',
      sendBy: 'G R Damor',
      action: ''
    },
    {
      srno: '9',
      claimId: '1147',
      policyNo: '	DOI/JPA/48/P/2019-20/000001	',
      scheme: 'REGISTERED FARMER	',
      DecPersonName: 'RATHVA BUDDHILALBHAI',
      applicantName: '	RATHVA DAMNIBEN',
      district: '	CHHOTAUDEPUR	',
      taluka: 'BODELI',
      claimEnterDate: '2/12/2019',
      status: 'Send For Update ',
      remarks: 'Name Of Applicant As Per AADHAR',
      sendOn: '17-06-2020 03:28:50 PM',
      fieldName: 'Date of Death',
      sendBy: 'G R Damor',
      action: ''
    },
    {
      srno: '10',
      claimId: '1153	',
      policyNo: 'DOI/JPA/48/P/2019-20/000001',
      scheme: '	SHAHID VEER KINARIWALA COLLEGE STUDENT	',
      DecPersonName: 'PATEL MANSIBEN DILIPBHAI	',
      applicantName: 'PATEL DILIPBHAI	',
      district: 'BHARUCH',
      taluka: '	HANSOT',
      claimEnterDate: '3/12/2019',
      status: 'Send For Update ',
      remarks: 'Name Of Applicant As Per AADHAR',
      sendOn: '17-06-2020 03:28:50 PM',
      fieldName: 'Date Of Death',
      sendBy: 'P P Solanki',
      action: ''
    },


  ];

  displayedColumns: string[] = [
    'srno',
    // 'claimId',
    // 'policyNo',
    'scheme',
    'DecPersonName',
    'applicantName',
    'district',
    'taluka',
    'claimEnterDate',
    'fieldName',
    'remarks',
    'sendOn',
    'sendBy',
    'status',
    'action'

  ];
  fileBrowseIndex: any;
  amountProposedData: any;
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  constructor(private router: Router, private el: ElementRef,
    public dialog: MatDialog, private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit() {
    this.jpaClaimEntry = this.fb.group({
      district: [''],
      month: [''],
      year: [''],
      fromDate: [''],
      endDate: [''],
      schemeType: ['']
    });
  }


  openFileSelector(index) {
    this.el.nativeElement.querySelector('#fileBrowse').click();
    this.fileBrowseIndex = index;
  }

  onBrowseSelectChange() { }



  // Navigation Route
  navigate() {
    this.router.navigate(['./doi/jpa/jpa-claim-entry-view']);
  }
}