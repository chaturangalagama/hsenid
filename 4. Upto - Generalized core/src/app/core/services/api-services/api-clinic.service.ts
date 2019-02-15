import { AppConfigService } from '../util-services/app-config.service';
import { Subject ,  Observable } from 'rxjs';
import { HttpResponseBody } from '../../objects/HttpResponseBody';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { API_CLINIC_URL } from './../../../shared/constants/app.constants';

@Injectable()
export class ApiClinicService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_CLINIC_URL;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    // this.API_CLINIC_URL = appConfig.getConfig().API_CLINIC_URL;
    this.API_CLINIC_URL = "http://localhost:8080"

  }

  listClinics(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CLINIC_URL}/clinic/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }
}
