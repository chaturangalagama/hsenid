import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-medical-services',
  templateUrl: './patient-medical-services.component.html',
  styleUrls: ['./patient-medical-services.component.scss']
})
export class PatientMedicalServicesComponent implements OnInit {
  @Input() consultationFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log("medical services chargeformGroup: ",this.consultationFormGroup);
  }
}
