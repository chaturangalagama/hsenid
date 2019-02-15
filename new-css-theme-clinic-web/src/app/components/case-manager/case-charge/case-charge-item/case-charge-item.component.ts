
import { map, distinctUntilChanged, debounceTime, switchMap, tap, filter } from 'rxjs/operators';
import { StoreService } from '../../../../services/store.service';
import { DISPLAY_DATE_FORMAT, INPUT_DELAY } from '../../../../constants/app.constants';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { ChargeItemDescription } from '../../../../objects/ChargeItemDescription';
import { ApiCaseManagerService } from '../../../../services/api-case-manager.service';
import { AlertService } from '../../../../services/alert.service';
import { ApiCmsManagementService } from '../../../../services/api-cms-management.service';
import { Case } from '../../../../objects/Case';

@Component({
  selector: 'app-case-charge-item',
  templateUrl: './case-charge-item.component.html',
  styleUrls: ['./case-charge-item.component.scss']
})
export class CaseChargeItemComponent implements OnInit {
  @Input() prescriptionItem: FormGroup;
  @Input() index: number;
  @Input() isAllCheck: boolean;
  @Output() onTopChargeItemDescriptionChanged = new EventEmitter<ChargeItemDescription>();

  loading = false;
  totalPrice: number;
  chargeItems = [];
  plansInSO = [];
  instructions = [];
  topChargeItemDescription: ChargeItemDescription;
  codesTypeahead = new Subject<string>();
  cost: number;
  baseUom = [];
  case: Case;
  selectedItems = [];

  constructor(
    private store: StoreService, private fb: FormBuilder,
    private apiCaseManagerService: ApiCaseManagerService,
    private alertService: AlertService,
    private apiCmsManagementService: ApiCmsManagementService
  ) { }

  ngOnInit() {
    console.log("prescriptionItem", this.prescriptionItem)
    this.topChargeItemDescription = { charge: '', cautionary: '', sig: '', remarks: '' };
    this.instructions = this.store.getInstructions();
    this.baseUom = this.store.uoms;
    this.getChargeItems();
    this.getCaseDetails();
    this.subscribeChange();
  }

  onItemSelect(item: any) {
    let plans = this.prescriptionItem.get('excludedCoveragePlanIds').value
    if(item){
      const index: number = plans.indexOf(item['planId']);
      if (index !== -1) {
        plans.splice(index, 1);
      }  
    }
    console.log("plan Selected",this.prescriptionItem.get('excludedCoveragePlanIds').value);
  }

  onItemDeSelect(item: any){
    let plans = this.prescriptionItem.get('excludedCoveragePlanIds').value
    plans.push(item['value']['planId'])
    console.log("plan deSelected",this.prescriptionItem.get('excludedCoveragePlanIds').value);
  }

  onClear(){
    let plans = this.prescriptionItem.get('excludedCoveragePlanIds').value
    plans.splice(0)
    this.plansInSO.forEach(element => {
      plans.push(element['planId'])
    });
    console.log("plan clear",this.prescriptionItem.get('excludedCoveragePlanIds').value);
  }

  subscribeChange() {
    this.prescriptionItem.valueChanges.pipe(debounceTime(INPUT_DELAY), distinctUntilChanged((a, b) => {
      return a.drugId === b.drugId;
    })).subscribe(data => {
      this.fillItemValues(data);
    });
    this.prescriptionItem.get('instruction').get('code').valueChanges.pipe(debounceTime(INPUT_DELAY)).subscribe(data => {
      this.updateInstructionToTopDescription(this.prescriptionItem.get('instruction').value);
    });
    this.prescriptionItem.get('dose').get('uom').valueChanges.pipe(debounceTime(INPUT_DELAY)).subscribe(data => {
      this.topChargeItemDescription.uom = data;
      this.updateTopDescription();
    });
    this.prescriptionItem.get('dose').get('quantity').valueChanges.pipe(debounceTime(INPUT_DELAY)).subscribe(data => {
    });
    this.prescriptionItem.get('purchaseQty').valueChanges.pipe(debounceTime(INPUT_DELAY)).subscribe(data => {
      this.topChargeItemDescription.qty = data;
      this.calculateCost(data);
    });
    this.prescriptionItem.get('dosageInstruction').get('code').valueChanges.pipe(debounceTime(INPUT_DELAY), distinctUntilChanged()).subscribe(value => {
      this.updateDosageInstructionToTopDescription(this.prescriptionItem.get('dosageInstruction').get('instruct').value);
    });
    this.prescriptionItem.get('duration').valueChanges.pipe(debounceTime(INPUT_DELAY)).subscribe(data => {
    });
    this.prescriptionItem.get('expiryDate').valueChanges.pipe(map(d => {
      d = moment(d, DISPLAY_DATE_FORMAT).format(DISPLAY_DATE_FORMAT);
      const isValid = moment(d, DISPLAY_DATE_FORMAT).isValid();
      return isValid ? d : '';
    })).subscribe(data => {
      this.prescriptionItem.get('expiryDate').patchValue(data, { emitEvent: false });
    });
    this.prescriptionItem.get('remark').valueChanges.pipe(debounceTime(INPUT_DELAY), distinctUntilChanged()).subscribe(value => {
      this.updateRemarkToTopDescription(value);
    });
  }

  fillItemValues(data) {
    let drugId = data['drugId']
    if (drugId) {
      this.apiCmsManagementService.searchListItem(drugId).subscribe(pagedData => {
        if (pagedData) {
          const { payload } = pagedData;
          let chargeItemDetail = pagedData['payload'];
          this.prescriptionItem.get('drugId').patchValue(chargeItemDetail['id']);
          this.prescriptionItem.get('dose').get('uom').patchValue(chargeItemDetail['baseUom']);
          this.prescriptionItem.get('instruction').get('code').patchValue(chargeItemDetail['frequencyCode']);
          this.prescriptionItem.get('unitPrice').get('price').patchValue(chargeItemDetail['sellingPrice']['price']);
          this.prescriptionItem.get('cost').patchValue(chargeItemDetail['cost']['price']);
          this.prescriptionItem.get('duration').patchValue(chargeItemDetail['frequency']);
          this.updateDrugToTopDescription(chargeItemDetail)
          this.updateCautionariesToTopDescription(chargeItemDetail)
        }
        return pagedData;
      },
        err => {
          this.alertService.error(JSON.stringify(err.error.message));
        });
    }
  }

  calculateCost(qty) {
    let sellingPrice = this.prescriptionItem.get('unitPrice').get('price').value
    if (qty && sellingPrice) {
      console.log('Calculating price', qty, 'x', sellingPrice);
      this.totalPrice = qty * +sellingPrice;
    }
  }

  getCaseDetails() {
    if (this.store.getCaseId) {
      this.apiCaseManagerService.searchCase(this.store.getCaseId()).subscribe(pagedData => {
        console.log('Search Case', pagedData);
        if (pagedData) {
          const { payload } = pagedData;
          this.populateData(payload);
        }
        return pagedData;
      },
        err => {
          this.alertService.error(JSON.stringify(err.error.message));
        });
    }
  }

  getChargeItems() {
    this.chargeItems = this.store.chargeItemList;
    console.log("Charge Item List = ", this.chargeItems);
  }

  populateData(data: Case) {
    this.case = data;
    this.plansInSO = this.case.coverages;
    if(!this.prescriptionItem.get('salesItemCode').value){
      let planIds = []
      this.plansInSO.forEach(element => {
        planIds.push(element['planId'])
      });
      this.prescriptionItem.get('excludedCoveragePlanIds').patchValue(planIds)
    }
    this.calculateCost(this.prescriptionItem.get('purchaseQty').value);
    this.setPlans()
  }

  setPlans(){
    let plans = this.prescriptionItem.get('excludedCoveragePlanIds').value;
    let selectedItems = [];
    if (plans) {
      this.plansInSO.forEach(element => {
        if(plans.indexOf(element['planId']) == -1){
          selectedItems.push(element)
        }
      });
    }
    console.log("selected plans ", selectedItems);
    this.selectedItems = selectedItems
  }

  updateDrugToTopDescription(chargeItem) {
    this.topChargeItemDescription.charge = chargeItem['name']
    this.topChargeItemDescription.uom = chargeItem['baseUom']
    this.updateTopDescription();
  }

  updateDosageInstructionToTopDescription(chargeItem) {
    this.topChargeItemDescription.sig = chargeItem['indications'];
    this.updateTopDescription();
  }

  updateCautionariesToTopDescription(chargeItem) {
    this.topChargeItemDescription.cautionary = chargeItem['precautionaryInstructions'];
    this.updateTopDescription();
  }

  updateInstructionToTopDescription(chargeItem) {
    let item = this.instructions.filter(x => x.code === chargeItem.code)
    if(item[0]){
      this.topChargeItemDescription.sig = item[0]['instruct'];
      this.updateTopDescription();
    }
  }

  updateRemarkToTopDescription(remark) {
    this.topChargeItemDescription.remarks = remark;
    this.updateTopDescription();
  }

  updateTopDescription() {
    console.log('emit touch');
    this.onTopChargeItemDescriptionChanged.emit(this.topChargeItemDescription);
  }
}
