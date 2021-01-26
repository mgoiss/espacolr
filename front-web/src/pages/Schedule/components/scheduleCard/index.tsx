import React from 'react';
import './styles.scss';

const ScheduleCard = () => (
    <div className="card-base border-radius-10 schedule-card">
        <div className="schedule-check"> </div>   
        <div className="schedule-info">
            <h5>José Manoel Morais</h5> 
            <h6>26/01/2021</h6>
            <div className="schedule-price-container">
                <span className="schedule-currency">R$</span>
                <h3 className="schedule-price">250,00</h3>
            </div>
        </div>
                             
    </div>
);

export default ScheduleCard;