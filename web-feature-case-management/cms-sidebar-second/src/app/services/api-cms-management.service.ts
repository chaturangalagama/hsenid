import { AppConfigService } from './app-config.service';
import { PatientNoteAdd } from './../objects/request/PatientNoteAdd';
// import { API_URL, API_CMS_MANAGEMENT_URL } from './../constants/app.constants';
import { Observable } from 'rxjs';
import { HttpResponseBody } from './../objects/response/HttpResponseBody';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiCmsManagementService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL;
  private API_CMS_MANAGEMENT_URL;
  private API_PACKAGE_ITEM_INFO_URL;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.API_URL = appConfig.getConfig().API_URL;
    this.API_CMS_MANAGEMENT_URL = appConfig.getConfig().API_CMS_MANAGEMENT_URL;
    this.API_PACKAGE_ITEM_INFO_URL = appConfig.getConfig().API_PACKAGE_ITEM_INFO_URL;

  }
  uploadLabel(name: string, template: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/label/add`,
      {
        name,
        template
      },
      { headers: this.headers }
    );
  }
  searchCoverage(value: string): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/coverage/search/${value}/false`,
      {},
      { headers: this.headers }
    );
    return list;
  }
  listMedicalCoveragesWithPagination(page: number = 0, size: number = 10000): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/coverage/list/${page}/${size}/false`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listMedicalCoverages(page: number = 0, size: number = 100): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/coverage/list/all/false`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listClinics(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/clinic/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listDoctors(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/doctor/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listDoctorsByClinic(clinicId): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/doctor/list/all/${clinicId}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listMedicalServices(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/medical-service/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listDrugs(page: number = 0, size: number = 10000): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/drug/list/${page}/${size}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  searchDrugsBy(searchBy: string = 'name', keyword: string): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/drug/search/${searchBy}/${keyword}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  searchDrugs(keyword: string): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/drug/search/${keyword}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listVaccinations(page: number = 0, size: number = 10000): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/vaccination/list/${page}/${size}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listMedicalTests(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/medical-test/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listVisitPurposes(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/visit-purpose/list/all`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  listSpecialities(): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/system-config/list/speciality`,
      {},
      { headers: this.headers }
    );
  }

  listAddress(zipcode: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/system-config/postcode/${zipcode}`,
      {},
      { headers: this.headers }
    );
  }

  searchDiagnosis(term: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/diagnosis/search/${term}`,
      {},
      { headers: this.headers }
    );
  }

  searchDiagnosisByIds(ids: String[]): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(`${this.API_CMS_MANAGEMENT_URL}/diagnosis/search`, ids, {
      headers: this.headers
    });
  }

  addLabel(name: string, template: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/label/add`,
      {
        name,
        template
      },
      { headers: this.headers }
    );
  }

  updateLabel(labelId: string, name: string, template: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/label/modify/${labelId}`,
      // `https://api.healthwaymedical.com.sg/cms-management-proxy/label/modify/${labelId}`,
      // `https://cmsuatapi.lippoinnolab.com/cms-management-proxy/label/modify/${labelId}`,
      {
        name,
        template
      },
      { headers: this.headers }
    );
  }

  searchLabel(name: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/label/search/${name}`,
      // `https://cmsuatapi.lippoinnolab.com/cms-management-proxy/label/search/${name}`,
      {},
      { headers: this.headers }
    );
  }

  validateIdentification(type: string, idNumber: string): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/system-config/validate/${type}/${idNumber}`,
      {},
      { headers: this.headers }
    );
    return list;
  }

  loadTemplate(
    templateType = 'DOCTOR',
    templateId: string,
    doctorId: string,
    patientId: string
  ): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${
      this.API_CMS_MANAGEMENT_URL
      }/consultation-template/load/${templateType}/${templateId}/${doctorId}/${patientId}`,
      {},
      { headers: this.headers }
    );
  }

  listTemplates(doctorId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/consultation-template/list/${doctorId}/`,
      {},
      { headers: this.headers }
    );
  }

  /**
   *
   *
   * @param {string} doctorId
   * @returns {Observable<HttpResponseBody>}
   * @memberof ApiCmsManagementService
   */
  listPatientNotes(patientId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/patient-note/load/${patientId}/`,
      {},
      { headers: this.headers }
    );
  }

  addPatientNote(patientId: string, note: PatientNoteAdd): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_CMS_MANAGEMENT_URL}/patient-note/new-note/${patientId}/`,
      JSON.stringify(note),
      { headers: this.headers }
    );
  }

  listInstructions(): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PACKAGE_ITEM_INFO_URL}/list/instructions`,
      {},
      { headers: this.headers }
    );
  }

  listChargeItems(): Observable<HttpResponseBody> {
    const list = this.http.post<HttpResponseBody>(
      `${this.API_PACKAGE_ITEM_INFO_URL}/list`,
      {},
      { headers: this.headers }
    );
    return list;
  }
}
