import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { FullLayoutComponent, SimpleLayoutComponent } from './core/components/containers';
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { PermissionsGuardService as PermissionsGuard } from './core/services/permissions-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: FullLayoutComponent,
    // canActivate: [AuthGuard, PermissionsGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadChildren: './core/components/views/basic-views/profile/profile.module#ProfileModule'
      },
      {
        path: 'patient',
        loadChildren: './bussiness/components/views/patient/patient.module#PatientModule'
      },
      {
        path: 'consultation',
        loadChildren: './bussiness/components/views/consultation/consultation.module#ConsultationModule',
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'payment',
        loadChildren: './bussiness/components/views/payment/payment.module#PaymentModule'
      },
      {
        path: 'clinic',
        loadChildren: './bussiness/components/views/clinic/clinic.module#ClinicModule'
      },
      {
        path: 'report',
        loadChildren: './bussiness/components/views/report/report.module#ReportModule'
      },
      {
        path: 'communications',
        loadChildren: './bussiness/components/views/communications/communications.module#CommunicationsModule'
      },
      {
        path: 'case',
        loadChildren: './bussiness/components/views/case-manager/case-manager.module#CaseManagerModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './core/components/views/basic-views/pages.module#PagesModule'
      }
    ]
  },
  { path: '**', redirectTo: '/pages/patient/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
