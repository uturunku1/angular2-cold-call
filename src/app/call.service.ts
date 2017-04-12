import { Injectable } from '@angular/core';
import { Call } from './call.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { AF } from "./providers/af";

@Injectable()
export class CallService {
  calls: FirebaseListObservable<any[]>;
  private userId: string;

  constructor(private angularFire: AngularFire, private router: Router, public afService: AF) {
    this.calls = angularFire.database.list('calls');

    this.afService.af.auth.subscribe(
      (auth) => {

          this.userId = auth.uid;
      }
    );
  }

  getCalls(){
    return this.calls;
  }

  addCall(newCall: Call) {
    this.calls.push(newCall);
  }

  updateCall(call) {
    var callInFirebase = this.getCallById(call.$key);
    callInFirebase.update({
      nameClient: call.nameClient,
      nameCompany: call.nameCompany,
      email: call.email,
      location: call.location,
      date: call.date,
      phoneNumber: call.phoneNumber,
      description: call.description,
      points: call.points
    });
    location.reload();
  }

  getCallById(id: string) {
    return this.angularFire.database.object('calls/' + id);
  }

  deleteFromFirebase(thisCall){
    var callInFirebase = this.getCallById(thisCall.$key);
    callInFirebase.remove();
    this.router.navigate(['user', this.userId]);
    location.reload();
  }

  getCallsUserId(id: string) {
    return this.angularFire.database.list('/calls/', {
      query: {
        orderByChild: 'userId',
        equalTo: id
      }
    });
  }


}
