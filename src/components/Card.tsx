import * as React from 'react';
import { ICard } from '../Types';
export interface IProps {
    card: ICard
    clickHandler: (card: ICard) => void;
}

const Card: React.FunctionComponent<IProps> = ({ card, clickHandler }) => {

    const onClickHandler = () => {
        card.state = "selected"
        clickHandler(card)
    }
    switch (card.state) {
        case "matched":
            return (
                <div className="card  mb-3 matched" style={{ height: 185 }}>
                    <div className="card-body text-center" style={{ fontSize: 96 }} />
                </div>
            )
        case "selected":
            return (
                <div className="card  selected mb-3" style={{ height: 185 }}>
                    <div className="card-body text-center" style={{ fontSize: 88 }}> <i className={`fas fa-${card.content}`}></i> </div>
                </div >);

        default:
            return (
                <div className="card  unmatched mb-3 clickable" style={{ height: 185 }} onClick={onClickHandler}>
                    <div className="card-body text-center" style={{ fontSize: 96 }}>? </div>
                </div>
            )
    }

}

export { Card };