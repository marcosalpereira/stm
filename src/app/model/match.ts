import { Player } from './player';
import { Championship } from './championship';

export class Match {
    public static readonly PLAYER_A:PlayerMatch = 0;
    public static readonly PLAYER_B:PlayerMatch = 1;
    public static readonly GAME_SCORES =  [0, 15, 30, 40];

    public startDate = new Date();
    public endDate: Date;
    public bestOf = 3;
    public superTieBreak = true;
    public sets: MatchSet[] = [new MatchSet(1)];
    constructor (
        public championship: Championship,
        public playerA: Player,
        public playerB: Player) {}
}

export class MatchStats {
    public events: MatchEvent[] = [];
}

export class MatchSet {
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



