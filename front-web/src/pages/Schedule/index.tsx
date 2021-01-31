import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../core/components/Footer';
import ScheduleCard from './components/scheduleCard';
import './styles.scss';

const Schedule = () => {
    return( 
        <div className="schedule-container">
            <div className="schedule-filter border-radius-10 card-base">
            <h3>Filtros</h3>
            </div>            
            <div className="schedule-box">
                <Link to="schedule/1"><ScheduleCard /></Link>
                <Link to="schedule/2"><ScheduleCard /></Link>
                <Link to="schedule/3"><ScheduleCard /></Link>
                <Link to="schedule/4"><ScheduleCard /></Link>
                <Link to="schedule/5"><ScheduleCard /></Link>
                <Link to="schedule/6"><ScheduleCard /></Link>
                <Link to="schedule/7"><ScheduleCard /></Link>
                <Link to="schedule/8"><ScheduleCard /></Link>
                <Link to="schedule/9"><ScheduleCard /></Link>
                <Link to="schedule/10"><ScheduleCard /></Link>
                <Link to="schedule/11"><ScheduleCard /></Link>
                <Link to="schedule/12"><ScheduleCard /></Link>
                <Link to="schedule/13"><ScheduleCard /></Link>
                <Link to="schedule/14"><ScheduleCard /></Link>
                <Link to="schedule/15"><ScheduleCard /></Link>
                <Link to="schedule/16"><ScheduleCard /></Link>
                <Link to="schedule/17"><ScheduleCard /></Link>
                <Link to="schedule/18"><ScheduleCard /></Link>
                <Link to="schedule/19"><ScheduleCard /></Link>
                <Link to="schedule/20"><ScheduleCard /></Link>
                <Link to="schedule/21"><ScheduleCard /></Link>
                <Link to="schedule/22"><ScheduleCard /></Link>
                <Link to="schedule/23"><ScheduleCard /></Link>
                <Link to="schedule/24"><ScheduleCard /></Link>
                <Link to="schedule/25"><ScheduleCard /></Link>
                <Link to="schedule/26"><ScheduleCard /></Link>
                <Link to="schedule/27"><ScheduleCard /></Link>
                <Link to="schedule/28"><ScheduleCard /></Link>
                <Link to="schedule/29"><ScheduleCard /></Link>
                <Link to="schedule/30"><ScheduleCard /></Link>
                <Link to="schedule/31"><ScheduleCard /></Link>
            </div>
        </div>
    );
}

export default Schedule;