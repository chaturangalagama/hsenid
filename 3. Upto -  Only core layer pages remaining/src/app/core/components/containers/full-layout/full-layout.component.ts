import { StoreStatus } from '../../../objects/StoreStatus';
import { StoreService } from '../../../services/store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
  // isStoreReady = false;
  isStoreReady = true;//----------
  hasError = false;
  constructor(private store: StoreService) {
    // this.storeReadinessSubscription();
  }

  storeReadinessSubscription() {
    this.store.getIsStoreReady().subscribe((val: StoreStatus) => {
      console.log('isStoreReady', val);
      this.isStoreReady = val.isLoaded && !val.isReseting;

      // if (!val) {
      this.hasError = val.hasError && val.isLoaded && !val.isReseting;
      // }

      console.log('isStoreReady after', this.isStoreReady, this.hasError);
    });
  }
}
