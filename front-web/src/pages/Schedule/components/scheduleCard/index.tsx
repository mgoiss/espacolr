import dayjs from 'dayjs';
import React from 'react';
import Price from '../../../../core/components/Price';
import { Schedule } from '../../../../core/types/Schedule';
import './styles.scss';

type Prop = {
    schedule: Schedule;
}

const ScheduleCard = ({ schedule }: Prop) => (
    <div className="card-base border-radius-10 schedule-card">
        { schedule.status == "Concluido" && <div className="schedule-check concluded"> </div>}
        { schedule.status == "Aguardando" && <div className="schedule-check waiting"> </div>}
        { schedule.status == "Camcelado" && <div className="schedule-check canceled"> </div>}   

        <div className="schedule-info">
            <h5>{schedule.client.name}</h5> 
            <h6>{dayjs(schedule.date).format('DD/MM/YYYY')}</h6>
            <Price  price={schedule.price}/>
        </div>
                             
    </div>
);

export default ScheduleCard;