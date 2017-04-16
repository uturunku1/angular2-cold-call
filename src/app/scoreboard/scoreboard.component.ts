import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from '../call.service';
import { BonusService } from '../bonus.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  providers:[BonusService]
})
export class ScoreboardComponent implements OnInit {
  @Input() userKey;

  displayPoints: number[] = [0, 0, 0, 0, 0];
  todaysPoints: number[] = [];
  totalPoints: number[] = [];
  pointsFromCustomDate: number[] = [];
  today: Date;
  todayFormatted;
  pointsFromDate;
  subscription;

  constructor(private bonusService: BonusService, private callService: CallService) { }

  ngOnInit() {

    this.today = new Date();
    this.todayFormatted = this.today.getFullYear() + "-" + "0" + (this.today.getMonth() + 1) + "-" + this.today.getDate();
    this.resetPoints();

    this.bonusService.getBonusPoints(this.userKey).subscribe(result=>{
      this.subscription = result;
      this.subscription.forEach(bonus => {
        this.totalPoints.push(parseInt(bonus['points']));
        this.todaysPoints.push(parseInt(bonus['points']));
        this.calculatePoints(this.todaysPoints, 0);
        this.calculatePoints(this.totalPoints, 3);
      });
    });

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
  // bonusPoints(){
  //   this.displayPoints[0] += 2;
  //   this.displayPoints[3] +=2;
  // }

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
