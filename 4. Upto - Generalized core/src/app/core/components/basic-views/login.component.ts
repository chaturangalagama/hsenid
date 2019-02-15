import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreCoreService } from '../../services/api-services/store-core.service';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UserLogin } from '../../objects/UserLogin';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/api-services/auth.service';
import { AlertService } from '../../services/util-services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClinicSelectComponent } from '../../../bussiness/components/views/clinic/clinic-select/clinic-select.component';
import { Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  clinic: string;
  clinicList = [];
  clinicListOptions = [];
  clinicData = [];
  authorizedClinicList = [];
  loading = false;
  returnUrl = 'pages/patient/list';
  clinicUrl = 'pages/clinic/select';
  bsModalRef: BsModalRef;
  hasShownPopUp = false;
  loginFormGroup: FormGroup;

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService, private storeService: StoreCoreService,
              private modalService: BsModalService, private jwtHelper: JwtHelperService, private fb: FormBuilder) {
    this.loginFormGroup = this.createLoginFormGroup();
  }

  ngOnInit() {
    // this.authorizedClinicList = [];
    // const localStorageClinicCode = localStorage.getItem('clinicCode');
    // const localStorageClinicId = localStorage.getItem('clinicId');

    // if (this.authService.isAuthenticated() && localStorageClinicCode && localStorageClinicId) {
    //   console.log('Authenticated');
    //   this.router.navigate([this.returnUrl]);
    // } else if (this.authService.isAuthenticated() && !localStorageClinicCode && !localStorageClinicId) {
    //   // this.storeService.preInit();
    //   this.storeService.getIsClinicLoaded().subscribe(data => {
    //     this.getClinicForModal(data);
    //   });
    // } else {
    //   console.log('not authenticated ');
    // }
  }

  onLoginSubmit() {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('clinicId');
    // localStorage.removeItem('clinicCode');
    // this.storeService.resetClinicLoaded();
    // this.storeService.getIsClinicLoaded().subscribe(data => {
    //   console.log('CLINIC IS LOADED: ', data);
    //   this.getClinicForModal(data);
    // });

    // this.username = this.loginFormGroup.get('username').value;
    // this.password = this.loginFormGroup.get('password').value;
    // const user = new UserLogin(this.username, this.password);

    // this.loading = true;
    // this.authService.login(user).subscribe(
    //   resp => {
    //     localStorage.setItem('access_token', resp.headers.get('Authorization').substring(7));
    //     // this.storeService.preInit();
    //     // this.storeService.startNotificationPolling();
    //   },
    //   err => {
    //     this.alertService.error(err.error.message);
    //     this.loading = false;
    //   }
    // );
    this.getClinicForModal({});
  }

  getClinicForModal(data) {
    // this.storeService.getAuthorizedClinicList();
    // this.authorizedClinicList = data;
    // const numClinics = this.authorizedClinicList.length;
    // if (numClinics === 1) {
      // this.storeService.clinicCode = this.storeService.authorizedClinicList[0].clinicCode;
      // this.storeService.clinicId = this.storeService.authorizedClinicList[0].id;
      // localStorage.setItem('clinicId', this.storeService.clinicId);
      // localStorage.setItem('clinicCode', this.storeService.clinicCode);
      // this.storeService.listDoctorsByClinic();
      this.router.navigate(['pages/patient/list']);
    // } 
    // else if (numClinics > 1) {
      // this.popClinicSelection();
    // }
  }

  // popClinicSelection() {
  //   const initialState = {title: 'Select Clinic'};

  //   if (this.authService.isAuthenticated() && !localStorage.getItem('clinicCode') && !localStorage.getItem('clinicId')) {
  //     this.bsModalRef = this.modalService.show(ClinicSelectComponent, {
  //       initialState,
  //       class: 'modal-x-lg',
  //       backdrop: 'static',
  //       keyboard: false
  //     });
  //     this.bsModalRef.content.event.subscribe(
  //       data => {
  //         this.bsModalRef.hide();
  //         this.bsModalRef.content.event.unsubscribe();
  //       },
  //       err => {
  //         this.alertService.error(err.error.message);
  //         this.loading = false;
  //       }
  //     );
  //   } 
  // }

  createLoginFormGroup(): FormGroup {
    return this.fb.group({
      // username: ['', Validators.required],
      // password: ['', Validators.required]
      username: [''],
      password: ['']
    });
  }

  ngOnDestroy() {
    // this.storeService.resetClinicLoaded();
  }

  // getClinicList() {
  //   if (this.clinicList.length < 1) {
  //     this.clinicList = this.storeService.getClinicList();
  //   }
  // }
}
