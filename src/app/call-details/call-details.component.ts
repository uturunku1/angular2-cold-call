import { Component, OnInit } from '@angular/core';
import { Call } from '../call.model';
import { FirebaseObjectObservable } from 'angularfire2';
import { Location } from '@angular/common';
import { CallService } from '../call.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EditCallComponent } from '../edit-call/edit-call.component'

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.css'],
  providers: [CallService]
})
export class CallDetailsComponent implements OnInit {
  callToDisplay;
  callId: string;
  editCallForm;
  formShow = false;
  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private callService: CallService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((urlParameters)=>{
      this.callId = urlParameters['id'];
    });
    this.callService.getCallById(this.callId).subscribe(dataLastEmittedFromObserver=>{
      this.callToDisplay = dataLastEmittedFromObserver;
    });
  }

  show(){
    this.formShow =  true;
  }

  //
  // toggleEditForm(call) {
  //   if (this.editCallForm == call) {
  //     this.editCallForm = null;
  //   } else {
  //     this.editCallForm = call;
  //   }
  // }

}
