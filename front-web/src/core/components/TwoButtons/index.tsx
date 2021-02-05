import React from 'react';
import './styles.scss';

type Props = {
    valueGreen: string;
    valueRed: string;
}

const TwoButtons = ({ valueGreen, valueRed }: Props) => {
    return (
        <div className="button-container">
            <button type="button" className="btn btn-outline-danger">{ valueRed }</button>
            <button className="btn btn-primary text-white button-green" type="button">{ valueGreen }</button>
        </div>
    );
}

export default TwoButtons;