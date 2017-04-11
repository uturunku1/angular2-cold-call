import { Component, OnInit } from '@angular/core';
import { Call } from './../call.model';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from './../call.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [CallService]
})
export class IndexComponent implements OnInit {

  points: number = 0;

  constructor(public callService: CallService, private router: Router) { }

  ngOnInit() {
  }

  selectScore(selectedNumber){
    this.points= selectedNumber;
  }

  submitCall(clientName: string, companyName: string, email: string, location: string, date: string, phoneNumber: string, description: string){
    let newCall = new Call(clientName, companyName, email, location, date, phoneNumber, description, this.points);
    this.callService.addCall(newCall);
    this.router.navigate(['user']);
  }

}
