import { animals, foods, vehicles } from "./data"
import _ from "lodash";
import { ICard, IBestScore } from "./Types";

export const generateRandomCards = (size: number) => {
    let sliced = foods;
    if(size === 7){
        sliced = foods.slice(0, size);
    }else if(size === 12){
        sliced = vehicles.slice(0, size);
    }else{
        sliced = animals.slice(0, size);
    }
    const nCards = _.shuffle([...sliced, ...sliced]);

    const mapped: ICard[] = nCards.map((content, index) => {
        return {
            content,
            id: index,
            state: "unmatched"
        }
    })
    return mapped;
}

export const getBestScoreFromLocal = () => {
    const data = localStorage.getItem("score");
    if (data) {
        return JSON.parse(data) as IBestScore;
    }
    return { easy: null, normal: null, hard: null }
}