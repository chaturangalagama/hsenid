// Libraries
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';


// Services
import { StoreService } from './../../../../services/store.service';
import { ConsultationFormService } from './../../../../services/consultation-form.service';

@Component({
  selector: 'app-consultation-search',
  templateUrl: './consultation-search.component.html',
  styleUrls: ['./consultation-search.component.scss']
})
export class ConsultationSearchComponent implements OnInit {
  @Input() itemsFormArray: FormArray;

  searchByNameField: FormControl;
  codesTypeahead = new Subject<string>();

  items = [];

  rows = [];
  selected = [];

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private store: StoreService,
              private fb: FormBuilder,
              private consultationFormService: ConsultationFormService) {}

  ngOnInit() {

    this.items = this.store.getItemList();

    this.rows = this.items;

    console.log("DRUG ROW: ",this.rows);

    this.initSearchFields();
  }

  initSearchFields(){
    this.searchByNameField = new FormControl();
    // this.searchByNameField.valueChanges
    // .pipe(filter(term => {
    //   this.rows = [];
    //   }
    // ));



    // this.searchByNameField.valueChanges
    //   .pipe(filter(term => {
    //     this.rows = [];
    //     //Filter and stop firing API if only one special char is inputted
    //     if (term.match(/[^a-zA-Z0-9 ]/g)) {
    //       const str = term.replace(/[^a-zA-Z0-9 ]/g, '');
    //       if (str.length < 1) {
    //         this.searchByNameField.setValue(str);
    //         return false
    //       }
    //     }
    //     return term;
    //   }), distinctUntilChanged(), map(data => {
    //     // remove special char for API call
    //     data = data.replace(/[^a-zA-Z0-9 ]/g, '');
    //     this.searchByNameField.setValue(data);
    //     return data
    //   }).subscribe(
    //     data => {
    //       console.log('DATA', data);
    //       if (data) {
    //         const { payload } = data;
    //         const temp2 = payload.map(payload => {
    //           const d = {
    //             name: payload.name,
    //             phone: payload.contactNumber.number,
    //             dob: payload.dob,
    //             id: payload.userId.number,
    //             patientid: payload.id
    //           };
    //           return d;
    //           // return payload.name;
    //         });
    //         // push our inital complete list
    //         this.rows = temp2;
    //       }
    //       return data;
    //     },
    //     err => {
    //       this.alertService.error(JSON.stringify(err.error.message));
    //     }
    //   );
  }

  onCancelBtnClicked(){
    console.log("Cancel");
  }

  onAddBtnClicked(){
    console.log("Add Item!");

    this.selected.forEach( item =>{
      console.log("item added: ",item);

      const itemToBePushed = <FormGroup>this.consultationFormService.newItemDispatchDetail(item);

      console.log("to be added: ",itemToBePushed);
      (<FormArray>this.itemsFormArray).push(itemToBePushed);
    });

    this.event.emit(this.itemsFormArray);
  }

  onDrugSelect($event){

    // To emit to parent component
    console.log("added drug : ",$event);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    console.log("this.selected: ",this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
