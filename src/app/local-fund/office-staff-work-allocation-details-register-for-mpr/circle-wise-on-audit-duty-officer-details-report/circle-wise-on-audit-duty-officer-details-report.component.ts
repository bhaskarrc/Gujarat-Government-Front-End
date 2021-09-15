import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ListValue } from 'src/app/model/common-grant';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CircleWiseOnAuditDutyOfficerDetails } from 'src/app/model/local-fund';

@Component({
  selector: 'app-circle-wise-on-audit-duty-officer-details-report',
  templateUrl: './circle-wise-on-audit-duty-officer-details-report.component.html',
  styleUrls: ['./circle-wise-on-audit-duty-officer-details-report.component.css']
})
export class CircleWiseOnAuditDutyOfficerDetailsReportComponent implements OnInit {
  // variable
  filterElementData: CircleWiseOnAuditDutyOfficerDetails[];
  // form group
  searchForm: FormGroup;
  // form control
  instituteTypeCtrl: FormControl = new FormControl();
  instituteNameCtrl: FormControl = new FormControl();
  districtNameCtrl: FormControl = new FormControl();
  // lists start
  instituteNameList: ListValue[] = [
    { value: '0', viewValue: 'Gir Somnath District Office' },
  ];
  instituteTypeList: ListValue[] = [
    { value: '0', viewValue: 'Maha Nagar Palika' },
    { value: '1', viewValue: 'Nagarpalika' },
    { value: '2', viewValue: 'District Panchayat' },
    { value: '3', viewValue: 'Taluka Panchayat' },
    { value: '4', viewValue: 'University' },
    { value: '5', viewValue: 'Municiple School Board' },
    { value: '6', viewValue: 'Village Panchayat' },
    { value: '7', viewValue: 'Police Welfare Fund' },
    { value: '8', viewValue: 'Provident Fund of District Panchayat' },
    { value: '9', viewValue: 'Provident Fund of Secondary Education office' },
    { value: '10', viewValue: 'Ambaji Temple Trust' },
    { value: '11', viewValue: 'Others' },
  ];
  districtNameList: ListValue[] = [
    { value: '0', viewValue: 'Ahmedabad' },
    { value: '1', viewValue: 'Amreli' },
    { value: '2', viewValue: 'Anand' },
    { value: '3', viewValue: 'Aravalli' },
    { value: '4', viewValue: 'Banaskantha' },
    { value: '5', viewValue: 'Bharuch' },
    { value: '6', viewValue: 'Bhavnagar' },
    { value: '7', viewValue: 'Botad' },
    { value: '8', viewValue: 'Chhota Udaipur' },
    { value: '9', viewValue: 'Dahod' },
    { value: '10', viewValue: 'Dang' },
    { value: '11', viewValue: 'Devbhoomi Dwarka' },
    { value: '12', viewValue: 'Gandhinagar' },
    { value: '13', viewValue: 'Gir Somnath' },
    { value: '14', viewValue: 'Jamnagar' },
    { value: '15', viewValue: 'Junagadh' },
    { value: '16', viewValue: 'Kutch' },
    { value: '17', viewValue: 'Kheda' },
    { value: '18', viewValue: 'Mahisagar' },
    { value: '19', viewValue: 'Mehsana' },
    { value: '20', viewValue: 'Morbi' },
    { value: '21', viewValue: 'Narmada' },
    { value: '22', viewValue: 'Navsari' },
    { value: '23', viewValue: 'Panchmahal' },
    { value: '24', viewValue: 'Patan' },
    { value: '25', viewValue: 'Porbandar' },
    { value: '26', viewValue: 'Rajkot' },
    { value: '27', viewValue: 'Sabarkantha' },
    { value: '28', viewValue: 'Surat' },
    { value: '29', viewValue: 'Surendranagar' },
    { value: '30', viewValue: 'Tapi' },
    { value: '31', viewValue: 'Vadodara' },
    { value: '32', viewValue: 'Valsad' },
  ];
  // lists end

  // table data start
  elementData: CircleWiseOnAuditDutyOfficerDetails[] = [
    {
      district: 'Gir Somnath',
      id: '1',
      instituteType: 'District Office',
      instituteName: 'Gir Somnath District Office',
      circleNo: '1',
      employeeName: 'D.N. Parmar',
      designation: 'Auditor',
      isAcp: 'No',
      acpDetails: 'NA',
      remarks: 'NA'

    },
    {
      district: 'Gir Somnath',
      id: '4',
      instituteType: 'District Office',
      instituteName: 'Gir Somnath District Office',
      circleNo: '1',
      employeeName: 'S N Dabhi',
      designation: 'Auditor',
      isAcp: 'No',
      acpDetails: 'NA',
      remarks: 'NA'

    },
    {
      district: 'Gir Somnath',
      id: '5',
      instituteType: 'District Office',
      instituteName: 'Gir Somnath District Office',
      circleNo: '3',
      employeeName: 'K S Patel',
      designation: 'Auditor',
      isAcp: 'No',
      acpDetails: 'NA',
      remarks: 'NA'

    },
    {
      district: 'Gir Somnath',
      id: '8',
      instituteType: 'District Office',
      instituteName: 'Gir Somnath District Office',
      circleNo: '4',
      employeeName: 'R P Zala',
      designation: 'Auditor',
      isAcp: 'Yes',
      acpDetails: 'ACP Detail',
      remarks: 'NA'

    },
  ];

  dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.elementData);
  displayedColumns: string[] = [
    'serialNo',
    'district',
    'instituteType',
    'instituteName',
    'id',
    'circleNo',
    'employeeName',
    'designation',
    'isAcp',
    'acpDetails',
    'remarks',
    'action'
  ];
  // table data end

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.searchFormData();
  }

  // form data
  searchFormData() {
    this.searchForm = this.fb.group({
      districtName: [''],
      instituteType: [''],
      instituteName: [''],
    });
  }

  // search data on basis of search fields
  onSearch() {
    const formVal = this.searchForm.value;

    const instituteTypeValue = formVal.instituteType;
    const instituteNameValue = formVal.instituteName;
    const districtNameValue = formVal.districtName;

    if (formVal.instituteType !== '' && formVal.instituteType != null) {
      if (formVal.instituteType === '11') {

        this.filterElementData = this.elementData.filter(
          searchBy => searchBy.instituteName.toLowerCase() === formVal.others.toLowerCase());
        this.dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.filterElementData);

      } else {
        const instituteType = this.instituteTypeList[instituteTypeValue].viewValue;
        this.filterElementData = this.elementData.filter(
          searchBy => searchBy.instituteType.toLowerCase() === instituteType.toLowerCase());
        this.dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.filterElementData);


      }
    }

    if (formVal.instituteName !== '' && formVal.instituteName != null) {
      const instituteName = this.instituteNameList[instituteNameValue].viewValue;
      this.filterElementData = this.elementData.filter(
        searchBy => searchBy.instituteName.toLowerCase() === instituteName.toLowerCase());
      this.dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.filterElementData);

    }



    if (formVal.districtName !== '' && formVal.districtName !== null) {
      const districtName = this.districtNameList[districtNameValue].viewValue;
      this.filterElementData = this.elementData.filter(
        searchBy => searchBy.district.toLowerCase() === districtName.toLowerCase());
      this.dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.filterElementData);

    }

    if (
      (formVal.instituteName === '' || formVal.instituteName == null) &&
      (formVal.instituteType === '' || formVal.instituteType == null) &&
      (formVal.districtName === '' || formVal.districtName == null)

    ) {
      this.dataSource = new MatTableDataSource<CircleWiseOnAuditDutyOfficerDetails>(this.elementData);
    }

  }

  // reset form
  clearForm() {
    this.searchForm.reset();
  }

  // on click on export to pdf button
  captureScreen() { }


}
