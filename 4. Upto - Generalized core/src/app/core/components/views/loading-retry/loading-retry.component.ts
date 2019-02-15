import { StoreCoreService } from '../../../services/api-services/store-core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-retry',
  templateUrl: './loading-retry.component.html',
  styleUrls: ['./loading-retry.component.scss']
})
export class LoadingRetryComponent implements OnInit {
  constructor(private store: StoreCoreService) {}

  ngOnInit() {}

  retry() {
    // this.store.preInit();
  }
}
