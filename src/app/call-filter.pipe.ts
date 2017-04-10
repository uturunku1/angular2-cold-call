import { Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Pipe({
  name: 'callFilter',
  pure: false
})
export class CallFilterPipe implements PipeTransform {

  transform(calls: any, filter: any, text: any) {

    if (calls === undefined || text === undefined) return calls;

    if (filter === '' || filter === undefined) {
      return calls;
    } else if (filter === 'location') {
      return calls.filter(function(call) {
        return call.location.toLowerCase().includes(text.toLowerCase());
      })
    }
  }

}
