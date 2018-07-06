import { Pipe, PipeTransform } from '@angular/core';
import { MatchEvent, Match, EventType } from '../../model/match';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(e: EventType): string {
    if (e === 'ace') {
      return 'Ace';
    }
    if (e === 'df') {
      return 'Dupla falta';
    }
    if (e === 'ebh') {
      return 'Erro na backhand';
    }
    if (e === 'efh') {
      return 'Erro no forehand';
    }
    if (e === 'wbh') {
      return 'Winner de backhand';
    }
    if (e === 'wfh') {
      return 'Winner de forehand';
    }
    return `?${e}?`;
  }

}

