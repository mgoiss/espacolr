import React from 'react';
import Price from '../../../../core/components/Price';
import './styles.scss';

const ScheduleCard = () => (
    <div className="card-base border-radius-10 schedule-card">
        <div className="schedule-check"> </div>   
        <div className="schedule-info">
            <h5>José Manoel Morais</h5> 
            <h6>26/01/2021</h6>
            <Price  price="250,00"/>
        </div>
                             
    </div>
);

export default ScheduleCard;