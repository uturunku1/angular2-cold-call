import { Component, OnInit } from '@angular/core';
import { Call } from './../call.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from './../call.service';

@Component({
  selector: 'app-add-call',
  templateUrl: './add-call.component.html',
  styleUrls: ['./add-call.component.css'],
  providers: [CallService]
})
export class AddCallComponent implements OnInit {

  calls: FirebaseListObservable<any[]>;
  points: number = 0;
  userId;

  constructor(public callService: CallService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameter) => {
      this.userId = urlParameter['id'];
    });
  }

  selectScore(selectedNumber){
    this.points= selectedNumber;
  }

  submitCall(clientName: string, companyName: string, email: string, location: string, date: string, phoneNumber: string, description: string, userId: string){
    let newCall = new Call(clientName, companyName, email, location, date, phoneNumber, description, this.points, this.userId);
    this.callService.addCall(newCall);
    this.router.navigate(['user', this.userId]);
  }

}
