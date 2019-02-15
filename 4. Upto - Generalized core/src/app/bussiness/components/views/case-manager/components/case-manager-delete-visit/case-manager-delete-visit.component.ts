import { Component, OnInit, EventEmitter } from '@angular/core';
import { BussinessStoreService } from '../../../../../../core/services/api-services/store-bussiness.service';
import { AlertService } from '../../../../../../core/services/util-services/alert.service';
import { AuthService } from '../../../../../../core/services/api-services/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { ApiPatientVisitService } from '../../../patient/services/api-patient-visit.service';

@Component({
  selector: 'app-case-manager-delete-visit',
  templateUrl: './case-manager-delete-visit.component.html',
  styleUrls: ['./case-manager-delete-visit.component.scss']
})
export class CaseManagerDeleteVisitComponent implements OnInit {

  visitId: string
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private store: BussinessStoreService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private bsModalRef: BsModalRef,
    private apiPatientVisitService: ApiPatientVisitService
  ) { }

  ngOnInit() {
  }

  cancelModal() {
    this.bsModalRef.hide();
  }

  deleteVisit(){
    this.apiPatientVisitService.patientVisitRemove(this.visitId, this.store.getCaseId()).subscribe(data => {
      if (data) {
        if (data.statusCode === 'S0000') {
          console.log("Remove visit success -", this.visitId);
          this.event.emit('Refresh Case Details');
        } else {
          alert(data.message);
        }
        this.bsModalRef.hide();
      }
      return data;
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }
}
