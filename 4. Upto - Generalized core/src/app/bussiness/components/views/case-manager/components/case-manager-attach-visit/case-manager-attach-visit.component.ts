import { Component, OnInit, EventEmitter } from '@angular/core';
import { ApiPatientVisitService } from '../../../patient/services/api-patient-visit.service';
import { BussinessStoreService } from '../../../../../../core/services/api-services/store-bussiness.service';
import { AlertService } from '../../../../../../core/services/util-services/alert.service';
import { AuthService } from '../../../../../../core/services/api-services/auth.service';
import { Router } from '@angular/router';
import moment = require('moment');
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-case-manager-attach-visit',
  templateUrl: './case-manager-attach-visit.component.html',
  styleUrls: ['./case-manager-attach-visit.component.scss']
})
export class CaseManagerAttachVisitComponent implements OnInit {

  rows = [];
  fromDate: string;
  startDate: Date;
  patientId: string;
  selected = [];
  visitIds = [];
  public event: EventEmitter<any> = new EventEmitter();

  columns = [
    { name: 'Date', flexGrow: 1 },
    { name: 'Purpose', flexGrow: 1 },
    { name: 'Existing Case ID', flexGrow: 1 }
  ];
  visitResponse: any;

  constructor(
    private store: BussinessStoreService,
    private alertService: AlertService,
    private apiPatientVisitService: ApiPatientVisitService,
    private authService: AuthService,
    private router: Router,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.subscribeChange();
  }

  mainFormGroup = new FormGroup({
    startDate: new FormControl()
  });

  setPage() {
    this.apiPatientVisitService.patientVisitList(this.patientId, this.fromDate, this.store.getCaseId()).subscribe(data => {
      console.log('Visit list', data);
      if (data) {
        const { payload } = data;
        this.populateData(payload);
      }
      return data;
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }

  populateData(data) {
    this.visitResponse = data.map((payload, index) => {
      const tempVisit = {
        visitId: payload.visitId,
        date: moment(moment(payload.startTime, 'YYYY-MM-DDT00:00:00')).format('DD-MM-YYYY'),
        purpose: payload.visitPurpose,
        existingCaseId: payload.caseId
      };
      return tempVisit;
    });
    this.rows = this.visitResponse;
    console.log('Visit List', this.rows);
  }

  cancelModal() {
    this.bsModalRef.hide();
  }

  subscribeChange() {
    this.mainFormGroup.valueChanges.subscribe(value => {
      this.startDate = value.startDate;
    });
  }

  showVisits() {
    console.log("DATE", this.startDate);
    if (this.startDate) {
      this.fromDate = moment(this.startDate).format('01-MM-YYYYT00:00:00');
    } else {
      this.fromDate = null;
    }
    this.setPage();
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.visitIds = [];
    selected.forEach((element) => {
      this.visitIds.push(element['visitId'])
    });
  }

  attachToThisCase() {
    console.log("Attaching cases ", this.visitIds);

    this.apiPatientVisitService.patientVisitAttach(this.store.getCaseId(), this.visitIds).subscribe(data => {
      if (data.statusCode === 'S0000') {
        this.event.emit('Refresh Case Details');
        this.cancelModal();
      } else {
        alert(data.message);
      }
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }
}
