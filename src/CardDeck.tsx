import * as React from 'react';
import { Card } from './components/Card';
import { ICard, cardState, Difficulty, IBestScore } from './Types';
import _ from "lodash";
import { generateRandomCards, getBestScoreFromLocal } from './helper';
import { Menu } from './components/DifficultyMenu';
import { configDifficulty } from './configDifficulty';
import UIfx from 'uifx';


interface IState {
    cards: ICard[];
    count: number;
    bestScore: IBestScore;
}

const success = new UIfx(`${process.env.PUBLIC_URL}/sounds/success.mp3`);
const fail = new UIfx(`${process.env.PUBLIC_URL}/sounds/fail.mp3`);

function startTime() {
    
  }
class CardDeck extends React.Component<{}, IState> {

    componentDidMount(){

        }
    selectedCardIds: number[] = [];
    selectedCards: ICard[] = [];
    difficulty = Difficulty.easy;
    isFinished: boolean = false;
    state: IState = {
        cards: generateRandomCards(this.difficulty),
        count: 0,
        bestScore: getBestScoreFromLocal()
    }
    cardClickHandler = (card: ICard) => {
        const { cards } = this.state;
        if (this.selectedCardIds.length < 2) {
            this.selectedCardIds.push(card.id);
            this.selectedCards.push(card);
            this.setState({
                ...this.state,
                cards: cards.map(c => c.id === card.id ? card : c)
            }, this.checkMatch)
        }
    }
    checkMatch = () => {
        if (this.selectedCardIds.length === 2) {
            const { cards, count } = this.state;
            setTimeout(() => {
                let newCards: ICard[] = [];
                let nextState: cardState = "unmatched";
                if (this.selectedCards[0].content === this.selectedCards[1].content) {
                    nextState = "matched";
                    success.play();
                }else{
                    fail.play();
                }
                newCards = cards.map(c => {
                    if (this.selectedCardIds.includes(c.id)) {
                        c.state = nextState;           
                    }
                    return c;
                })
                this.selectedCardIds = [];
                this.selectedCards = []
                this.setState({
                    ...this.state,
                    count: count + 1,
                    cards: newCards
                }, this.checkIsFinished);
            }, 500);
        }
    }
    checkIsFinished = () => {
        if (this.state.cards.every(a => a.state === "matched")) {
            this.isFinished = true;
            const { bestScore, count } = this.state;
            const bestVal = bestScore[Difficulty[this.difficulty]];
            const newbestScore = { ...bestScore };
            if (bestVal) {
                if (count < bestVal) {
                    newbestScore[Difficulty[this.difficulty]] = count
                }
            } else {
                newbestScore[Difficulty[this.difficulty]] = count
            }
            localStorage.setItem("score", JSON.stringify(newbestScore));
            this.setState({
                ...this.state,
                bestScore: newbestScore
            })
        }
    }
    reset = () => {
        this.selectedCardIds = [];
        this.selectedCards = []
        this.isFinished = false;
        this.setState({
            ...this.state,
            cards: generateRandomCards(this.difficulty),
            count: 0
        })
    }
    setDifficulty = (difficulty: Difficulty) => {
        this.difficulty = difficulty;
        this.isFinished = false;
        this.selectedCardIds = [];
        this.selectedCards = []
        this.setState({
            ...this.state,
            cards: generateRandomCards(this.difficulty),
            count: 0
        })
    }

    finished = () => (
        < div className="card finished">
            <div className="card-body text-center">
                Oyun Bitti. Skor: {this.state.count}
            </div>
        </div >
    )
    render() {
        const { count, cards, bestScore } = this.state;
        const cardList = cards.map(c => (<Card key={c.id} card={{ ...c }} clickHandler={this.cardClickHandler} />))
        const columnCount = configDifficulty[Difficulty[this.difficulty]].column;
        return (
            <div className="container p-3 bg-dark">
                <div className="d-flex justify-content-between">
                    <div className="col"><span className="text-white">Hamle:{count}</span></div>
                    <div className="col"><span className="text-white">En iyi Skor:{bestScore[Difficulty[this.difficulty]]}</span></div>
                    <div className="col"><span className="text-white"></span></div>
                </div>
                <hr />
                {
                    this.isFinished ? (this.finished()) : (<div className="card-columns" style={{ columnCount }}>
                        {
                            cardList
                        }
                    </div>)
                }
                <hr />
                <div className="d-flex justify-content-center">
                    <button onClick={this.reset} className="btn btn-primary mr-3" disabled={(count < 1)}>Sıfırla <i className="fas fa-undo"></i> </button>
                    <Menu isDisabled={(count > 0)} setDiffHandler={this.setDifficulty} currentDiflevel={this.difficulty} />
                </div>

            </div>);
    }
}

export { CardDeck };