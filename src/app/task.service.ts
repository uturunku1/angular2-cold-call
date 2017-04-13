import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Injectable()
export class TaskService {
  tasks: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private router: Router) {
    // this.tasks = angularFire.database.list('tasks');
  }
  // getTasks(){
  //   return this.tasks;
  // }

  getTasks(id: string) {
    this.tasks= this.angularFire.database.list('/tasks/', {
      query: {
        orderByChild: 'userId',
        equalTo: id
      }
    });
    return this.tasks;
  }

  saveTask(newTask) {
    this.tasks.push(newTask);
  }


  updateTask(task) {
    var taskInFirebase = this.getTaskById(task.$key);
    taskInFirebase.update({
      what: task.what,
      when: task.when,
    });
  }

  getTaskById(id: string) {
    return this.angularFire.database.object('tasks/' + id);
  }

  deleteTaskFirebase(thisTask){
    var taskInFirebase = this.getTaskById(thisTask.$key);
    taskInFirebase.remove();
    this.router.navigate(['user']);
  }


}
