import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { StoreService } from '../../../../../../core/services/store.service';
import { AlertService } from '../../../../../../core/services/alert.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ApiCaseManagerService } from '../../services/api-case-manager.service';

@Component({
  selector: 'app-case-manager-close-case',
  templateUrl: './case-manager-close-case.component.html',
  styleUrls: ['./case-manager-close-case.component.scss']
})
export class CaseManagerCloseCaseComponent implements OnInit {

  outstanding: string;
  caseId: string;

  constructor(
    private bsModalRef: BsModalRef,
    private store: StoreService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private apiCaseManagerService: ApiCaseManagerService
  ) { }

  ngOnInit() {
  }

  cancelModal() {
    this.bsModalRef.hide();
  }

  closeCase() {
    console.log("Closing case ", this.caseId);

    this.apiCaseManagerService.closeCase(this.caseId).subscribe(data => {
      if (data.statusCode === 'S0000') {
        console.log("Closing case success");
        this.backToAllCases();
      } else {
        alert(data.message);
      }
      this.bsModalRef.hide();
    },
      err => {
        this.alertService.error(JSON.stringify(err.error.message));
      });
  }

  backToAllCases() {
    this.router.navigate(['/pages/case/list']);
    return false;
  }

  hasOutstanding() {
    if (+this.outstanding > 0) {
      return true;
    }
    else
      false
  }

}
