import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CallService]
})
export class UserComponent implements OnInit {
  calls: FirebaseListObservable<any[]>;
  callId;
  // editCallForm;
  editCallForm;
  userKey: string;

  constructor(private router: Router, private callService: CallService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameter) => {
      this.userKey = urlParameter['id'];
    });
    this.calls = this.callService.getCallsUserId(this.userKey);
  }

  checkDetails(clickedCall){
    this.router.navigate(['calls', clickedCall.$key]);
  }

  toggleEditForm(call) {
    if (this.editCallForm == call) {
      this.editCallForm = null;
    } else {
      this.editCallForm = call;
    }
  }

  // toggleEditForm(call) {
  //   if (this.editCallForm == call) {
  //     this.editCallForm = null;
  //   } else {
  //     this.editCallForm = call;
  //   }
  // }

}
