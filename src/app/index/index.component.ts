import { Component, OnInit } from '@angular/core';
import { Call } from './../call.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CallService } from './../call.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [CallService]
})
export class IndexComponent implements OnInit {
  calls: FirebaseListObservable<any[]>;
  points: number = 0;
  userId;

  constructor(public callService: CallService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameter) => {
      this.userId = urlParameter['id'];
    });
  }


}
