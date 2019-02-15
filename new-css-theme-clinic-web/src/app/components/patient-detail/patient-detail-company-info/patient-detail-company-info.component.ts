import { ApiCmsManagementService } from './../../../services/api-cms-management.service';
import { ApiPatientInfoService } from './../../../services/api-patient-info.service';
import { PatientService } from './../../../services/patient.service';
import { filter, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
@Component({
    selector: 'app-patient-detail-company-info',
    templateUrl: './patient-detail-company-info.component.html',
    styleUrls: ['./patient-detail-company-info.component.scss']
})
export class PatientDetailCompanyInfoComponent implements OnInit {
    @Input() companyInfoFormGroup: FormGroup;

    constructor(private patientService: PatientService,
        private apiPatientInfoService: ApiPatientInfoService,
        private apiCmsManagementService: ApiCmsManagementService,
    ) {
      }

    ngOnInit() {
      
        this.subscribeOnChanges();
    }

    // getPatientInfo(){
    //   // if(!this.patientInfo){
    //     if(this.store.getPatientId()) {
    //      // Get Patient Details
    //        this.apiPatientInfoService.searchBy('systemuserid', this.store.getPatientId()).subscribe(
    //           res => {
    //            this.patientInfo = res.payload;
    //            this.storedPatientID = this.patientInfo.userId.number;
    //            this.storedPatientIDType = this.patientInfo.userId.idType;
    //            this.storedPatientPostalCode = this.patientInfo.address.postalCode;
    //            this.subscribeValueChanges();
    //          },
    //          err => {
    //            this.alertService.error(JSON.stringify(err));
    //            this.store.setPatientId('');
    //            this.router.navigate(['pages/patient/detail']);
    //          }
    //        );    
    //     } 
    //   // }
    // }

    subscribeOnChanges(){
        this.companyInfoFormGroup
        .valueChanges
        .pipe(debounceTime(50), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe(values => {
          if (values.postCode) {
            this.companyInfoFormGroup
              .get('postCode')
              .setAsyncValidators(
                this.patientService.findAddress(
                  this.apiCmsManagementService,
                  this.companyInfoFormGroup.get('postCode'),
                  this.companyInfoFormGroup.get('line1'),
                  this.companyInfoFormGroup.get('line2'),
                  <FormGroup>this.companyInfoFormGroup
                )
              );
  
          } else {
            this.companyInfoFormGroup
              .get('postCode')
              .clearAsyncValidators();
          }
        });
    }
}
