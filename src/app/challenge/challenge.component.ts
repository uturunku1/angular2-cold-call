import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";
import { Call } from './../call.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BonusService } from './../bonus.service';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers:[BonusService]
})
export class ChallengeComponent implements OnInit {
  showTimer= false;
  goal: number;
  seconds = 59;
  minutes = 0;
  private subscription1: Subscription;
  private subscription2: Subscription;
  bonusPoints ='2';
  @Input() userKey;
  // @Output() addBonus= new EventEmitter();

  constructor(public bonusService: BonusService) { }
  ngOnInit() {
  }
  setTimer(second){
    this.seconds = second;
    if(second<0){
      this.seconds=59;
    }
  }

  startTimer(goalinput,minutesInput){
    this.showTimer=true;
    this.goal = goalinput;
    this.minutes= parseInt(minutesInput)-1;

    this.subscription1 = Observable
    .interval(1000)
    .map(s=>this.seconds - 1)
    .subscribe(s=>this.setTimer(s));
    setTimeout(()=>{this.subscription1.unsubscribe();}, ((this.minutes + 1)*60000)-1000);

    this.subscription2= Observable
    .interval(60000)
    .take(this.minutes)
    .map((m) => this.minutes-1)
    .subscribe(m=>this.minutes = m);
  }
  resetTimer(){
    this.showTimer=false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
  done(){
    alert("You rock! 2 additional points have been added to your score.")
    this.showTimer=false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    var newBonusPoints = {
      points: this.bonusPoints,
      userId: this.userKey
    };
    this.bonusService.addBonus(newBonusPoints);
    // this.addBonus.emit(null);
  }

}
