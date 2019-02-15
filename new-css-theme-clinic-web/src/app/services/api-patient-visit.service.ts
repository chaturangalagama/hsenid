import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpResponseBody } from '../objects/response/HttpResponseBody';
import { PatientVisit } from '../objects/request/PatientVisit';
import { AttachedMedicalCoverage } from '../objects/AttachedMedicalCoverage';

@Injectable()
export class ApiPatientVisitService {
  // private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}` });
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_PATIENT_VISIT_URL;
  private API_INVENTORY_SYSTEM_URL;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.API_PATIENT_VISIT_URL = appConfig.getConfig().API_PATIENT_VISIT_URL;
    this.API_INVENTORY_SYSTEM_URL = appConfig.getConfig().API_INVENTORY_SYSTEM_URL;
  }

  initCreate(patientVisit: PatientVisit): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit/create`,
      JSON.stringify(patientVisit),
      { headers: this.headers }
    );
  }

  // consult(patientVisitRegistryId: string): Observable<HttpResponseBody> {
  //   return this.http.post<HttpResponseBody>(
  //     `${this.API_PATIENT_VISIT_URL}/patient-visit/state/change/consult/${patientVisitRegistryId}`,
  //     {},
  //     { headers: this.headers }
  //   );
  // }

  consult(visitId: string, doctorId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-visit/state/change/consult/${patientVisitRegistryId}`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/update/consult/${visitId}/${doctorId}`,
      {},
      { headers: this.headers }
    );
  }

  // postConsult(patientVisitRegistryId: string, consultationId: string): Observable<HttpResponseBody> {
  //   return this.http.post<HttpResponseBody>(
  //     `${this.API_PATIENT_VISIT_URL}/patient-visit/state/change/post-consult/${patientVisitRegistryId}/${consultationId}`,
  //     {},
  //     { headers: this.headers }
  //   );
  // }

  postConsult(visitId: string, consultation): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/update/post-consult/${visitId}`,
      JSON.stringify(consultation),
      { headers: this.headers }
    );
  }

  patientVisitSearch(visitId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-visit/search/${patientVisitRegistryId}`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/search/${visitId}`,
      {},
      { headers: this.headers }
    );
  }

  attachMedicalCoverage(
    patientVisitRegistryId: string,
    medicalCoverages: Array<AttachedMedicalCoverage>
  ): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit/attach-coverage/${patientVisitRegistryId}`,
      JSON.stringify(medicalCoverages),
      { headers: this.headers }
    );
  }

  // consultationCreate(patientId: string): Observable<HttpResponseBody> {
  //     return this.http.post<HttpResponseBody>(
  //         `${this.API_PATIENT_VISIT_URL}/patient-consultation/create/${patientId}`,
  //         {},
  //         { headers: this.headers }
  //     );
  // }

  getPatientVisitHistory(patientId: string, page: number = 0, size: number = 100): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit-history/${patientId}/${page}/${size}`,
      {},
      { headers: this.headers }
    );
  }

  getPatientVisitHistoryByDate(patientId: string, startDate: string, endDate: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit-history/by-date/${patientId}/${startDate}/${endDate}`,
      {},
      { headers: this.headers }
    );
  }

  getPatientVisitHistoryByDateAndFilter(
    patientId: string,
    searchKey: string,
    startDate: string,
    endDate: string
  ): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit-history/by-date/${patientId}/${searchKey}/${startDate}/${endDate}`,
      {},
      { headers: this.headers }
    );
  }

  patientRegistryList(clinicID: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-visit-history/patient-registry/${clinicID}`,
      // `https://devserver.lippoinnolab.com/cms-dua/patient-visit/list/by-time/5b55aabd0550de0021097b5b/30-11-2018T10:15:30/31-12-2018T10:15:30`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/list/by-time/5b55aabd0550de0021097b5b/01-01-2019T10:15:30/20-01-2019T10:15:30`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  patientRegistryListWithStartTime(clinicID: string, from: string, to: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/list/by-time/${clinicID}/${from}/${to}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  consultationCreate(patientId: string, requestPayload): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/create`,
      // `${this.API_PATIENT_VISIT_URL}/patient-consultation/create/${patientId}`,
      JSON.stringify(requestPayload),
      { headers: this.headers }
    );
  }

  consultationUpdate(consultationId: string, requestPayload): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-consultation/update/${consultationId}`,
      JSON.stringify(requestPayload),
      { headers: this.headers }
    );
  }

  consultationSearch(patientId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-consultation/search/${patientId}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  consultationSearchByPatientRegistry(visitId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-consultation/search-by-registration/${patientVisitRegistryId}`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/search/${visitId}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  listFollowUps(clinicId: string, startDate: string, endDate: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-consultation/list-followup/${clinicId}/${startDate}/${endDate}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  // https://devserver.lippoinnolab.com/patient-visit/patient-consultation/list-followup/5a9e3a35dbea1b1d7ff93cc8/01-05-2018/05-05-2018

  payment(visitId: string, req: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-visit/state/change/payment/${patientVisitRegistryId}`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/update/payment/${visitId}`,
      req,
      { headers: this.headers }
    );
  }

  paymentRollback(patientVisitRegistryId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-visit/state/rollback/payment/${patientVisitRegistryId}`,
      {},
      { headers: this.headers }
    );
  }

  billPay(patientVisitRegistryId: string, req: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/bill-payment/pay/${patientVisitRegistryId}`,
      req,
      { headers: this.headers }
    );
  }

  completed(visitId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      // `${this.API_PATIENT_VISIT_URL}/patient-visit/state/change/completed/${patientVisitRegistryId}`,
      `https://devserver.lippoinnolab.com/cms-dua/patient-visit/update/complete/${visitId}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  billSearch(patientVisitRegistryId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/bill-payment/search/${patientVisitRegistryId}`,
      JSON.stringify({}),
      { headers: this.headers }
    );
  }

  paymentCheckMedicalTest(patientVisitRegistryId, medicalTestIds: any[]): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-payment-check/payment/medical-test/${patientVisitRegistryId}`,
      JSON.stringify(medicalTestIds),
      { headers: this.headers }
    );
  }

  paymentCheckVaccination(patientVisitRegistryId, vaccinationIds: any[]): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-payment-check/payment/vaccination/dose/${patientVisitRegistryId}`,
      JSON.stringify(vaccinationIds),
      { headers: this.headers }
    );
  }

  paymentCheckMedicalService(patientVisitRegistryId: string, medicalServiceArray: any[]): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-payment-check/payment/medical-service/${patientVisitRegistryId}`,
      JSON.stringify(medicalServiceArray),
      { headers: this.headers }
    );
  }

  paymentCheckDrug(patientVisitRegistryId: string, drugArray: any[]): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-payment-check/payment/drug/${patientVisitRegistryId}`,
      JSON.stringify(drugArray),
      { headers: this.headers }
    );
  }

  paymentCheckInvoice(patientVisitRegistryId: string, consultation): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/patient-payment-check/invoice/${patientVisitRegistryId}`,
      JSON.stringify(consultation),
      { headers: this.headers }
    );
  }

  addVital(patientId: string, data: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/vital/add/${patientId}`,
      JSON.stringify(data),
      {
        headers: this.headers
      }
    );
  }

  listVital(patientId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/vital/list/${patientId}`,
      {},
      { headers: this.headers }
    );
  }

  listDocuments(listType: string, id: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/document-management/list/${listType}/${id}`,
      {},
      { headers: this.headers }
    );
  }

  listAllFiles(patientId: string, startDate: string, endDate: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/document-management/list/${patientId}/${startDate}/${endDate}`,
      {},
      { headers: this.headers }
    );
  }

  downloadDocument(downloadType: string, id: string, fileId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/document-management/download/${downloadType}/${id}/${fileId}`,
      {},
      { headers: this.headers, responseType: 'blob' as 'json' }
    );
  }

  getInventory(clinicId: string, inventories): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_INVENTORY_SYSTEM_URL}/inventory/get-usage/${clinicId}`,
      JSON.stringify(inventories),
      { headers: this.headers }
    );
  }

  checkMhcpBalance(planId: string, nric: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/mhcp-claim/balance/${planId}/${nric}`,
      {},
      { headers: this.headers }
    );
  }

  listClaimsByClinlicByDate(
    clinicId: string,
    medicalCoverageType: string,
    status: string,
    startDate: string,
    endDate: string
  ): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${
        this.API_PATIENT_VISIT_URL
      }/mhcp-claim/list-by-type/${clinicId}/${medicalCoverageType}/${status}/${startDate}/${endDate}/`,
      {},
      { headers: this.headers }
    );
  }

  saveClaim(claimId: string, claim): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/mhcp-claim/save/${claimId}/`,
      JSON.stringify(claim),
      { headers: this.headers }
    );
  }

  submitClaim(claimId: string, claim): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/mhcp-claim/submit/${claimId}/`,
      JSON.stringify(claim),
      { headers: this.headers }
    );
  }

  checkDrugBatchNo(clinicId: string, inventories): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_INVENTORY_SYSTEM_URL}/inventory/get-usage-with-batch-no/${clinicId}`,
      JSON.stringify(inventories),
      { headers: this.headers }
    );
  }

  getVisit(caseId): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(`${this.API_PATIENT_VISIT_URL}/list/by-case/${caseId}`, {
      headers: this.headers
    });
  }

  patientVisitList(patientId: string, date, caseId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/list/by-month/${patientId}/${date}/${caseId}/10`,
      {},
      { headers: this.headers }
    );
  }

  patientVisitRemove(visitId: string, caseId: string): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/remove/${visitId}/${caseId}`,
      {},
      { headers: this.headers }
    );
  }

  patientVisitAttach(caseId: string, visitIds: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      `${this.API_PATIENT_VISIT_URL}/attach/${caseId}`,
      JSON.stringify(visitIds),
      {
        headers: this.headers
      }
    );
  }
}
