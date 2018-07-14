import { Player } from './player';
import { Championship } from './championship';

export class MatchItem {
    public matchId: number;
    public champName: string;
    public matchName: string;
}

export class Matches {
    public list: MatchItem[] = [];
}

export class Match {
    public static readonly PLAYER_A: PlayerNumber = 0;
    public static readonly PLAYER_B: PlayerNumber = 1;
    public static readonly GAME_SCORES = [0, 15, 30, 40];

    public id: number;
    public finished = false;
    public score = [0, 0];
    public winner: PlayerNumber;
    public controller: Player;

    public startDate: Date | string = new Date();
    public endDate: Date | string;
    public bestOf = 3;
    public superTieBreakLastSet = true;
    public sets: MatchSet[] = [new MatchSet(1)];
    public serving = Match.PLAYER_A;
    public events: MatchEvent[] = []
    constructor(
        public championship: Championship,
        public playerA: Player,
        public playerB: Player) { }
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
    public superTiebreak = false;
    public advantage: PlayerNumber;
    public score = [0, 0];
    constructor(public id: number) { }
}

export class MatchEvent {
    player: PlayerNumber;
    event: EventType;
}

export class Stat {
    constructor(public event: EventType, public value:number) {}
}

export type EventType = 'ace' | 'wfh' | 'wbh' | 'efh' | 'ebh' | 'df';

export type PlayerNumber = 0 | 1;

export class PlayerMatch {
    constructor(public player: Player, public playerNumber: PlayerNumber){}
}

