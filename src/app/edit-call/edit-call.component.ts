import { Component, Input, OnInit } from '@angular/core';
import { CallService } from '../call.service';
import { CallDetailsComponent } from '../call-details/call-details.component';
import { Call } from '../call.model';

@Component({
  selector: 'app-edit-call',
  templateUrl: './edit-call.component.html',
  styleUrls: ['./edit-call.component.css'],
  providers: [CallService]
})
export class EditCallComponent implements OnInit {
  @Input() call;
  editCallForm;
  constructor(private callService: CallService) { }

  ngOnInit() {
  }

  submitEdit(call) {
    this.callService.updateCall(call);
  }


}
