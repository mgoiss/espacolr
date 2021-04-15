import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleResponse } from 'core/types/Schedule';
import { makeRequest } from 'core/utils/request';
import ScheduleCard from './components/scheduleCard';
import ScheduleCardLoader from './components/Loaders/ScheduleCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';

const Schedule = () => {

  const [scheduleResponse, setScheduleResponse] = useState<ScheduleResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  //Função que cnseque acessar o ciclo de vida do componente
  //Ele tem no primeiro parametro uma function e depois as dependencias
  //caso as dependencia esteja vazia será executado sempre que o componente
  //for executado
  useEffect(() => {

    //Passando parametros
    const params = {
      page: activePage,
      linesPerPage: 31
    }

    //Iniciando o Loading
    setIsLoading(true)
    makeRequest({ url: '/scheduleds', params })
      .then(response => setScheduleResponse(response.data))
      .finally(() => {
        //Finalizando o Loading
        setIsLoading(false);
      });
  }, [activePage]);

  return (
    <div>
      <div className="schedule-filter border-radius-10 card-base">
        <h3>Filtros</h3>
      </div>
      <div className="schedule-box">
        {isLoading ? /*se true*/ <ScheduleCardLoader /> : /*se false*/ (
          scheduleResponse?.content.map(Schedule => (
            <Link to={`/admin/schedule/${Schedule.id}`} key={Schedule.id}>
              <ScheduleCard schedule={Schedule} />
            </Link>
          ))
        )}
      </div>
      {scheduleResponse && (
        scheduleResponse.totalPages > 1 && (
          <Pagination
            totalPages={scheduleResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        )
      )}
    </div>
  );
}

export default Schedule;