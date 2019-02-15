// import { MedicalCoverageItemDetailComponent } from './bussiness/components/views/medical-coverage/medical-coverage/medical-coverage-item-detail/medical-coverage-item-detail.component';
// import { MedicalCoverageItemComponent } from './bussiness/components/views/medical-coverage/medical-coverage/medical-coverage-item/medical-coverage-item.component';
// import { MedicalCoverageComponent } from './bussiness/components/views/medical-coverage/medical-coverage/medical-coverage.component';
// import { PatientAddQueueConfirmationComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-queue-confirmation/patient-add-queue-confirmation.component';
// import { PatientAddConsultationComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-consultation/patient-add-consultation.component';
// import { AddQueueMedicalCoverageItemComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-queue-confirmation/add-queue-medical-coverage/add-queue-medical-coverage-item/add-queue-medical-coverage-item.component';
// import { AddQueueMedicalCoverageComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-queue-confirmation/add-queue-medical-coverage/add-queue-medical-coverage.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxPermissionsModule } from 'ngx-permissions';

// import { VitalSignComponent } from './bussiness/components/views/consultation/components/vital/vital-sign/vital-sign.component';
import { HeaderRegistryContentComponent } from './core/components/views/header-registry/header-registry-content/header-registry-content.component';
import { HeaderRegistryComponent } from './core/components/views/header-registry/header-registry.component';
// import { PatientAddAlertsInfoAddClinicalComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-alerts-info/patient-add-alerts-info-add-clinical/patient-add-alerts-info-add-clinical.component';
// import { PatientDetailAddDocumentComponent } from './bussiness/components/views/patient/patient-detail/components/patient-detail-document/patient-detail-add-document/patient-detail-add-document.component';
// import { PatientDetailTagAddAlertComponent } from './bussiness/components/views/patient/patient-detail/components/patient-detail-tag/patient-detail-tag-add-alert/patient-detail-tag-add-alert.component';
// import { PatientHistoryDetailAddDocumentComponent } from './bussiness/components/views/patient/patient-detail/components/patient-history-detail/patient-history-detail-add-document/patient-history-detail-add-document.component';
// import { PatientHistoryDetailEditNoteComponent } from './bussiness/components/views/patient/patient-detail/components/patient-history-detail/patient-history-detail-edit-note/patient-history-detail-edit-note.component';
// import { PatientHistoryDetailEditCertificateComponent } from './bussiness/components/views/patient/patient-detail/components/patient-history-detail/patient-history-detail-edit-certificate/patient-history-detail-edit-certificate.component';
// import { PatientHistoryDetailEditCertificateItemComponent } from './bussiness/components/views/patient/patient-detail/components/patient-history-detail/patient-history-detail-edit-certificate/patient-history-detail-edit-certificate-item.component';
// import { PaymentConfirmComponent } from './bussiness/components/views/payment/components/payment-confirm/payment-confirm.component';
// import { PaymentSelectionComponent } from './bussiness/components/views/payment/components/payment-selection/payment-selection.component';
// import { DrugInputSearchModalComponent } from './bussiness/components/views/drug/components/drug-input-search-modal/drug-input-search-modal.component';
// import { DrugInputSearchComponent } from './bussiness/components/views/drug/components/drug-input-search/drug-input-search.component';
import { AlertComponent } from './core/directives/alert/alert.component';
import { ClinicSelectComponent } from './bussiness/components/views/clinic/clinic-select/clinic-select.component';
import { FollowUpsComponent } from './bussiness/components/views/communications/follow-ups/follow-ups.component';
// import { AssignMedicalCoverageItemComponent } from './bussiness/components/views/medical-coverage/assign-medical-coverage/assign-medical-coverage-item/assign-medical-coverage-item.component';
// import { AssignMedicalCoverageComponent } from './bussiness/components/views/medical-coverage/assign-medical-coverage/assign-medical-coverage.component';
// import { AddVaccinationComponent } from './bussiness/components/views/vaccination/add-vaccination/add-vaccination.component';
// import { ReferralItemComponent } from './bussiness/components/views/consultation/components/consultation-referral/referral-item/referral-item.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { LoadingComponent } from './core/components/views/loading/loading.component';
import { LoadingRetryComponent } from './core/components/views/loading-retry/loading-retry.component';
// import { PatientAddConfirmationComponent } from './bussiness/components/views/patient/patient-add/components/patient-add-confirmation/patient-add-confirmation.component';
// import { DiscountComponent } from './bussiness/components/views/consultation/components/discount/discount.component';
import { CaseManagerAttachVisitComponent} from './bussiness/components/views/case-manager/components/case-manager-attach-visit/case-manager-attach-visit.component';
import { CaseManagerNewPaymentComponent} from './bussiness/components/views/case-manager/components/case-manager-new-payment/case-manager-new-payment.component';
import { CaseManagerCloseCaseComponent } from './bussiness/components/views/case-manager/components/case-manager-close-case/case-manager-close-case.component';
import { CaseManagerDeletePaymentComponent} from './bussiness/components/views/case-manager/components/case-manager-delete-payment/case-manager-delete-payment.component';
import { CaseManagerDeleteVisitComponent } from './bussiness/components/views/case-manager/components/case-manager-delete-visit/case-manager-delete-visit.component';
import { ErrorsComponent } from './bussiness/components/shared/form/errors/errors.component';
import { SimpleErrorComponent } from './bussiness/components/shared/simple-error/simple-error.component';

// import { SelectModule } from 'ng-select';
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    // TypeaheadModule.forRoot(),
    InternationalPhoneModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    CKEditorModule,
    ChartsModule,
    AngularSvgIconModule,
    FileUploadModule,
    NgxPermissionsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    AlertComponent,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneModule,
    BsDropdownModule,
    ModalModule,
    PopoverModule,
    TabsModule,
    CollapseModule,
    BsDatepickerModule,
    CKEditorModule,
    TimepickerModule,
    ModalModule,
    ChartsModule,
    AngularSvgIconModule,
    FileUploadModule,
    NgxPermissionsModule,

    HeaderRegistryComponent,
    HeaderRegistryContentComponent,
    // VitalSignComponent,
    // DrugInputSearchComponent,
    // DrugInputSearchModalComponent,
    ClinicSelectComponent,
    FollowUpsComponent,
    // ReferralItemComponent,
    RouterModule,
    LoadingComponent,
    LoadingRetryComponent,
    // PatientAddQueueConfirmationComponent,
    // PatientAddConsultationComponent,
    // MedicalCoverageComponent,
    // MedicalCoverageItemComponent,
    // MedicalCoverageItemDetailComponent,
    // DiscountComponent,
    ErrorsComponent,
    SimpleErrorComponent
  ],
  declarations: [
    AlertComponent,
    // AssignMedicalCoverageComponent,
    // AssignMedicalCoverageItemComponent,
    // AddVaccinationComponent,
    // AssignMedicalCoverageComponent,
    // PatientDetailTagAddAlertComponent,
    // PatientAddAlertsInfoAddClinicalComponent,
    // AssignMedicalCoverageItemComponent,
    // PatientDetailAddDocumentComponent,
    // PatientHistoryDetailAddDocumentComponent,
    // PatientHistoryDetailEditNoteComponent,
    // PatientHistoryDetailEditCertificateComponent,
    // PatientHistoryDetailEditCertificateItemComponent,
    // PaymentConfirmComponent,
    // PaymentSelectionComponent,
    HeaderRegistryComponent,
    HeaderRegistryContentComponent,
    // VitalSignComponent,
    // DrugInputSearchComponent,
    // DrugInputSearchModalComponent,
    ClinicSelectComponent,
    FollowUpsComponent,
    // ReferralItemComponent,
    LoadingComponent,
    LoadingRetryComponent,
    // AddQueueMedicalCoverageComponent,
    // AddQueueMedicalCoverageItemComponent,
    // PatientAddConsultationComponent,
    // PatientAddQueueConfirmationComponent,
    // MedicalCoverageComponent,
    // MedicalCoverageItemComponent,
    // MedicalCoverageItemDetailComponent,
    // DiscountComponent,
    CaseManagerAttachVisitComponent,
    CaseManagerNewPaymentComponent,
    CaseManagerCloseCaseComponent,
    CaseManagerDeletePaymentComponent,
    CaseManagerDeleteVisitComponent,
    ErrorsComponent,
    SimpleErrorComponent
  ],
  entryComponents: [
    // AddVaccinationComponent,
    // AssignMedicalCoverageComponent,
    // PatientAddAlertsInfoAddClinicalComponent,
    // PatientAddConsultationComponent,
    // PatientDetailTagAddAlertComponent,
    // PatientDetailAddDocumentComponent,
    // PatientHistoryDetailAddDocumentComponent,
    // PatientHistoryDetailEditNoteComponent,
    // PatientHistoryDetailEditCertificateComponent,
    // PatientHistoryDetailEditCertificateItemComponent,
    // PaymentConfirmComponent,
    // PaymentSelectionComponent,
    // VitalSignComponent,
    // DrugInputSearchModalComponent,
    ClinicSelectComponent,
    FollowUpsComponent,
    // ReferralItemComponent,
    // PatientAddQueueConfirmationComponent,
    // MedicalCoverageComponent,
    // MedicalCoverageItemComponent,
    // MedicalCoverageItemDetailComponent,
    CaseManagerAttachVisitComponent,
    CaseManagerNewPaymentComponent,
    CaseManagerCloseCaseComponent,
    CaseManagerDeletePaymentComponent,
    CaseManagerDeleteVisitComponent
  ]
})
export class SharedModule {}
