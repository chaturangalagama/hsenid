import { Observable } from 'rxjs';
import { StoreService } from '../../core/services/store.service';
import { ApiPatientVisitService } from '../components/views/patient/services/api-patient-visit.service';
import { AlertService } from '../../core/services/alert.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';

@Injectable()
export class VitalService {
  // private vitalData: any[];
  private vitalData = new BehaviorSubject<any>(undefined);

  constructor(
    private alertService: AlertService,
    private apiPatientVisitService: ApiPatientVisitService,
    private store: StoreService
  ) {}

  getPastVitals() {
    // this.vitalData = new BehaviorSubject<any>();
    this.apiPatientVisitService.listVital(this.store.getPatientId()).subscribe(
      data => {
        console.log('VITALS', data);
        if (data) {
          // this.vitalData = data.payload;
          // this.vitalData$ = Observable.of(data.payload);
          // this.vitalData$.next();
          this.vitalData.next(data.payload);
        }
      },
      err => this.alertService.error(JSON.stringify(err))
    );
  }

  // getVitalData() {
  //   return this.vitalData;
  // }

  getObservableVitalData() {
    return this.vitalData.asObservable();
  }

  resetVitalData() {
    this.vitalData = new BehaviorSubject<any>(undefined);
  }
}
