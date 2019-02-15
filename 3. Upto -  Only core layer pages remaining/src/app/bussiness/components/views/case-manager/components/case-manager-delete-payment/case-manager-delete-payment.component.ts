import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { StoreService } from '../../../../../../core/services/store.service';
import { AlertService } from '../../../../../../core/services/alert.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-case-manager-delete-payment',
  templateUrl: './case-manager-delete-payment.component.html',
  styleUrls: ['./case-manager-delete-payment.component.scss']
})
export class CaseManagerDeletePaymentComponent implements OnInit {

  rows = [];
  fromDate: string;
  startDate: Date;
  patientId: string;
  selected = [];
  visitIds = [];
  public event: EventEmitter<any> = new EventEmitter();

  columns = [
    { name: 'Mode', flexGrow: 1 },
    { name: 'Amount', flexGrow: 1 },
    { name: 'Date/Time', flexGrow: 1 },
    { name: 'Reference', flexGrow: 1 }
  ];
  visitResponse: any;

  constructor(
    private store: StoreService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
  }

  cancelModal() {
    this.bsModalRef.hide();
  }

  onDeletePaymentConfirm(textInput){
    console.log(textInput);
    this.event.emit({textInput: textInput});
  }
}
