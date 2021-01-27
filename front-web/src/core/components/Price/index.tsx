import React from 'react';
import './styles.scss';

type Props = {
    price: string;
}

const Price = ({ price }: Props) => (
    <div className="schedule-price-container">
        <span className="schedule-currency">R$</span>
        <h3 className="schedule-price">
            {price}
        </h3>
    </div>
);

export default Price;