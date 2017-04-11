import { Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Pipe({
  name: 'date',
  pure: false
})
export class DatePipe implements PipeTransform {

  transform(calls: any, filterByDate: any, selectedDate: any) {
    if (calls === null) {
      return calls;
    } else if (filterByDate === 'after' && selectedDate != undefined) {
      return calls.filter(function(call) {
        return call.date > selectedDate;
      })
    } else if (filterByDate === 'before' && selectedDate != undefined ) {
      return calls.filter(function(call) {
        return call.date < selectedDate;
      })
    } else if (filterByDate === 'on' && selectedDate != undefined) {
      return calls.filter(function(call) {
        return call.date === selectedDate;
      })
    }else {
      return calls;
    }
  }
}
