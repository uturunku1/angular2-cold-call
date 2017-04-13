import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(tasks: any, filter: any, text: any) {

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
