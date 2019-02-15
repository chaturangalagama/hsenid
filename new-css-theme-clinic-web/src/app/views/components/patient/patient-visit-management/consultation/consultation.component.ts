import { Clinic } from './../../../../../objects/response/Clinic';
import { PaymentService } from './../../../../../services/payment.service';
import { FormControl } from '@angular/forms';
// General Libraries
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import * as moment from 'moment';


// Services
import { StoreService } from '../../../../../services/store.service';
import { ConsultationFormService } from './../../../../../services/consultation-form.service';

// Objects
import { MedicalCoverageResponse } from './../../../../../objects/response/MedicalCoverageResponse';
import { DispatchDrugDetail } from './../../../../../objects/request/DrugDispatch';
import { PatientVisitHistory } from '../../../../../objects/request/PatientVisitHistory';
// Constants
import {
  DB_FULL_DATE_FORMAT,
  VISIT_MANAGEMENT_TABS,
  DISPLAY_DATE_FORMAT
} from './../../../../../constants/app.constants';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  // Component General Controls
  allowEdit = new Subject<boolean>();

  // Tab Variable and Control Options
  @Input() selectedTabIndex;
  @Input() visitManagementFormGroup: FormGroup;
  @Input() needRefresh: Subject<boolean>;
  @Input() showSidePane;
  @ViewChild('consultationTabs') consultationTabs: TabsetComponent;

  // Output Variable to emit index of tab selected
  @Output() tabSelected = new EventEmitter<String>();

  // To store index of tab selected in this component
  selectedTab;

  // Global Info
  consultationInfo;
  subscriptions = [];
  @Input() patientInfo;
  @Output() onSave = new EventEmitter<number>();

  // Patient Information Tab

  // Vital Signs Tab
  vitalForm: FormGroup;

  // Consultation Tab
  consultationForm: FormGroup;
  recentVisit: PatientVisitHistory;

  @Output() copiedPrescription = new EventEmitter<DispatchDrugDetail[]>();

  // Medical Coverage Tab
  @Input() selectedPlans: FormArray;
  @Input() policyHolderInfo: FormArray;
  coverages: MedicalCoverageResponse;

  // Medical Services Tab
  referralShown = false;
  memoShown = false;
  medicalCertificateShown = false;
  followUpShown = false;

  // Documents Tab
  @Input() documentsFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private consultationFormService: ConsultationFormService,
    private store: StoreService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscribeOnInit();

    this.createForms();
  }

  subscribeOnInit() {
    console.log('selected tab index: ', this.selectedTabIndex);
    // Listen for Tab Changes
    // and switch tab content to current tab selected
    if (this.selectedTabIndex) {
      this.consultationTabs.tabs[this.selectedTabIndex].active = true;
      this.selectedTab = this.getSelectedTab(this.selectedTabIndex);
      console.log('selected tab index: ', this.selectedTab);
    }

    // Listen for refresh
    this.needRefresh.subscribe(value => {
      console.log('needRefresh: ', value);
    });

    // Consultation Info
    const consultationSubscription = this.paymentService.getConsultationInfoObservable().subscribe(consultationInfo => {
      console.log('CONSULTATION IFO: ', consultationInfo);

      this.consultationInfo = consultationInfo;

      if (this.consultationInfo) {
        this.updateMedicalServicesTab();
        // if(this.consultationInfo.memo){
        //   const memo = this.visitManagementFormGroup.get('chargeFormGroup').get('memo');
        //   memo.patchValue(this.consultationInfo.memo);
        // }
      }
    });
    this.subscriptions.push(consultationSubscription);
  }

  updateMedicalCertFormGroup() {
    const printFormGroup = this.visitManagementFormGroup.get('chargeFormGroup').get('printFormGroup');
    const medicalCertificateArray = printFormGroup.get('medicalCertificateArray') as FormArray;

    this.consultationInfo.medicalCertificates.forEach(medicalCertificate => {
      const { purpose, startDate, numberOfDays, referenceNumber, halfDayOption, remark } = medicalCertificate;
      const adjustedEndDate = numberOfDays - 1 >= 0 ? numberOfDays - 1 : 0;

      const endDate = moment(medicalCertificate.startDate, DISPLAY_DATE_FORMAT)
        .add(adjustedEndDate, 'days')
        .format(DISPLAY_DATE_FORMAT);
      medicalCertificateArray.push(
        this.fb.group({
          purpose,
          startDate,
          endDate,
          numberOfDays,
          referenceNumber,
          halfDayOption,
          medicalCertificateStr: `${purpose} for ${numberOfDays} day(s) from ${startDate} to ${endDate}`,
          remark
        })
      );
    });
  }

  updateMedicalServicesTab() {
    console.log('updating medical services');
    if (this.consultationInfo) {
      this.updateMedicalCertFormGroup();
      this.updateReferralFormGroup();
      this.updateFollowUpFormGroup();
      this.updateMemo();

      console.log('finish updating: ', this.visitManagementFormGroup);
    }
  }

  updateMemo() {
    console.log('thisconsultation: ', this.consultationInfo.memo);

    if (this.consultationInfo.memo) {
      const memo = this.visitManagementFormGroup.get('chargeFormGroup').get('memo');
      memo.patchValue(this.consultationInfo.memo);
    }
  }

  updateFollowUpFormGroup() {
    const followUpFormGroup = this.visitManagementFormGroup
      .get('chargeFormGroup')
      .get('prescriptionFormGroup')
      .get('followUpFormGroup');
    if (this.consultationInfo.followupConsultation) {
      followUpFormGroup.patchValue({
        followupDate: this.consultationInfo.followupConsultation.followupDate,
        remarks: this.consultationInfo.followupConsultation.remarks
      });
    }

    console.log('ending: ', this.consultationInfo.memo);
  }

  updateReferralFormGroup() {
    const printFormGroup = this.visitManagementFormGroup.get('chargeFormGroup').get('printFormGroup');
    const referralArray = this.visitManagementFormGroup
      .get('chargeFormGroup')
      .get('referralFormGroup')
      .get('referralFormArray') as FormArray;
    const printReferralArray = printFormGroup.get('referralArray') as FormArray;

    if (this.consultationInfo.patientReferral) {
      let doctor;
      let clinic = new Clinic();
      let str = '';

      const patientReferrals = this.consultationInfo.patientReferral.patientReferrals;
      patientReferrals.map(
        element => {
          element.appointmentDateTime = element.appointmentDateTime ? element.appointmentDateTime : '';
          element.clinicId = element.clinicId ? element.clinicId : '';
          element.doctorId = element.doctorId ? element.doctorId : '';
          element.externalReferral = element.externalReferral ? element.externalReferral : false;
          element.memo = element.memo ? element.memo.replace(/<p>&nbsp;<\/p>/g, '') : '';
          element.memo = element.memo ? element.memo.replace(/↵/, '') : '';
          element.practice = element.practice ? element.practice : '';

          element.externalReferralDetails = element.externalReferralDetails
            ? element.externalReferralDetails
            : { address: '', doctorName: '', phoneNumber: '' };

          doctor = this.store.getDoctorList().find(doctor => doctor.id === element.doctorId);
          clinic = this.store.getClinicList().find(clinic => clinic.id === element.clinicId);

          let {appointmentDateTime, clinicId, doctorId, externalReferral, memo, practice} = element;
          const address = element.externalReferralDetails.address ? element.externalReferralDetails.address : '';
          const doctorName = element.externalReferralDetails.doctorName
            ? element.externalReferralDetails.doctorName
            : '';
          const phoneNumber = element.externalReferralDetails.phoneNumber
          ? element.externalReferralDetails.phoneNumber
          : '';

          const externalReferralDetails = this.fb.group({
            address: address,
            doctorName: doctorName,
            phoneNumber: phoneNumber
          });

          element.externalReferralDetails = element.externalReferralDetails
            ? element.externalReferralDetails
            : externalReferralDetails;

            if (!element.externalReferral) {
              str = element.memo
                ? `Referral letter to ${doctor.name} (${clinic.name}@${clinic.address.address || ''} Singapore ${
                    clinic.address.postalCode
                  })`
                : '';
              element.str = str;
            } else {
          str = element.memo
            ? `Referral letter to ${element.externalReferralDetails.doctorName} (${
                element.externalReferralDetails.address
              })`
            : '';
          element.str = str;

          const referralObj = this.fb.group({
            appointmentDateTime: appointmentDateTime,
            clinicId: clinicId,
            doctorId: doctorId,
            externalReferral: externalReferral,
            memo: memo,
            practice: practice,
            externalReferralDetails: externalReferralDetails,
            str
          });

          // Array for Referral
          referralArray.push(referralObj);

          // Array for Print Referrals
          printReferralArray.push(this.fb.group(element));
        }

        const referralObj = this.fb.group({
          appointmentDateTime: appointmentDateTime,
          clinicId: clinicId,
          doctorId: doctorId,
          externalReferral: externalReferral,
          memo: memo,
          practice: practice,
          externalReferralDetails: externalReferralDetails,
          str
        });

        referralArray.push(referralObj);
        printReferralArray.push(this.fb.group(element));
      });
    }
  }

  // Get Index of Tab Selected
  getSelectedTab(index) {
    let tempInt = parseInt(index);

    console.log('TEMP INT INDEX: ', tempInt);

    return VISIT_MANAGEMENT_TABS[tempInt];
  }

  // Get Name of Tab Selected
  getSelectedTabIndex(title) {
    return VISIT_MANAGEMENT_TABS.findIndex(tab => {
      return tab === title;
    });
  }

  // Initalise consultation Forms
  createForms() {
    this.vitalForm = this.consultationFormService.generateVitalForm();
  }

  // On Tab Select
  onSelect(event) {
    if(event instanceof TabDirective){
      console.log("GOOES::  ",event);
      this.selectedTab = event.heading;
      this.selectedTabIndex = this.getSelectedTabIndex(event.heading);
      this.tabSelected.emit(event.heading);
    } 
  }

  toggleTabTo(event){
    console.log("toggleTab To::  ",event);
      this.selectedTab = event;
      this.selectedTabIndex = this.getSelectedTabIndex(event);
      this.consultationTabs.tabs[this.selectedTabIndex].active = true;
      this.tabSelected.emit(event);
  }

  // On Patient Edit Button Clicked
  onEnableEdit() {
    this.allowEdit.next(true);

    this.visitManagementFormGroup.get('profileFormGroup').enable();
  }

  onBtnConsultClicked() {
    console.log('Consult Button Clicked');
  }

  getVitalForm() {
    return this.vitalForm;
  }
}
