import { ConsultationComponentsModule } from './../../../components/consultation/consultation-components.module';
import { PaymentRoutingModule } from './../payment/payment-routing.module';
import { PaymentReferralComponent } from './../../../components/payment/payment-referral/payment-referral.component';
import { PaymentDiagnosisComponent } from './../../../components/payment/payment-diagnosis/payment-diagnosis.component';
import { PaymentOverallChargeComponent } from './../../../components/payment/payment-overall-charge/payment-overall-charge.component';
import { PaymentModule } from './../payment/payment.module';
import { PaymentCollectComponent } from './../payment/payment-collect/payment-collect.component';
import { PaymentComponentsModule } from './../../../components/payment/payment-components.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form.component';
import { PatientDetailComponentsModule } from '../../../components/patient-detail/patient-detail-components.module';
import { PatientDetailLayoutComponent } from '../../../containers/patient-detail-layout';
import { DynamicFormContainerComponent } from './../../../components/dynamic-form-container/dynamic-form-container.component';
import { PatientAddComponentsModule } from './../../../components/patient-add/patient-add-components.module';
import { FormService } from './../../../services/form.service';
import { PatientUpdateFormService } from './../../../services/patient-update-form.service';
import { SharedModule } from './../../../shared.module';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { PatientVisitManagementComponent } from './patient-visit-management/patient-visit-management.component';
import { ConsultationComponent } from './patient-visit-management/consultation/consultation.component';
import { QueueComponent } from './patient-visit-management/queue/queue.component';
import { QueueItemComponent } from './patient-visit-management/queue/queue-item/queue-item.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientConsultationComponent } from './patient-consultation/patient-consultation.component';
import { PatientDispensingComponent } from './patient-dispensing/patient-dispensing.component';
import { PaymentMultiStepLayoutComponent } from '../../../containers/payment-multi-step-layout';
import { PatientMedicalServicesComponent } from './patient-medical-services/patient-medical-services.component';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule,
    PatientDetailComponentsModule,
    PatientAddComponentsModule,
    PaymentRoutingModule,
    PaymentComponentsModule,
    ConsultationComponentsModule
    // PaymentModule
    ],
  declarations: [
    PatientDetailLayoutComponent,
    PatientListComponent,
    PatientAddComponent,
    PatientDetailComponent,
    PatientUpdateComponent,
    PatientSearchComponent,
    DynamicFormComponent,
    DynamicFormContainerComponent,
    PatientVisitManagementComponent,
    ConsultationComponent,
    QueueComponent,
    QueueItemComponent,
    PatientProfileComponent,
    PatientConsultationComponent,
    PatientDispensingComponent,
    PatientMedicalServicesComponent,
  
  ],

  providers: [FormService, PatientUpdateFormService]
})
export class PatientModule {}
