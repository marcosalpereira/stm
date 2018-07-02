import { Player } from './player';

export class Match {
    public bestOf = 3;
    public superTieBreak = true;
    public sets: Set[] = [new Set(1)];
    constructor (public playerA: Player, public playerB: Player) {}
}

export class Set {
    public events: MatchEvent[] = [];
    public gameScore = [0, 0];
    public setScore = [0, 0];
    public advantage: PlayerMatch;
    constructor(public id: number) {}
}

export class MatchEvent {
    player: PlayerMatch;
    event: EventType;
}

export type EventType = 'ace' | 'wfh' | 'wbh' | 'efh' | 'ebh';

export type PlayerMatch = 0 | 1;

export const GAME_SCORES =  [0, 15, 30, 40];

