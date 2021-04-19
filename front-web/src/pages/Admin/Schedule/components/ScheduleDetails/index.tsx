import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import Price from 'core/components/Price';
import { Schedule } from 'core/types/Schedule';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import ScheduleDetailsinfo from '../Loaders/ScheduleDetailsinfo';
import ScheduleDetailsPrice from '../Loaders/ScheduleDetailsPrice';
import './styles.scss';
import { toast } from 'react-toastify';

type ParamsType = {
  scheduleId: string;
}

const ScheduleDetails = () => {

  const { scheduleId } = useParams<ParamsType>();
  const [schedule, setSchedule] = useState<Schedule>();
  const [isLoader, setIsLoader] = useState(false);
  const history = useHistory();
  //status: "Cancelar"

  const concludeCancel = (status: string, message: string) => {
    makePrivateRequest({ url: `/scheduleds/${scheduleId}`, method: 'PUT', data: { ...schedule, status: `${status}`, valuePaid: `${status === "Concluido" ? schedule?.price : schedule?.valuePaid}` } })
      .then(() => {
        toast.success(`Agendamento ${status} com sucesso!`, {
          style: { background: '#81c41d' },
          position: 'bottom-right'
        })
        history.push('/admin/schedule');
      })
      .catch(() => {
        toast.error(`Erro ao ${message} o agendamento`)
      })
  }

  const handleCancel = () => {
    const confirm = window.confirm('Deseja realmente cancelar esse agendamento?');
    if (confirm) {
      //setSchedule({ ...schedule, status: "Cancelado" })
      concludeCancel("Cancelado", "cancelar");
    }
  }

  const handleOk = () => {
    const confirm = window.confirm('Ao concluir o agendamento automaticamente o sistema vai dar entrada no restante do pagamento, DESAJA CONFIRMA A CONCLUSÃO?');
    if (confirm) {
      concludeCancel("Concluido", "concluir");
    }
  }

  useEffect(() => {
    setIsLoader(true);
    makeRequest({ url: `/scheduleds/${scheduleId}` })
      .then(response => setSchedule(response.data))
      .finally(() => setIsLoader(false));
  }, [scheduleId])

  return (
    <div>
      <div className="card-base border-radius-20 schedule-details">
        <div className="row schedule-details-up">
          <Link to="/admin" className="schedule-details-goback">
            <ArrowIcon className="icon-goback" />
            <h1 className="text-goback">VOLTAR</h1>
          </Link>

          {!isLoader && (
            schedule?.status !== undefined && (
              schedule?.status !== "Concluido" && (
                schedule?.status !== "Cancelado" &&
                <div className="button-container">
                  <button type="button" className="btn btn-outline-danger" onClick={handleCancel}>CANCELAR</button>
                  <button className="btn btn-primary text-white button-green" onClick={handleOk} type="button">CONCLUIR</button>
                </div>
              )

            )
          )}

        </div>

        <div className="row">
          <div className="col-7">
            {isLoader ? <ScheduleDetailsinfo /> : (
              <>
                <div className="schedule-details-card">
                  <h2 className="h2">{schedule?.client.name}</h2>
                  <h3 className="h3">Telefone: {schedule?.client.phone}  </h3>
                </div>
                <div className="schedule-details-card">
                  <h3 className="h3">Data Aluguel</h3>
                  <h1 className="h1">{dayjs(schedule?.date).format('DD/MM/YYYY')}</h1>
                </div>
              </>
            )}
          </div>
          <div className="col-5 ">
            {isLoader ? <ScheduleDetailsPrice /> : (
              <>
                <div className="schedule-details-card">
                  <div className="d-flex">
                    <div>
                      <h3 className="h3">Pagamento Inicial</h3>
                      {schedule?.price && <Price price={schedule?.valuePaid} />}

                    </div>

                    <div className="schedule-details-card-value-total">
                      <h3 className="h3">Valor Total</h3>
                      {schedule?.price && <Price price={schedule?.price} />}
                    </div>
                  </div>
                </div>
                <div className="schedule-details-card ">
                  <div>
                    <h3 className="h3">Status</h3>
                    {schedule?.status === "Concluido" && <h1 className="text-primary">{schedule?.status}</h1>}
                    {schedule?.status === "Aguardando" && <h1 className="text-warning">{schedule?.status}</h1>}
                    {schedule?.status === "Cancelado" && <h1 className="text-danger">{schedule?.status}</h1>}

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ScheduleDetails;