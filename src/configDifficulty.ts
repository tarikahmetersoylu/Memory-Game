import { Difficulty, IConfig } from "./Types";

export const configDifficulty: IConfig = {
    easy: {
        cardCount: Difficulty.easy,
        column: 7
    },
    normal: {
        cardCount: Difficulty.normal,
        column: 6
    },
    hard: {
        cardCount: Difficulty.hard,
        column: 8
    }
}