import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleResponse } from '../../core/types/Schedule';
import { makeRequest } from '../../core/utils/request';
import ScheduleCard from './components/scheduleCard';
import './styles.scss';

const Schedule = () => {

    const [scheduleResponse, setScheduleResponse] = useState<ScheduleResponse>();

    //Função que cnseque acessar o ciclo de vida do componente
    //Ele tem no primeiro parametro uma function e depois as dependencias
    //caso as dependencia esteja vazia será executado sempre que o componente
    //for executado
    useEffect(() => {

        //Passando parametros
        const params = {
            page: 0,
            linesPerPage: 31
        }

        makeRequest({url: '/scheduleds', params})
            .then(response => setScheduleResponse(response.data));
    }, []);

    return( 
        <div className="schedule-container">
            <div className="schedule-filter border-radius-10 card-base">
                <h3>Filtros</h3>
            </div>            
            <div className="schedule-box">                
                {scheduleResponse?.content.map(Schedule => (
                    <Link to={`/schedule/${Schedule.id}`} key={Schedule.id}>
                        <ScheduleCard schedule={Schedule}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Schedule;