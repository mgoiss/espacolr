import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Schedule } from 'core/types/Schedule';
import { makeRequest } from 'core/utils/request';
import ScheduleCard from './components/scheduleCard';
import ScheduleCardLoader from './components/Loaders/ScheduleCardLoader';
import './styles.scss';
import ScheduleFilters, { FilterForm } from 'core/components/ScheduleFilters';

const ScheduleList = () => {

  const [scheduleResponse, setScheduleResponse] = useState<Schedule[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getSchedule = useCallback((filter?: FilterForm) => {
    //Passando parametros
    const params = {
      month: filter?.month,
      status: filter?.status,
      client: filter?.client
    }

    setIsLoading(true)
    makeRequest({ url: `/scheduleds/filters`, params })
      .then(response => setScheduleResponse(response.data))
      .finally(() => {
        //Finalizando o Loading
        setIsLoading(false);
      });
  }, [])

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  return (
    <div>
      <ScheduleFilters onSearch={filter => getSchedule(filter)} />
      <div className="schedule-box">
        {isLoading ? /*se true*/ <ScheduleCardLoader /> : /*se false*/ (
          scheduleResponse?.map(Schedule => (
            <Link to={`/admin/schedule/${Schedule.id}`} key={Schedule.id}>
              <ScheduleCard schedule={Schedule} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ScheduleList;