import { PrintTemplateService } from './bussiness/services/print-template.service';
import { VitalService } from './bussiness/services/vital.service';
import { ErrorLogService } from './core/services/error-log.service';

import { AppConfigService } from './core/services/app-config.service';
import { JwtInterceptor } from './core/services/jwt-interceptor';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import {
  APP_SIDEBAR_NAV,
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent
} from './core/components/views/';
import { FullLayoutComponent, SimpleLayoutComponent } from './core/components/containers';
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './core/directives';
import { AlertService } from './core/services/alert.service';
import { ApiCmsManagementService } from './bussiness/components/views/consultation/services/api-cms-management.service';
import { ApiPatientInfoService } from './bussiness/components/views/patient/services/api-patient-info.service';
import { ApiPatientVisitService } from './bussiness/components/views/patient/services/api-patient-visit.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { PermissionsGuardService } from './core/services/permissions-guard.service';
import { AuthService } from './core/services/auth.service';
import { CanDeactivateGuardService } from './core/services/can-deactivate-guard.service';
import { ConsoleLoggerService } from './core/services/console-logger.service';
import { ConsultationFormService } from './bussiness/components/views/consultation/services/consultation-form.service';
import { CaseChargeFormService } from './bussiness/components/views/case-manager/services/case-charge-form.service';
import { DialogService } from './core/services/dialog.service';
// import { DrugService } from './bussiness/components/views/drug/services/drug.service';
import { LoggerService } from './core/services/logger.service';
// import { MedicalCoverageService } from './bussiness/components/views/medical-coverage/services/medical-coverage.service';
import { MedicalServiceService } from './bussiness/services/medical-service.service';
import { PatientService } from './bussiness/components/views/patient/services/patient.service';
import { PaymentService } from './bussiness/components/views/payment/services/payment.service';
import { PolicyHolderService } from './bussiness/services/policy-holder.service';
import { StoreService } from './core/services/store.service';
import { UtilsService } from './bussiness/services/utils.service';
// import { VaccinationService } from './bussiness/components/views/vaccination/services/vaccination.service';
import { SharedModule } from './shared.module';
// import { MedicalCoverageFormService } from './bussiness/components/views/medical-coverage/services/medical-coverage-form.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { API_DOMAIN } from './core/constants/app.constants';
import { TempStoreService } from './core/services/temp-store.service';
import { ApiCaseManagerService } from './bussiness/components/views/case-manager/services/api-case-manager.service';

// HTTP MODULE
// Services
// Routing
const APP_CONTAINERS = [FullLayoutComponent, SimpleLayoutComponent];

// Import components
const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
const APP_DIRECTIVES = [AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES];

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

// Import 3rd party components
@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ...APP_COMPONENTS, ...APP_DIRECTIVES],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAccessToken,
        whitelistedDomains: API_DOMAIN
      }
    }),
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [],

  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (ps: NgxPermissionsService) =>
        function() {
          return new Promise((resolve, reject) => {
            if (localStorage.getItem('roles')) {
              resolve(localStorage.getItem('roles'));
            } else {
              resolve('');
            }
          }).then((data: string) => {
            console.log('Roles Loaded', data);
            if (data) {
              return ps.loadPermissions(JSON.parse(data));
            }
          });
        },
      deps: [NgxPermissionsService],
      multi: true
    },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    ErrorLogService,
    DatePipe,

    StoreService,
    AlertService,
    AuthService,
    VitalService,
    TempStoreService,

    ApiCmsManagementService,
    ApiPatientInfoService,
    ApiPatientVisitService,
    DialogService,
    PatientService,
    // DrugService,
    // MedicalCoverageService,
    // VaccinationService,
    AuthGuardService,
    PermissionsGuardService,
    CanDeactivateGuardService,
    JwtHelperService,
    PolicyHolderService,
    PaymentService,
    ConsultationFormService,
    CaseChargeFormService,
    MedicalServiceService,
    UtilsService,
    // MedicalCoverageFormService,
    BsModalService,
    NgxPermissionsService,
    PrintTemplateService,
    ApiCaseManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
