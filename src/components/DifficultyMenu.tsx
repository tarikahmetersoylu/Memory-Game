import * as React from 'react';
import { Difficulty } from '../Types';
interface IProps {
    setDiffHandler: (dlevel: number) => void;
    isDisabled: boolean;
    currentDiflevel: Difficulty
}

export const Menu: React.FunctionComponent<IProps> = ({ setDiffHandler, isDisabled, currentDiflevel }) => {
    const clickHandler = (size: number) => {
        setDiffHandler(size)
    }
    const isActive = (level: Difficulty) => {
        return currentDiflevel === level ? "": "-outline";
    }
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" disabled={isDisabled} onClick={() => clickHandler(Difficulty.easy)} className={`btn btn${isActive(Difficulty.easy)}-success`}>Kolay</button>
            <button type="button" disabled={isDisabled} onClick={() => clickHandler(Difficulty.normal)} className={`btn btn${isActive(Difficulty.normal)}-warning`}>Orta</button>
            <button type="button" disabled={isDisabled} onClick={() => clickHandler(Difficulty.hard)} className={`btn btn${isActive(Difficulty.hard)}-danger`}>Zor</button>
        </div>
    );
}
