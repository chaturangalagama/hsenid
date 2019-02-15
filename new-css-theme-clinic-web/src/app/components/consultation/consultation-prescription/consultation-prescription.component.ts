import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConsultationSearchComponent } from './consultation-search/consultation-search.component';
import { BsModalService } from 'ngx-bootstrap';
import { DrugItem } from './../../../objects/DrugItem';
import { Subject } from 'rxjs';
import { ConsultationFormService } from './../../../services/consultation-form.service';
import { FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TopDrugDescription } from '../../../objects/DrugDescription';
import { StoreService } from '../../../services/store.service';
@Component({
  selector: 'app-consultation-prescription',
  templateUrl: './consultation-prescription.component.html',
  styleUrls: ['./consultation-prescription.component.scss']
})
export class ConsultationPrescriptionComponent implements OnInit {
  @Input() public itemsFormArray: FormArray;
  @Input() index: number;

  drugSelected: DrugItem;
  bsModalRef: BsModalRef;
  searchKey: FormControl;

  topDrugDescription: TopDrugDescription;
  codesTypeahead = new Subject<string>();

  drugs = [];

  items = [];

  constructor(
    private consultationFormService: ConsultationFormService,
    private store: StoreService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    console.log('Pres_Array', this.itemsFormArray.controls);
    // this.searchKey = new FormControl();
    this.topDrugDescription = { charge: '', cautionary: '', sig: '', remarks: '' };
    this.drugs = this.store.drugList;

    this.items = this.store.chargeItemList;
  }

  addItem() {
    console.log('ADD Item');
    this.consultationFormService.initDrugDispatchDetails();
    // this.consultationFormService.addMultipleDrugDispatch(1);
  }

  onTopDrugDescriptionUpdated(event: TopDrugDescription) {
    console.log('touched event', event);
    this.topDrugDescription = event;
  }

  onDelete(index) {
    console.log('delete index', index);

    console.log('itemsFormArray before removla: ', this.itemsFormArray);

    this.itemsFormArray.removeAt(index);

    console.log('itemsFormArray  after removla: ', this.itemsFormArray);
  }

  onDrugSelect(option: DrugItem) {
    console.log('DRUG SELECTED: ', option);
    this.drugSelected = option;

    // Stop here for adding drug --> Ask Han for FormGroup whether to stick to current structure from consultationFormService
    // Have not binded Drug Info to the Form Group -- need Han's Help
    // this.itemsFormArray = this.consultationFormService.addMultipleDrugDispatch(1);
    this.itemsFormArray = this.consultationFormService.buildDrugDispatchDetails(option);
  }

  onSearchClicked() {
    const initialState = {
      title: 'Advanced Search',
      itemsFormArray: this.itemsFormArray
    };

    this.bsModalRef = this.modalService.show(ConsultationSearchComponent, {
      initialState,
      class: 'modal-lg',
      // backdrop: 'static',
      keyboard: false
    });

    this.bsModalRef.content.event.subscribe(data => {
      if (data) {
        console.log('received: ', data);

        console.log('this item array: ', this.itemsFormArray);
      }

      this.bsModalRef.content.event.unsubscribe();
      this.bsModalRef.hide();
    });
  }
}
