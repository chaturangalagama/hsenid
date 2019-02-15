import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {


  @Input() isQueueHidden: boolean;
  @Output() onHide = new EventEmitter<boolean>();
  @Output() selectedPatient = new EventEmitter();
  resetAllToCollapsed = true;
  selectedPatientIndex: string;

  // Header Attributes
  preConsultCount = "30";
  postConsultCount = "05"

  queueList = [
    {
      "queueNo": 101,
      "id": "5c22db7fdbea1b78ccc05098",
      "name": "Debbie Test",
      "time": "03:11",
      "status": "CONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 102,
      "id": "5bf62ab3dbea1b39c2675ea7",
      "name": "Jon Wood",
      "time": "11:41",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 103,
      "id": "5beb7d5ddbea1b39c2675ea0",
      "name": "Testing ABC",
      "time": "09:22",
      "status": "POSTCONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 104,
      "id": "5bea79b0dbea1b39c2675e9c",
      "name": "Test Aladdin",
      "time": "10:36",
      "status": "CONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 104,
      "id": "5c242c19dbea1b78ccc0509e",
      "name": "Arnold Schawrd",
      "time": "09:08",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 105,
      "id": 368787007,
      "name": "Macias Baldwin",
      "time": "06:39",
      "status": "POSTCONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 106,
      "id": 121039450,
      "name": "Amber Dale",
      "time": "03:58",
      "status": "CONSULT",
      "remarks": "Overdose on drugs",
      "tag": "TBC"
    },
    {
      "queueNo": 107,
      "id": 83403171,
      "name": "Ware Cunningham",
      "time": "07:35",
      "status": "PRECONSULT",
      "remarks": "Diabetic",
      "tag": "To be monitored"
    },
    {
      "queueNo": 108,
      "id": 94942361,
      "name": "Katy Riggs",
      "time": "08:19",
      "status": "POSTCONSULT",
      "remarks": "Watch out on diet",
      "tag": "To be monitored"
    },
    {
      "queueNo": 109,
      "id": 94942361,
      "name": "Katy Riggs",
      "time": "08:19",
      "status": "POSTCONSULT",
      "remarks": "Watch out on diet",
      "tag": "To be monitored"
    }, {
      "queueNo": 101,
      "id": 121364696,
      "name": "Fischer Love",
      "time": "03:11",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 102,
      "id": 26556159,
      "name": "Scott Payne",
      "time": "11:41",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 103,
      "id": 260325693,
      "name": "Graciela Mullen",
      "time": "09:22",
      "status": "POSTCONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 104,
      "id": 394990534,
      "name": "Hebert Peters",
      "time": "10:36",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 104,
      "id": 210927385,
      "name": "Crosby Warren",
      "time": "09:08",
      "status": "PRECONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 105,
      "id": 368787007,
      "name": "Macias Baldwin",
      "time": "06:39",
      "status": "POSTCONSULT",
      "remarks": "Too Late",
      "tag": "To be monitored"
    },
    {
      "queueNo": 106,
      "id": 121039450,
      "name": "Amber Dale",
      "time": "03:58",
      "status": "PAYMENT",
      "remarks": "Overdose on drugs",
      "tag": "TBC"
    },
    {
      "queueNo": 107,
      "id": 83403171,
      "name": "Ware Cunningham",
      "time": "07:35",
      "status": "PRECONSULT",
      "remarks": "Diabetic",
      "tag": "To be monitored"
    },
    {
      "queueNo": 108,
      "id": 94942361,
      "name": "Katy Riggs",
      "time": "08:19",
      "status": "POSTCONSULT",
      "remarks": "Watch out on diet",
      "tag": "To be monitored"
    },
    {
      "queueNo": 109,
      "id": 94942361,
      "name": "Katy Riggs",
      "time": "08:19",
      "status": "POSTCONSULT",
      "remarks": "Watch out on diet",
      "tag": "To be monitored"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  btnQueue() {
  
    // To make Filter Button or to follow consultation history div's width
    const queueDiv = document.querySelector('#queue-div');
      this.isQueueHidden = !this.isQueueHidden;
      this.onHide.emit(this.isQueueHidden);

  }

  toggleCollapse(){
    
  }

  isSelected(index){
    console.log("index: ",index);
    if(index === this.selectedPatientIndex){
      return false;
    }else{
      return true;
    }
  }

  reloadPatientDetails(event){
    console.log("patient selected: ",event);
    this.selectedPatient.emit(event);
    this.selectedPatientIndex = event.id;
  }

}
