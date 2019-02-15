// import { ReferralItemComponent } from '../consultation/components/consultation-referral/referral-item/referral-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared.module';
import { PaymentMultiStepLayoutComponent } from '../../../../core/components/containers/payment-multi-step-layout';
// import { PaymentComponentsModule } from './components/payment-components.module';
// import { ConsultationComponentsModule } from '../consultation/components/consultation-components.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentChargeComponent } from './payment-charge/payment-charge.component';
// import { PaymentCollectComponent } from './payment-collect/payment-collect.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    // PaymentComponentsModule,
    // ConsultationComponentsModule,
  ],
  declarations: [PaymentMultiStepLayoutComponent, PaymentChargeComponent, 
    // PaymentCollectComponent
  ]
})
export class PaymentModule {}
