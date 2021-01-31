import React from 'react';
import './styles.scss';

type Props = {
    price: number;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(price);
}

const Price = ({ price }: Props) => (
    <div className="schedule-price-container">
        <span className="schedule-currency">R$</span>
        <h3 className="schedule-price">
            {formatPrice(price)}
        </h3>
    </div>
);

export default Price;