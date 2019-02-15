// General Libraries
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

// Services
import { StoreService } from './../../../../services/store.service';
import { ConsultationFormService } from './../../../../services/consultation-form.service';

// Objects
import { PatientVisitHistory } from './../../../../objects/request/PatientVisitHistory';
import { DispatchDrugDetail } from './../../../../objects/request/DrugDispatch';

// Constants
import { DB_FULL_DATE_FORMAT } from './../../../../constants/app.constants';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.scss']
})
export class PatientConsultationComponent implements OnInit {
  @Input() visitManagementFormGroup: FormGroup;
  @Input() needRefresh: Subject<boolean>;
  @Input() patientInfo;

  // UI Boolean Manipulation
  referralShown = false;
  memoShown = false;
  medicalCertificateShown = false;
  followUpShown = false;

  recentVisit: PatientVisitHistory;
  @Output() copiedPrescription = new EventEmitter<DispatchDrugDetail[]>();

  constructor(
    private store: StoreService,
    private consultationFormService: ConsultationFormService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeOnInit();
  }

  subscribeOnInit() {
    // Listen for refresh
    this.needRefresh.subscribe(value => {
      console.log('needRefresh: ', value);
    });

    
  }

  // To Display on Recent Visit
  getRecentVisitTime() {
    //  Example: 'DR CINDY XIE    28/12/2018   10:02

    const consultDoctor = this.store
      .getDoctorList()
      .find(doctor => doctor.id === this.recentVisit.consultation.doctorId);

    const time = this.recentVisit.consultation.consultationStartTime;

    let str =
      consultDoctor.name +
      '\xA0\xA0\xA0\xA0\xA0\xA0\xA0' +
      moment(time, DB_FULL_DATE_FORMAT).format('DD/MM/YYYY') +
      '\xA0\xA0\xA0\xA0\xA0' +
      moment(time, DB_FULL_DATE_FORMAT).format('HH:mm');

    return str;
  }

  // Output Events from HistoryMainContainer
  getRecentVisit(visit) {
    this.recentVisit = visit;
  }

  copyPrescription(data) {
    this.copiedPrescription.emit(data);
  }
}
