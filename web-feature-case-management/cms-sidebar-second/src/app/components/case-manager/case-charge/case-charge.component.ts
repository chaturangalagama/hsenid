import { FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChargeItemDescription } from '../../../objects/ChargeItemDescription';
import { CaseChargeFormService } from '../../../services/case-charge-form.service';

@Component({
  selector: 'app-case-charge',
  templateUrl: './case-charge.component.html',
  styleUrls: ['./case-charge.component.scss']
})
export class CaseChargeComponent implements OnInit {
  @Input() public itemsFormArray: FormArray;
  @Input() index: number;
  @Input() caseStatus: string;
  @Output() onFirstChargeItemDetailsAdded = new EventEmitter<FormArray>();
  @Output() handleChargeItemChange = new EventEmitter<any>();


  caseChargeForm: FormGroup;
  chargeItemDescription: ChargeItemDescription;
  checkboxValue = false;

  constructor(
    private caseChargeFormService: CaseChargeFormService
    ) {}

  ngOnInit() {
    this.chargeItemDescription = { charge: '', cautionary: '', sig: '', remarks: '' };
  }

  addItem() {
    if(this.itemsFormArray.value == null){
      this.itemsFormArray = this.caseChargeFormService.addMultipleChargeItems(true, 1);
      this.onFirstChargeItemDetailsAdded.emit(this.itemsFormArray);
    }
    else
      this.caseChargeFormService.addMultipleChargeItems(true, 1);
  }

  onTopChargeItemDescriptionChanged(event: ChargeItemDescription) {
    console.log('touched event', event);
    this.chargeItemDescription = event;
  }

  deleteItem(){
    let arr = [];
    let index = 0;
    this.itemsFormArray.value.forEach(element => {
      let isChecked = this.itemsFormArray.value[index]['isChecked'];
      if(isChecked==true)
        arr.push(index);
      index++;
    });
    arr.sort(function(a, b){return b-a});
    arr.forEach(element => {
          this.itemsFormArray.removeAt(element);
      });
    this.checkboxValue = false;
    this.onTopChargeItemDescriptionChanged({ charge: '', cautionary: '', sig: '', remarks: '' })
    this.handleChargeItemChange.emit({});
  }

  onCheckAll(event) {
    console.log('onCheckAll - ' + event)
    if (event == "T"){
      this.itemsFormArray.controls.forEach(element => {
        element.get('isChecked').patchValue(true);
      });
    }
    else{
      this.itemsFormArray.controls.forEach(element => {
        element.get('isChecked').patchValue(false);
      });
    }
  }

  onHandleChargeItemChange(event) {
    console.log('handleChargeItemChange event', event);
    this.handleChargeItemChange.emit(event);
  }
}
