import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  @Input() callId;

  displayPoints: number[] = [0, 0, 0, 0, 0];
  todaysPoints: number[] = [];
  totalPoints: number[] = [];
  pointsFromCustomDate: number[] = [];
  today: Date;
  todayFormatted;
  pointsFromDate;

  subscription;
  userKey: string;

  constructor(private callService: CallService) { }

  ngOnInit() {
    this.today = new Date();
    this.todayFormatted = this.today.getFullYear() + "-" + "0" + (this.today.getMonth() + 1) + "-" + this.today.getDate();

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

  calculatePoints(points, pointType) {
    this.displayPoints[pointType] = 0;
    for (var i = 0; i < points.length; i++) {
      this.displayPoints[pointType] += points[i];
    }
  }

}
