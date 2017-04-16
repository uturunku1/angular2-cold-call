import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Injectable()
export class BonusService {
  bonusPoints: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private router: Router) {
    this.bonusPoints = angularFire.database.list('/bonusPoints/');
  }

  getBonusPoints(id: string) {
    this.bonusPoints= this.angularFire.database.list('/bonusPoints/', {
      query: {
        orderByChild: 'userId',
        equalTo: id
      }
    });
    return this.bonusPoints;
  }
  addBonus(newBonusPoints){
    console.log(newBonusPoints);
    this.bonusPoints.push(newBonusPoints);
  }
  
}
