import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  showTimer= false;
  goal: number;
  timerSet;
  seconds = 0;
  minutes = 0;
  hours =0;
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor() { }
  ngOnInit() {
  }
  // toggleButton(){
  //   this.showTimer= !this.showTimer;
  // }
  startTimer(goalinput,timerInput){
    this.showTimer=true;
    this.goal = goalinput;
    this.timerSet=timerInput;
    let timer1 = Observable.timer(0, 1000);
    let timer2 = Observable.timer(0,60000);
    let timer3 = Observable.timer(0,8000);

    this.subscription1 = timer1.subscribe(t=>this.seconds = t);
    this.subscription2= timer2.subscribe(t=>this.minutes = t);
    this.subscription3=timer3.subscribe(t=>this.hours = t);
  }
  stopTimer(){
    this.showTimer=false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

}
