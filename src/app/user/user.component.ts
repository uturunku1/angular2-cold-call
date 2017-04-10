import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CallService]
})
export class UserComponent implements OnInit {
  calls: FirebaseListObservable<any[]>;
<<<<<<< HEAD
  callId;
=======
  editCallForm;
>>>>>>> 9356ef655bfcc70980851362651c8ff77f9ae41f

  constructor(private router: Router, private callService: CallService) { }

  ngOnInit() {
    this.calls = this.callService.getCalls();
  }

<<<<<<< HEAD
  checkDetails(clickedCall){
    this.router.navigate(['calls', clickedCall.$key]);
=======
  toggleEditForm(call) {
    if (this.editCallForm == call) {
      this.editCallForm = null;
    } else {
      this.editCallForm = call;
    }
>>>>>>> 9356ef655bfcc70980851362651c8ff77f9ae41f
  }

}
