import { Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Call } from './call.model';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {


  transform(tasks: any, filter: any, text: any) {
    var output: any[] = [];
    if (tasks === null) {
      return tasks;
    } else {
        if (filter === '' || filter === undefined || text === undefined) {
          return tasks.sort(function(a, b) {
            if(a.when < b.when) {
              return -1;
            }
            if(a.when > b.when) {
              return 1;
            }
          });
        }

  }
}
}
