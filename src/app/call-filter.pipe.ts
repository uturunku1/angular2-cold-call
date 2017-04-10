import { Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Pipe({
  name: 'callFilter',
  pure: false
})
export class CallFilterPipe implements PipeTransform {

  transform(calls: any) {

    if (calls) {
      return calls;
    }
  }

}
