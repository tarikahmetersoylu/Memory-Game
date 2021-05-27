export type cardState = "unmatched" | "matched" | "selected"
export interface ICard {
    id: number;
    content: string;
    state: cardState;
}

export enum Difficulty {
    easy = 7,
    normal = 12,
    hard = 16
}

export interface IConfig { [key: string]: { cardCount: number, column: number } }

export interface IBestScore {
    [key: string]: number | null
    // easy: number | null,
    // normal: number | null,
    // hard: number | null
}