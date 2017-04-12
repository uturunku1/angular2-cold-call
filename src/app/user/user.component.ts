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

  displayPoints: number[] = [0, 0, 0, 0, 0];
  todaysPoints: number[] = [];
  totalPoints: number[] = [];
  pointsFromCustomDate: number[] = [];
  today: Date;
  todayFormatted;
  pointsFromDate;

  callId;
  editCallForm;
  callToDisplay: Call;
  subscription;
  userKey: string;
  tableView: boolean = false;

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
        if (this.isToday(call['date'])) {
          this.todaysPoints.push(parseInt(call['points']));
        }
        if (this.pointsSinceDate(call['date'])) {
          this.pointsFromCustomDate.push(parseInt(call['points']));
        }
        this.calculatePoints(this.todaysPoints, 0);
        this.calculatePoints(this.pointsFromCustomDate, 1);
        this.calculatePoints(this.totalPoints, 3);
      });
    });
  }

  pointsSinceDate(callDate) {
    if (callDate > this.pointsFromDate) {
      return true;
    } else {
      return false;
    }
  }

  setDate(selectedDate) {
    this.pointsFromDate = selectedDate;
    this.resetPoints();
    this.ngOnInit();
  }

  resetPoints() {
    this.todaysPoints = [];
    this.pointsFromCustomDate = [];
    this.totalPoints = [];
  }

  isToday(date) {
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
