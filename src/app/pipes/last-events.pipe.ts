import { Pipe, PipeTransform } from '@angular/core';
import { MatchEvent } from 'src/app/model/match';

@Pipe({
  name: 'lastEvents'
})
export class LastEventsPipe implements PipeTransform {

  transform(events: MatchEvent[]): MatchEvent[] {
    const ini = events.length > 10 ? events.length - 10 : 0;
    return events.slice(ini, events.length).reverse();
  }

}
