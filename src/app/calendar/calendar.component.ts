import { Component, OnInit } from '@angular/core';
import { TaskService } from './../task.service';
import { Call } from './../call.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [TaskService]
})
export class CalendarComponent implements OnInit {
  userId;
  tasks: FirebaseListObservable<any[]>;
  calendarForm=false;
  currentDate: Date;
  todayFormatted: any;
  filterByToday: string = "all";
  constructor(public taskService: TaskService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit() {

    this.currentDate = new Date();
    this.todayFormatted = (this.currentDate.getMonth() + 1) + "/" + this.currentDate.getDate() + "/" + this.currentDate.getFullYear();

    this.route.params.forEach((urlParameter) => {
      this.userId = urlParameter['id'];
    });
    this.tasks = this.taskService.getTasks(this.userId);
  }

  toggleButton(){
    this.calendarForm= !this.calendarForm;
  }
  addToCalendar(what:string, when:string){
    if (what === '' || when === '') {
      alert("You must enter a what and when, dude.")
    } else {
      var newTask = {
          what: what,
          when: when,
          userId: this.userId
        };
      this.taskService.saveTask(newTask);
    }
    this.calendarForm= false;
  }
  deleteEvent(thisTask){
    if(confirm("Do you want to delete this event from your calendar?")){
      this.taskService.deleteTaskFirebase(thisTask);
      this.router.navigate(['index', this.userId]);
    }
  }
  onChange(optionFromMenu) {
   this.filterByToday = optionFromMenu;
 }

}
