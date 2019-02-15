import { StoreStatus } from '../../objects/StoreStatus';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable ,  Subject ,  timer } from 'rxjs';
import { User } from '../../objects/User';
import { ApiPatientInfoService } from '../../../bussiness/components/views/patient/services/api-patient-info.service';
// import { ApiCmsManagementService } from '../../bussiness/components/views/consultation/services/api-cms-management.service';
import { PatientService } from '../../../bussiness/components/views/patient/services/patient.service';

@Injectable()
export class BussinessStoreService {
  private isStoreReady = new Subject();
  private patientId: string;
  private _caseId: string;
  consultationId: string;
  private patientVisitRegistryId: string;
  doctorList = [];
  doctorListByClinic = [];
  clinicId: string;
  clinicCode: string = 'OUB';
  clinic;
  chargeItemList = [];
  uoms: Array<any> = new Array();
  specialitiesList: [{}];
  patientRegistry: Array<any>;
  private instructions: Array<any>;
  private dosageInstructions: Array<any>;
  // Store Status
  private storeSuccessCount = 0;
  private storeFailCount = 0;
  private storeStatus: StoreStatus;

  constructor(
    // private apiCmsManagementService: ApiCmsManagementService,
    private apiPatientInfoService: ApiPatientInfoService,
    private patientService: PatientService,
  ) {
    this.storeStatus = new StoreStatus(false, false, false);
    // if (
    //   localStorage.getItem('access_token') &&
    //   localStorage.getItem('clinicCode') &&
    //   localStorage.getItem('clinicId')
    // ) {
    //   this.clinicCode = localStorage.getItem('clinicCode');
    //   this.clinicId = localStorage.getItem('clinicId'); // preInit would have been called

    //   // this.getPatientRegistryList();
    // } else {
    //   console.log("can't");
    // }
    // this.preInt();
  }

  listDoctorsByClinic() {
    if (this.clinicId) {
    }
  }

  getPatientId(): string {
    return this.patientId;
  }

  getPatientVisitRegistryId(): string {
    return this.patientVisitRegistryId;
  }

  getConsultationId(): string {
    return this.consultationId;
  }

  getDoctorList(page: number = 0, size: number = 10000) {
    if (this.doctorList.length === 0) {
      console.log('GETTING DOCTORS');
      // this.getListOfDoctors();
    } else {
      return this.doctorList.slice(size * page, size * (page + 1));
    }
  }

  setPatientId(id: string) {
    this.patientId = id;
    this.patientService.resetPatientDetailFormGroup();
  }

  setPatientVisitRegistryId(id: string) {
    this.patientVisitRegistryId = id;
  }

  setConsultationId(id: string) {
    this.consultationId = id;
  }

  getIsStoreReady(): Observable<any> {
    return this.isStoreReady.asObservable();
  }

  resetIsStoreReady() {
    this.isStoreReady = new Subject();
  }

  getInstructions(): Array<any> {
    return this.instructions;
  }
  getDosageInstructions(): Array<any> {
    return this.dosageInstructions;
  }

  getCaseId(): string {
    return this._caseId;
  }
  setCaseId(value: string) {
    this._caseId = value;
  }
}
