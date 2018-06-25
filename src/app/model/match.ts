import { Player } from './player';

export class Match {
    public sets: Set[] = [new Set(1)];
    constructor (public playerA: Player, public playerB: Player) {}
}

export class Set {
    public gamesA = 0;
    public gamesB = 0;

    public scoreA: Score = 0;
    public scoreB: Score = 0;
    public advantage: Advantage;
    constructor(public id: number) {}
}

export type Score =  0 | 15 | 30 | 40 | 60;

export enum Advantage {A, B}


