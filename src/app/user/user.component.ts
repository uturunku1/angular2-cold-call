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
  todaysPoints: number[] = [];
  todaysPointsTotal: number = 0;
  callId;
  editCallForm;
  callToDisplay: Call;
  subscription;
  totalPoints: number[] = [];
  displayPoints: number[] = [0, 0, 0, 0, 0];
  userKey: string;
  tableView: boolean = false;
  today: Date;
  todayFormatted;

  constructor(private router: Router, private callService: CallService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.today = new Date();
    this.todayFormatted = this.today.getFullYear() + "-" + "0" + (this.today.getMonth() + 1) + "-" + this.today.getDate();
    this.route.params.forEach((urlParameter) => {
      this.userKey = urlParameter['id'];
    });
    this.calls = this.callService.getCallsUserId(this.userKey);

    this.callService.getCallsUserId(this.userKey).subscribe(result => {
      this.subscription = result;
      this.subscription.forEach(call => {
        this.totalPoints.push(parseInt(call['points']));
        if (this.addPointsByDate(call['date'])) {
          this.todaysPoints.push(parseInt(call['points']));
        }
        this.calculatePoints(this.totalPoints, 3);
        this.calculatePoints(this.todaysPoints, 0);
      });
    });
    // this.calculatePoints(this.totalPoints, 3);
  }

  addPointsByDate(date) {
    if (date === this.todayFormatted) {
      return true;
    } else {
      return false;
    }
  }

  checkDetails(clickedCall){
    this.router.navigate(['calls', clickedCall.$key]);
  }

  calculatePoints(points, pointType) {
    this.displayPoints[pointType] = 0;
    for (var i = 0; i < points.length; i++) {
      this.displayPoints[pointType] += points[i];
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
