import { Injectable } from '@angular/core';
import { Call } from './call.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class CallService {
  calls: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private router: Router) {
    this.calls = angularFire.database.list('calls');
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
      // email: call.email,
      location: call.location,
      date: call.date,
      phoneNumber: call.phoneNumber,
      description: call.description,
      points: call.points
    });
  }

  getCallById(id: string) {
    return this.angularFire.database.object('calls/' + id);
  }

  deleteFromFirebase(thisCall){
    var callInFirebase = this.getCallById(thisCall.$key);
    callInFirebase.remove();
    this.router.navigate(['user']);
  }


}
