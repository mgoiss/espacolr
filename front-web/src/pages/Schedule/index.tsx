import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleCard from './components/scheduleCard';
import './styles.scss';

const Schedule = () => {
    return( 
        <div className="schedule-container">
            <div className="schedule-filter border-radius-10 card-base">
            <h3>Filtros</h3>
            </div>            
            <div className="schedule-box">
                <Link to="/1"><ScheduleCard /></Link>
                <Link to="/2"><ScheduleCard /></Link>
                <Link to="/3"><ScheduleCard /></Link>
                <Link to="/4"><ScheduleCard /></Link>
                <Link to="/5"><ScheduleCard /></Link>
                <Link to="/6"><ScheduleCard /></Link>
                <Link to="/7"><ScheduleCard /></Link>
                <Link to="/8"><ScheduleCard /></Link>
                <Link to="/9"><ScheduleCard /></Link>
                <Link to="/10"><ScheduleCard /></Link>
                <Link to="/11"><ScheduleCard /></Link>
                <Link to="/12"><ScheduleCard /></Link>
                <Link to="/13"><ScheduleCard /></Link>
                <Link to="/14"><ScheduleCard /></Link>
                <Link to="/15"><ScheduleCard /></Link>
                <Link to="/16"><ScheduleCard /></Link>
                <Link to="/17"><ScheduleCard /></Link>
                <Link to="/18"><ScheduleCard /></Link>
                <Link to="/19"><ScheduleCard /></Link>
                <Link to="/20"><ScheduleCard /></Link>
                <Link to="/21"><ScheduleCard /></Link>
                <Link to="/22"><ScheduleCard /></Link>
                <Link to="/23"><ScheduleCard /></Link>
                <Link to="/24"><ScheduleCard /></Link>
            </div>
        </div>
    );
}

export default Schedule;