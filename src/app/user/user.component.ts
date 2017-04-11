import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';
import { Router } from '@angular/router';
import { Call } from '../call.model';
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
  editCallForm;
  callToDisplay: Call;
  subscription;
  totalPoints: number[] = [];
  displayPoints: number = 0;
  userKey: string;
  tableView: boolean = false;

  constructor(private router: Router, private callService: CallService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameter) => {
      this.userKey = urlParameter['id'];
    });
    this.calls = this.callService.getCallsUserId(this.userKey);

    this.callService.getCallsUserId(this.userKey).subscribe(result => {
      this.subscription = result;
      this.subscription.forEach(call => {
        this.totalPoints.push(parseInt(call['points']));
        this.addTotalPoints(this.totalPoints);
      });
    });
    this.addTotalPoints(this.totalPoints);


  }

  checkDetails(clickedCall){
    this.router.navigate(['calls', clickedCall.$key]);
  }

  addTotalPoints(points) {
    this.displayPoints = 0;
    for (var i = 0; i < points.length; i++) {
      this.displayPoints += points[i];
    }
  }

  toggleTableView() {
    if (this.tableView) {
      this.tableView = false;
    } else {
      this.tableView = true;
    }
  }

}
