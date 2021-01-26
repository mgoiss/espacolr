import React from 'react';
import ScheduleCard from './components/scheduleCard';
import './styles.scss';

const Schedule = () => {
    return( 
        <div className="schedule-container">
            <div className="schedule-filter border-radius-10 card-base">
            <h3>Filtros</h3>
            </div>            
            <div className="schedule-box">
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
            </div>
        </div>
    );
}

export default Schedule;