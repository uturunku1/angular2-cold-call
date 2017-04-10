import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CallService]
})
export class UserComponent implements OnInit {
  calls: FirebaseListObservable<any[]>;
  editCallForm;

  constructor(private callService: CallService) { }

  ngOnInit() {
    this.calls = this.callService.getCalls();
  }

  toggleEditForm(call) {
    if (this.editCallForm == call) {
      this.editCallForm = null;
    } else {
      this.editCallForm = call;
    }
  }

}
