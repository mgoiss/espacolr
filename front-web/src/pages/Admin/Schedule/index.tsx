import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Schedule, ScheduleResponse } from 'core/types/Schedule';
import { makeRequest } from 'core/utils/request';
import ScheduleCard from './components/scheduleCard';
import ScheduleCardLoader from './components/Loaders/ScheduleCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import ScheduleFilters from 'core/components/ScheduleFilters';
import dayjs from 'dayjs';

const ScheduleList = () => {

  const [scheduleResponse, setScheduleResponse] = useState<Schedule[]>();
  const [mountSelect, setMountSelect] = useState(dayjs().month() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  //Função que cnseque acessar o ciclo de vida do componente
  //Ele tem no primeiro parametro uma function e depois as dependencias
  //caso as dependencia esteja vazia será executado sempre que o componente
  //for executado
  useEffect(() => {

    //Passando parametros
    const params = {
      month: 1,//dayjs().month() + 1,
      status: '',
      client: ''
    }

    // //Iniciando o Loading
    // setIsLoading(true)
    // makeRequest({ url: '/scheduleds', params })
    //   .then(response => setScheduleResponse(response.data))
    //   .finally(() => {
    //     //Finalizando o Loading
    //     setIsLoading(false);
    //   });
    setIsLoading(true)
    makeRequest({ url: `/scheduleds/filters`, params })
      .then(response => setScheduleResponse(response.data))
      .finally(() => {
        //Finalizando o Loading
        setIsLoading(false);
      });
  }, [activePage]);

  return (
    <div>
      <ScheduleFilters />
      <div className="schedule-box">
        {isLoading ? /*se true*/ <ScheduleCardLoader /> : /*se false*/ (
          scheduleResponse?.map(Schedule => (
            <Link to={`/admin/schedule/${Schedule.id}`} key={Schedule.id}>
              <ScheduleCard schedule={Schedule} />
            </Link>
          ))
        )}
      </div>
      {/* {scheduleResponse && (
        scheduleResponse.totalPages > 1 && (
          <Pagination
            totalPages={scheduleResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        )
      )} */}
    </div>
  );
}

export default ScheduleList;