import { StoreStatus } from '../../objects/StoreStatus';
import { Router } from '@angular/router';
import { Observable ,  Subject ,  timer } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoggerService } from '../util-services/logger.service';
import { AuthService } from './auth.service';
import { ApiClinicService } from './api-clinic.service';
import { User } from '../../objects/User';
import { AlertService } from '../util-services/alert.service';

@Injectable()
export class StoreCoreService implements OnDestroy {
  private isClinicLoaded = new Subject();
  private headerRegistry = new Subject();
  private isStoreReady = new Subject();
  currentConsultationRoute = 'route1';
  private user: User;
  authorizedClinicList = [];
  private clinicList = new Array<any>();
  clinicId: string;
  clinicCode: string = 'OUB';
  clinic;
  errorMessages = [];
  notificationList = [];
  unreadNotificationList = [];
  notificationPolling: any;
  registryPolling: any;
  private storeSuccessCount = 0;
  private storeFailCount = 0;
  private storeStatus: StoreStatus;

  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private apiClinicService: ApiClinicService,
    private alertService: AlertService,
    private logger: LoggerService,
    private router: Router
  ) {
    this.storeStatus = new StoreStatus(false, false, false);
    // if (
    //   localStorage.getItem('access_token') &&
    //   localStorage.getItem('clinicCode') &&
    //   localStorage.getItem('clinicId')
    // ) {
    //   this.clinicCode = localStorage.getItem('clinicCode');
    //   this.clinicId = localStorage.getItem('clinicId'); // preInit would have been called

    //   // this.getPatientRegistryList();
    // } else {
    //   console.log("can't");
    // }
    // this.preInt();
  }

  // preInit() {
  //   console.log('Store pre-Init');
  //   this.storeSuccessCount = 0;
  //   this.storeFailCount = 0;
  //   this.storeStatus.hasError = false;
  //   this.storeStatus.isLoaded = false;
  //   this.storeStatus.isReseting = true;
  //   this.isStoreReady.next(this.storeStatus);
  //   if (this.authService.isAuthenticated()) {
  //     this.authService.getUser().subscribe(
  //       res => {
  //         this.logger.info('USER', res.payload);
  //         this.user = res.payload;
  //         localStorage.setItem('roles', JSON.stringify(this.user.roles));
  //         this.permissionsService.loadPermissions(this.user.roles);
  //         this.authService.permissionsLoaded = true;
  //         this.listTemplates();
  //         this.initStore();
  //       },
  //       err => this.alertService.error(JSON.stringify(err))
  //     );
  //   }
  // }

  ngOnDestroy() {
    this.unsubscribeNotificationPolling();
    this.unsubscribeRegistryPolling();
  }

  initStore() {
    this.authService.isLogout().subscribe(data => {
      this.logoutClearUp();
    });
    this.alertService.getMessage().subscribe(msg => console.log(msg));
    this.apiClinicService.listClinics().subscribe(
      res => {
        console.log('GOT CLINIC LIST');
        if (res.payload) {
          this.clinicList = res.payload;
          this.isClinicLoaded.next(res.payload);
          console.log('111 ai ISCLINICLOADED: ', res.payload);
          this.isClinicLoaded.complete();
          this.clinic = this.clinicList.find(clinic => clinic.id === this.clinicId);
          this.setStoreReady(true);
        }
      },
      err => {
        this.alertService.error(JSON.stringify(err));
        this.errorMessages['listClinics'] = err;
        this.setStoreReady(false);
      }
    );
    this.startHeaderRegistryPolling();
    this.startNotificationPolling();
  }

  listDoctorsByClinic() {
    if (this.clinicId) {
    }
  }

  setStoreReady(hasSucceeded: boolean) {
    if (hasSucceeded) 
      this.storeSuccessCount++;
    else 
      this.storeFailCount++;
    console.log('isStoreReady Count', this.storeSuccessCount, this.storeFailCount);
    if (this.storeSuccessCount >= 12) {
      this.storeStatus.hasError = false;
      this.storeStatus.isLoaded = true;
      this.storeStatus.isReseting = false;
      this.isStoreReady.next(this.storeStatus);
    } else if (this.storeSuccessCount + this.storeFailCount === 12) {
      this.storeStatus.hasError = true;
      this.storeStatus.isLoaded = true;
      this.storeStatus.isReseting = false;
      this.isStoreReady.next(this.storeStatus);
    }
  }

  startHeaderRegistryPolling() {
    if (!this.registryPolling) {
      this.registryPolling = timer(0, 20000).subscribe(val => {
        // this.updatePatientRegistryList();
      });
    }
  }

  unsubscribeNotificationPolling() {
    if (this.notificationPolling) {
      this.notificationPolling.unsubscribe();
      this.notificationPolling = null;
    }
  }

  startNotificationPolling() {
    if (!this.notificationPolling) {
      this.notificationPolling = timer(1000, 20000).subscribe(val => {
        this.updateNotificationList();
      });
    }
  }

  unsubscribeRegistryPolling() {
    if (this.registryPolling) {
      this.registryPolling.unsubscribe();
      this.registryPolling = null;
    }
  }

  getAuthorizedClinicList() {
    const tempArray = [];
    if (this.user) {
      this.clinicList.map(clinic => {
        clinic.clinicStaffUsernames.forEach(staffUsername => {
          if (staffUsername === this.user.userName) {
            tempArray.push(clinic);
          } else {
            console.log('staff has no access in this clinic: ', clinic);
          }
        });
      });
    }
    this.authorizedClinicList = tempArray;
    return tempArray;
  }

  findClinic(clinicId: string) {
    return this.clinicList.find(element => element.id === clinicId);
  }

  getUser(): User {
    return this.user;
  }

  getUserId(): string {
    return this.user.context['cms-user-id'];
  }

  getUserLabel(): string {
    return this.user ? this.user.userName.slice(0, 1).toUpperCase() : '';
  }

  getClinicId(): string {
    return this.clinicId;
  }

  getClinic() {
    return this.clinicList.find(clinic => clinic.id === this.clinicId);
  }

  getClinicList(page: number = 0, size: number = 10000) {
    return this.clinicList.slice(size * page, size * (page + 1));
  }

  getNotificationList() {
    return this.notificationList;
  }

  getUnreadNotificationList() {
    return this.unreadNotificationList;
  }

  getIsClinicLoaded(): Observable<any> {
    console.log('111 aisClinic)');
    return this.isClinicLoaded.asObservable();
  }

  resetClinicLoaded() {
    this.isClinicLoaded = new Subject();
  }

  getHeaderRegistry() {
    return this.headerRegistry.asObservable();
  }

  resetHeaderRegistry() {
    this.headerRegistry = new Subject();
  }

  getIsStoreReady(): Observable<any> {
    return this.isStoreReady.asObservable();
  }

  resetIsStoreReady() {
    this.isStoreReady = new Subject();
  }

  updateNotificationList() {
    if (this.authService.isAuthenticated()) {
      // this.apiPatientInfoService.listNotifications().subscribe(res => {
      //   this.notificationList = res.payload;
      //   this.unreadNotificationList = this.notificationList.filter(notification => !notification.read);
      // });
    } else {
      this.unsubscribeNotificationPolling();
    }
  }

  updateUnreadNotificationList() {
    this.unreadNotificationList = this.notificationList.filter(notification => !notification.read);
  }

  logoutClearUp() {
    this.unsubscribeNotificationPolling();
    this.unsubscribeRegistryPolling();
    this.clinicCode = '';
    this.clinicId = '';
    this.router.navigate(['login']);
    this.storeSuccessCount = 0;
  }

}
