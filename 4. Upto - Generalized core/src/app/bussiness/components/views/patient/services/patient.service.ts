
import {map, catchError,  switchMap } from 'rxjs/operators';
import { AlertService } from '../../../../../core/services/util-services/alert.service';
// import { ApiCmsManagementService } from '../../consultation/services/api-cms-management.service';
// import { MedicalAlerts } from '../../../../objects/request/MedicalAlerts';
import { Subject, Observable, of, timer } from 'rxjs';

import { ApiPatientInfoService } from './api-patient-info.service';
// import { MedicalCoverageResponse } from '../../../../objects/response/MedicalCoverageResponse';
import { COUNTRIES } from '../../../../../shared/constants/countries';
import { COMMUNICATIONS } from '../../../../../shared/constants/communications';
import { ETHNICITIES } from '../../../../../shared/constants/ethnicities';
import { GENDERS } from '../../../../../shared/constants/genders';
import { ID_TYPES } from '../../../../../shared/constants/id.types';
import { LANGUAGES } from '../../../../../shared/constants/languages';
import { MARITAL_STATUS } from '../../../../../shared/constants/marital.status';
import { NATIONALITIES } from '../../../../../shared/constants/nationalities';
import { OCCUPATIONS } from '../../../../../shared/constants/occupations';
import { RELATIONSHIPS } from '../../../../../shared/constants/relationships';
import { TITLES } from '../../../../../shared/constants/titles';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
  AsyncValidatorFn
} from '@angular/forms';
@Injectable()
export class PatientService {
  patientDetailFormGroup: FormGroup;
  patientAddFormGroup: FormGroup;
  checkUserExist = false;

  private isUserIDValidated = new Subject<any>();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiPatientInfoService: ApiPatientInfoService,
    // private apiCmsManagementService: ApiCmsManagementService,
    private alertService: AlertService
  ) {
    this.patientDetailFormGroup = this.createFormGroup('PatientDetail');
    this.patientAddFormGroup = this.createFormGroup('PatientAdd');
  }

  createFormGroup(key: string): FormGroup {
    switch (key) {
      case 'PatientDetail':
        return this.createPatientDetailFormGroup();
      case 'PatientAdd':
        return this.createPatientAddFormGroup();
      default:
        return this.createPatientDetailFormGroup();
    }
  }

  addMedicalAlertsForm(): FormArray {
    const medicalAlerts = this.fb.group({
      alerts: null
    });

    return new FormArray([medicalAlerts]);
  }

  addMedicalCoverageForm(): FormArray {
    const medicalCoverage = this.fb.group({
      coverage: null
    });

    return new FormArray([medicalCoverage]);
  }

  createPatientAddFormGroup(): FormGroup {
    console.log('Entering createPatientAddFormGroup()');
    const formGroup = this.fb.group({
      needRefresh: true,
      headerFormGroup: this.fb.group({
        name: 'Add new patient'
      }),
      basicInfoFormGroup: this.fb.group({
        title: ['', Validators.required],
        titles: {
          value: TITLES.map(title => {
            return { value: title, label: title };
          })
        },
        name: ['', Validators.required],
        // birth: "",
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        genderOptions: {
          value: GENDERS.map(gender => {
            return { value: gender.toUpperCase(), label: gender };
          })
        },
        fullId: this.fb.group({
          id: ['', [Validators.required, Validators.minLength(4)]],
          idType: ['', Validators.required],
          selectedCountry: ''
        }),
        idTypes: {
          value: [
            { value: 'NRIC_PINK', label: 'NRIC (Pink)' },
            { value: 'NRIC_BLUE', label: 'NRIC (Blue)' },
            // { value: 'NRIC', label: 'Singaporean/PR NRIC' },
            { value: 'MIC', label: 'Malaysian IC' },
            { value: 'FIN', label: 'FIN' },
            { value: 'PASSPORT', label: 'Passport' },
            { value: 'OTHER', label: 'Other' }
          ]
        },
        address1: ['', Validators.required], // "123 Bayfront Inc",
        address2: '', // "Tower 1 #10-01",
        email: ['', this.validateEmail],
        postcode: ['', [Validators.required, Validators.minLength(6)]],
        consent: true,
        contactNumber: ['', Validators.required],
        countryCode: '',
        countries: {
          value: COUNTRIES.map(country => {
            return { value: country, label: country };
          })
        },
        country: 'SINGAPORE',
        maritalStatusDropdown: {
          value: MARITAL_STATUS.map(status => {
            return { value: status.toUpperCase(), label: status };
          })
        },
        maritalStatus: ['', Validators.required],
        preferredMethodOfCommunication: ['', Validators.required],
        communicationMode: {
          value: COMMUNICATIONS.map(communication => {
            return {
              value: communication.toLowerCase(),
              label: communication
            };
          })
        }
      }),
      alertFormGroup: this.fb.group({
        alertArray: this.fb.array([]),
        state: '',
        isAdd: false,
        specialNotes: '',
        requiredSave: false
      }),
      medicalAlertFormGroup: this.fb.group({
        alertArray: this.fb.array([]),
        state: '',
        isAdd: false,
        requiredSave: false
      }),
      medicalCoverageFormGroup: this.fb.group({
        selectedPlans: '',
        testCoverage: this.addMedicalCoverageForm()
      }),
      selectedPlans: this.fb.array([]),
      attachedPlans: this.fb.array([]),
      emergencyContactFormGroup: this.fb.group({
        name: '',
        contact: '',
        relationship: '',
        relationshipDropdown: {
          value: [
            { value: 'SPOUSE', label: 'SPOUSE' },
            { value: 'CHILDREN', label: 'CHILDREN' },
            { value: 'PARENT', label: 'PARENT' },
            { value: 'IN_LAWS', label: 'IN_LAWS' }
          ]

          // RELATIONSHIPS.map(relationship => {
          //     return { value: relationship, label: relationship };
          // })
        }
      }),
      otherInfoFormGroup: this.fb.group({
        nationality: '', // "Singaporean",
        race: '', // "Chinese",
        maritalStatus: '', // "SINGLE",
        languageSpoken: '', // "English",
        nationalitiesDropdown: {
          value: NATIONALITIES.map(nationality => {
            return { value: nationality, label: nationality };
          })
        },
        raceDropdown: {
          value: ETHNICITIES.map(ethnicity => {
            return { value: ethnicity, label: ethnicity };
          })
        },
        maritalStatusDropdown: {
          value: MARITAL_STATUS.map(status => {
            return { value: status.toUpperCase(), label: status };
          })
        },
        languagesDropdown: {
          value: LANGUAGES.map(language => {
            return { value: language, label: language };
          })
        }
      }),
      companyInfoFormGroup: this.fb.group({
        company: '',
        occupation: '',
        address1: '',
        address2: '',
        postalCode: ['', Validators.minLength(6)],
        occupationDropdown: {
          value: OCCUPATIONS.map(occupation => {
            return { value: occupation, label: occupation };
          })
        }
      })
    });

    formGroup
      .get('basicInfoFormGroup')
      .get('postcode')
      // .setAsyncValidators(
      //   this.findAddress(
      //     this.apiCmsManagementService,
      //     formGroup.get('basicInfoFormGroup').get('postcode'),
      //     formGroup.get('basicInfoFormGroup').get('address1'),
      //     formGroup.get('companyInfoFormGroup').get('address2'),
      //     <FormGroup>formGroup.get('basicInfoFormGroup')
      //   )
      // )
      ;

    formGroup
      .get('companyInfoFormGroup')
      .get('postalCode')
      // .setAsyncValidators(
      //   this.findAddress(
      //     this.apiCmsManagementService,
      //     formGroup.get('companyInfoFormGroup').get('postalCode'),
      //     formGroup.get('companyInfoFormGroup').get('address1'),
      //     formGroup.get('companyInfoFormGroup').get('address2'),
      //     <FormGroup>formGroup.get('companyInfoFormGroup')
      //   )
      // )
      ;

    return formGroup;
  }

  createPatientDetailFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      needRefresh: true,
      isHistoryList: true,
      historyDetailIndex: -1,
      headerFormGroup: this.fb.group({
        name: ''
      }),
      alertFormGroup: this.fb.group({
        alertArray: this.fb.array([]),
        state: '',
        isAdd: false,
        requiredSave: false
      }),
      medicalAlertFormGroup: this.fb.group({
        alertArray: this.fb.array([]),
        trashArray: this.fb.array([]),
        state: '',
        isAdd: false,
        requiredSave: false
      }),
      basicInfoFormGroup: this.fb.group({
        titles: {
          value: TITLES.map(title => {
            return { value: title, label: title };
          })
        },
        title: ['', Validators.required],
        name: ['', Validators.required],
        birth: [new Date(), Validators.required],
        genders: {
          value: GENDERS.map(gender => {
            return { value: gender.toUpperCase(), label: gender };
          })
        },
        gender: ['', Validators.required],
        fullId: this.fb.group({
          id: ['', [Validators.required, Validators.minLength(4)]],
          idType: ['', Validators.required],
          selectedCountry: 'SINGAPORE'
        }),
        // id: ['', Validators.required],
        idTypes: {
          value: [
            { value: 'NRIC_PINK', label: 'NRIC (Pink)' },
            { value: 'NRIC_BLUE', label: 'NRIC (Blue)' },
            // { value: 'NRIC', label: 'Singaporean/PR NRIC' },
            { value: 'MIC', label: 'Malaysian IC' },
            { value: 'FIN', label: 'FIN' },
            { value: 'PASSPORT', label: 'Passport' },
            { value: 'OTHER', label: 'Other' }
          ]
        },
        // idType: ['NRIC', Validators.required],
        countries: {
          value: COUNTRIES.map(country => {
            return { value: country, label: country };
          })
        },
        country: ['SINGAPORE', Validators.required],
        races: {
          value: ETHNICITIES.map(ethnicity => {
            return { value: ethnicity, label: ethnicity };
          })
        },
        race: '',
        nationalities: {
          value: NATIONALITIES.map(nationality => {
            return { value: nationality, label: nationality };
          })
        },
        nationality: '',
        maritalStatus: [
          {
            value: MARITAL_STATUS.map(status => {
              return {
                value: status.toUpperCase(),
                label: status
              };
            })
          },
          Validators.required
        ],
        status: ['', Validators.required],
        languages: {
          value: LANGUAGES.map(language => {
            return { value: language, label: language };
          })
        },
        language: ''
      }),
      contactDetailFormGroup: this.fb.group({
        primary: ['', Validators.required],
        secondary: '',
        line1: ['', Validators.required],
        line2: '',
        postCode: ['', Validators.required],
        email: ['', this.validateEmail],
        communications: {
          value: COMMUNICATIONS.map(communication => {
            return {
              value: communication.toLowerCase(),
              label: communication
            };
          })
        },
        communicationMode: ['phone', Validators.required],
        consentGiven: true
      }),
      companyInfoFormGroup: this.fb.group({
        company: '',
        occupations: {
          value: OCCUPATIONS.map(occupation => {
            return { value: occupation, label: occupation };
          })
        },
        occupation: '',
        line1: '',
        line2: '',
        postCode: ''
      }),
      emergencyContactFormGroup: this.fb.group({
        name: '',
        contact: '',
        relationships: {
          value: [
            { value: 'SPOUSE', label: 'SPOUSE' },
            { value: 'CHILDREN', label: 'CHILDREN' },
            { value: 'PARENT', label: 'PARENT' },
            { value: 'IN_LAWS', label: 'IN LAWS' }
          ]
          // RELATIONSHIPS.map(relationship => {
          //     return { value: relationship, label: relationship };
          // })
        },
        relationship: ''
      }),
      documentsFormGroup: this.fb.group({
        filter: '',
        dateRange: '',
        documentsArray: this.fb.array([]),
        newDocumentsArray: this.fb.array([])
      }),
      medicalCoverageFormGroup: this.fb.group({
        selectedCoverages: '',
        selectedPlans: ''
      }),
      selectedPlans: this.fb.array([]),
      consultationFormGroup: this.fb.group({
        search: '',
        dateFrom: new Date(),
        dateTo: new Date()
      }),
      historyFilterFormGroup: this.fb.group({
        dateFrom: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        dateTo: new Date(),
        doctors: { value: [] },
        doctor: '',
        paymentStatus: { value: [] },
        status: ''
      }),
      historyListFormGroup: this.fb.group({
        formArray: this.fb.array([])
      }),
      historyDetailFormGroup: this.fb.group({
        patientInfo: {},
        consultationInfo: {},
        paymentInfo: {},
        gstValue: 0.07,
        overallCharges: { value: [] },
        doctorId: '',
        billNo: '',
        date: '',
        consultationStartTime: '',
        consultationEndTime: '',
        purpose: '',
        notes: '',
        diagnosisArray: this.fb.array([]),
        notesArray: this.fb.array([]),
        serviceArray: this.fb.array([]),
        drugArray: this.fb.array([]),
        filter: '',
        documentsArray: this.fb.array([]),
        newDocumentsArray: this.fb.array([]),
        testArray: this.fb.array([]),
        vaccineArray: this.fb.array([]),
        certificateArray: this.fb.array([]),
        referralArray: this.fb.array([]),
        memo: '',
        startTime: '',
        endTime: '',
        timeChitFrom: '',
        timeChitTo: '',
        printFormGroup: this.fb.group({
          receiptTypes: {
            value: [
              { value: 'general', label: 'General' },
              // { value: 'detail', label: 'Detail' },
              { value: 'breakdown', label: 'Breakdown' }
            ]
          },
          receiptType: 'general',
          printAll: false,
          disablePageBreak: false
        }),
        followupConsultationFormGroup: this.fb.group({
          id: '',
          patientId: '',
          patientVisitId: '',
          followupDate: '',
          remarks: ''
        }),
        clinicNotes: ''
      })
    });

    return formGroup;
  }

  getPatientDetailFormGroup(): FormGroup {
    return this.patientDetailFormGroup;
  }

  setPatientDetailFormGroup(formGroup: FormGroup) {
    this.patientDetailFormGroup = formGroup;
  }

  resetPatientDetailFormGroup() {
    this.patientDetailFormGroup = this.createPatientDetailFormGroup();
  }

  getPatientAddFormGroup(): FormGroup {
    return this.patientAddFormGroup;
  }

  setPatientAddFormGroup(formGroup: FormGroup) {
    this.patientAddFormGroup = formGroup;
  }

  resetPatientAddFormGroup() {
    this.patientAddFormGroup = this.createPatientAddFormGroup();
  }

  checkUserInSystem(apiPatientInfoService: ApiPatientInfoService, idType, idValue) {
    const promise = new Promise(function(resolve, reject) {
      apiPatientInfoService.validateID(idType + ':' + idValue).subscribe(res => {
        if (res.payload) resolve('ID is valid');
        else reject('ID is not valid');
      });
    });

    return promise;
  }

  checkIDisValid() {
    const promise = new Promise(function(resolve, reject) {
      this.apiCmsManagementService.validateIdentification('NRIC', 'S8835803A').subscribe(res => {
        if (res.payload) resolve('ID is valid');
        else reject('ID is not valid');
      });
    });
    return promise;
  }

  validateIdentification(
    // apiCmsManagementService: ApiCmsManagementService,
    currentControl: AbstractControl,
    controlType
  ): AsyncValidatorFn {
    //    this.isUserIDValidated = null;
    return (control: AbstractControl) => {
      let idType = '';
      let idValue = '';

      if (controlType === 'idType') {
        idType = currentControl.value;
        idValue = control.value;
      } else if (controlType === 'id') {
        idType = control.value;
        idValue = currentControl.value;
      }

      idType = idType === 'NRIC_PINK' || idType === 'NRIC_BLUE' ? 'NRIC' : idType;

      console.log('validateIdentification: ', idType);

      // if (idValue && (idType === 'NRIC' || idType === 'FIN')) {
      //   return timer(500).pipe(switchMap(() => {
      //     return apiCmsManagementService
      //       .validateIdentification(idType, idValue).pipe(
      //       map(res => {
      //         if (res.payload) {
      //           this.isUserIDValidated = null;
      //         } else {
      //           this.isUserIDValidated = { userIdIsNotValid: { value: idValue } } as any;
      //           return this.isUserIDValidated;
      //         }
      //       }),
      //       catchError(this.handleError),);
      //   }));
      // } else {
      //   return of(null);
      // }
      return of(null);
    };
  }

  checkWhetherUserExists(
    apiPatientInfoService: ApiPatientInfoService,
    currentControl: AbstractControl,
    controlType
  ): AsyncValidatorFn {
    // this.isUserIDValidated = null;
    return (control: AbstractControl) => {
      let idType = '';
      let idValue = '';

      if (controlType === 'idType') {
        //   control.setErrors({ errors: null });
        idType = currentControl.value;
        idValue = control.value;
      } else if (controlType === 'id') {
        //   currentControl.setErrors({ errors: null });
        idType = control.value;
        idValue = currentControl.value;
      }

      const debounceTime = 500; // milliseconds

      // const dummyIdType = idType === 'NRIC_PINK' || idType === 'NRIC_BLUE' ? 'NRIC' : idType;
      console.log('checkWhetherUserExists: ', idType);

      // if (idValue.length > 0 && (idType === 'NRIC' || idType === 'FIN')) {
      if (idValue.length > 0) {
        control.markAsTouched();
        return apiPatientInfoService
          .validateID(idType + ':' + idValue).pipe(
          map(res => {
            if (res.payload) {
              // USER EXISTS
              return { userid: { value: idValue } };
            } else {
              return null;
            }
          }, err => this.handleError),
          catchError(this.handleError),);
      } else {
        return of(null);
      }
    };
  }

  findAddress(
    // apiCmsManagementService: ApiCmsManagementService,
    postCode: AbstractControl,
    address1Input: AbstractControl,
    address2Input: AbstractControl,
    formGroup: FormGroup
  ): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const debounceTime = 500; // milliseconds
      return timer(debounceTime).pipe(switchMap(() => {
        // if (control.value) {
        //   return apiCmsManagementService
        //     .listAddress(control.value + '').pipe(
        //     map(
        //       res => {
        //         if (res.payload) {
        //           console.log('res.paylod: ', res.payload);
        //           let addr: string = res.payload.address;
        //           addr = addr.split(control.value).join(' ');

        //           address1Input.patchValue(addr);
        //           address2Input.patchValue('');
        //           formGroup.patchValue({ addressInput: addr });
        //           return null;
        //         } else {
        //           return null;
        //           // return { zipcode: { value: res } };
        //         }
        //       },
        //       err => {
        //         console.log('ERROR', err);
        //       }
        //     ),
        //     catchError(this.handleError),);
        // } else {
        //   return of(null);
        // }
        return of(null);
      }));
    };
  }

  private handleError(error: any) {
    console.log('HANDLING ERRO');
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    return of(null);
  }

  validateEmail(control: FormGroup) {
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
    const email = control.value;

    if ((email && (EMAIL_PATTERN.test(email) || email.length === 0)) || email === undefined || email === '') {
      return null;
    } else {
      return { vaildEmail: { value: email, message: 'Email address is invalid' } };
    }
  }

  getIsUserIDValidated(): Observable<any> {
    return this.isUserIDValidated;
  }

  resetIsUserIDValidated() {
    this.isUserIDValidated = {} as any;
  }
}
