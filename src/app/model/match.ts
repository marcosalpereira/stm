import { Player } from './player';
import { Championship } from './championship';

export class Match {
    public static readonly PLAYER_A: PlayerMatch = 0;
    public static readonly PLAYER_B: PlayerMatch = 1;
    public static readonly GAME_SCORES = [0, 15, 30, 40];

    public id: string;
    public finished = false;
    public score = [0, 0];
    public winner: PlayerMatch;

    public startDate = new Date();
    public endDate: Date;
    public bestOf = 3;
    public superTieBreak = true;
    public sets: MatchSet[] = [new MatchSet(1)];
    constructor(
        public championship: Championship,
        public playerA: Player,
        public playerB: Player) { }
}

export class MatchStats {
    public events: MatchEvent[] = [];
}

export class MatchSet {
    public finished = false;
    public games: MatchGame[] = [new MatchGame(1)];
    public score = [0, 0];
    constructor(public id: number) { }
}

export class MatchGame {
    public finished = false;
    public tiebreak = false;
    public advantage: PlayerMatch;
    public score = [0, 0];
    constructor(public id: number, public serving = Match.PLAYER_A) { }
}

export class MatchEvent {
    player: PlayerMatch;
    event: EventType;
}

export type EventType = 'ace' | 'wfh' | 'wbh' | 'efh' | 'ebh';

export type PlayerMatch = 0 | 1;



