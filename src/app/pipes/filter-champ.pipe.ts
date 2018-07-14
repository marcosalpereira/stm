import { Pipe, PipeTransform } from '@angular/core';
import { MatchItem } from 'src/app/model/match';

@Pipe({
  name: 'filterChamp'
})
export class FilterChampPipe implements PipeTransform {

  transform(matchs: MatchItem[], champName: string): MatchItem[] {
    return matchs.filter(m => m.champName === champName);
  }

}
