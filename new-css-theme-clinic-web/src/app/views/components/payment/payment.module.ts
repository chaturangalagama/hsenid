import { PatientModule } from './../patient/patient.module';
import { ReferralItemComponent } from './../../../components/consultation/consultation-referral/referral-item/referral-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared.module';
import { PaymentMultiStepLayoutComponent } from '../../../containers/payment-multi-step-layout';
import { PaymentComponentsModule } from '../../../components/payment/payment-components.module';
import { ConsultationComponentsModule } from '../../../components/consultation/consultation-components.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentChargeComponent } from './payment-charge/payment-charge.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    PaymentComponentsModule,
    ConsultationComponentsModule
  ],
  declarations: []
})
export class PaymentModule {}
