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
  callId;

  constructor(private router: Router, private callService: CallService) { }

  ngOnInit() {
    this.calls = this.callService.getCalls();
  }

  checkDetails(clickedCall){
    this.router.navigate(['calls', clickedCall.$key]);
  }

}
