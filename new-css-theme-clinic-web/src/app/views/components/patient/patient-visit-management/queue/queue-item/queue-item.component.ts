import { StoreService } from './../../../../../../services/store.service';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.scss']
})
export class QueueItemComponent implements OnInit {

  // isCollapsed;
  @Input() isQueueHidden;
  @Input() item;
  @Input() index;
  @Input() isCollapsed;

  urgent;

  @Output() itemClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log("item: ",this.item);
    // this.isCollapsed = true; 
  }

  getItemRowClass(){
    var className = 'list-group-item';
    if(!this.isCollapsed){
      className += ' selected';
    }

    if(this.index%2!=0){
      return className + ' item-odd';
    } else {
      return className + ' item-even';
    }
  }

  rowClicked(){
    this.isCollapsed = !this.isCollapsed;

    if(this.isQueueHidden){
      if(!this.isCollapsed)
      {
        this.isCollapsed = !this.isCollapsed;
        
      }
    } 
    this.populatePatientInfo();
  }

  getStatusColor(str){

    var className = 'text-';

    switch(str){
      case 'PRECONSULT':
        className += 'vivid-purple';
        break;
      case 'CONSULT':
        className += 'squash';
        break;
      case 'POSTCONSULT':
        className += 'cerulean';
        break;
    }

    return className;
  }

  populatePatientInfo(){
    this.itemClicked.emit(this.item);
  }
}
