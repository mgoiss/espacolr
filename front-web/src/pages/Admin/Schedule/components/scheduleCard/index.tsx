import dayjs from 'dayjs';
import React from 'react';
import Price from 'core/components/Price';
import { Schedule } from 'core/types/Schedule';
import './styles.scss';

type Prop = {
  schedule: Schedule;
}

const ScheduleCard = ({ schedule }: Prop) => (
  <div className="card-base border-radius-10 schedule-card">
    { schedule.status === "Concluido" && <div className="schedule-check bg-primary"> </div>}
    { schedule.status === "Aguardando" && <div className="schedule-check bg-warning"> </div>}
    { schedule.status === "Cancelado" && <div className="schedule-check bg-danger"> </div>}

    <div className="schedule-info">
      <h5>{schedule.client.name}</h5>
      <h6>{dayjs(schedule.date).format('DD/MM/YYYY')}</h6>
      <Price price={schedule.valuePaid} />
    </div>

  </div>
);

export default ScheduleCard;