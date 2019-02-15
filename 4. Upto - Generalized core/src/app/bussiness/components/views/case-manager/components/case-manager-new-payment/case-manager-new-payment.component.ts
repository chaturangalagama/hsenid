import { Component, OnInit, Input } from '@angular/core';
import { ApiCaseManagerService } from '../../services/api-case-manager.service';
import { BussinessStoreService } from '../../../../../../core/services/api-services/store-bussiness.service';
import { AlertService } from '../../../../../../core/services/util-services/alert.service';
import { AuthService } from '../../../../../../core/services/api-services/auth.service';
import { Router } from '@angular/router';
import moment = require('moment');
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-case-manager-new-payment',
  templateUrl: './case-manager-new-payment.component.html',
  styleUrls: ['./case-manager-new-payment.component.scss']
})
export class CaseManagerNewPaymentComponent implements OnInit {

  invoices: any;
  rows = [];
  paymentTypes = [];

  columns = [
    { name: 'Mode', flexGrow: 1 },
    { name: 'Amount', flexGrow: 1 },
    { name: 'Date', flexGrow: 1 },
    { name: 'Reference', flexGrow: 1 }
  ];

  constructor(
    private store: BussinessStoreService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private bsModalRef: BsModalRef,
    private apiCaseManagerService: ApiCaseManagerService
  ) { }

  ngOnInit() {
    this.populateData(this.invoices)
  }

  mainFormGroup = new FormGroup({
    paymentType: new FormControl(),
    amount: new FormControl(),
    reference: new FormControl()
  });

  populateData(data) {
    this.rows = this.invoices.map((payload) => {
      const row = {
        paymentMode: payload.paymentMode,
        payableAmount: payload.payableAmount,
        dateTime: moment(moment(payload.invoiceTime, 'DD-MM-YYYYT00:00:00')).format('DD-MM-YYYY'),
        reference: payload.reference
      };
      return row;
    });
    console.log('Invoice List', this.rows);
  }

  cancelModal() {
    this.bsModalRef.hide();
  }

  recordPayment() {
    console.log("mainFormGroup - ",this.mainFormGroup.value);
    let newPayment = this.mainFormGroup.value;
    this.apiCaseManagerService.recordNewPayment(this.store.getCaseId(), newPayment).subscribe(data => {
      if (data.statusCode === 'S0000') {
      } else {
        alert(data.message);
      }
      this.bsModalRef.hide();
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }

  getPaymentTypes(){
    this.apiCaseManagerService.getPaymentTypes(this.store.getCaseId()).subscribe(data => {
      console.log('Update Case', data);
      if (data) {
        const { payload } = data;
        this.paymentTypes = payload;
      }
      return data;
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }
}
