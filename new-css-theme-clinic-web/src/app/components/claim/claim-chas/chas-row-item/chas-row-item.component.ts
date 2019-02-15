import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chas-row-item',
  templateUrl: './chas-row-item.component.html',
  styleUrls: ['./chas-row-item.component.scss']
})
export class ChasRowItemComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit() {
    console.log('Form Group', this.formGroup);
    // this.formGroup.valueChanges.debounceTime(100).subscribe(value => {
    //   console.log('Form Group Value', value);
    // });
  }
}
