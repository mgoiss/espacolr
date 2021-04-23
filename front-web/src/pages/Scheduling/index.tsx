import AuthCard from 'pages/Auth/Card';
import './styles.scss'
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import dayjs from 'dayjs';
import { makePrivateRequest } from 'core/utils/request';
import ModalSearch from './ModalSelectClient';
import { Client } from 'core/types/Client';
import { toast } from 'react-toastify';

type FormState = {
  mount: number;
  date: number;
  price: number;
  valuePaid: number;
  status: "Aguardando",
  client: {
    id: number,
    name: string;
  }
}

type FormDay = {
  freeDay: number,
  freeTime: string
}

const Scheduling = () => {

  const { register, handleSubmit, errors, setError, clearErrors, setValue } = useForm<FormState>();
  const [mountSelect, setMountSelect] = useState(dayjs().month() + 1);
  const [daySelect, setDaySelect] = useState('');
  const [isDaySelect, setIsDaySelect] = useState(false);
  const [listDaySelect, setListDaySelect] = useState<FormDay[]>([]);
  const history = useHistory();

  const [client, setClient] = useState<Client>();

  //Metodo para pegar os dados do Cliente e passar para o Formulario
  useEffect(() => {
    setValue('client.id', client?.id);
    setValue('client.name', client?.name);
  }, [client, setValue])

  const handleCancel = () => {
    history.push('./');
  }

  //Metodo para listar e carregar o dias disponiveias para agendamento
  const DayList = useCallback(() => {
    setIsDaySelect(true)
    makePrivateRequest({ url: `/scheduleds/date/${dayjs().year()}&${mountSelect}` })
      .then(response => setListDaySelect(response.data))
      .finally(() => { setIsDaySelect(false) })
  }, [mountSelect])

  //Metodo de Cadastro
  const onSubmit = (data: FormState) => {
    makePrivateRequest({ url: '/scheduleds', method: 'POST', data })
      .then(() => {
        toast.success('Agendamento realizado com sucesso!', {
          style: { background: '#81c41d' },
          position: 'bottom-right'
        })
      })
      .catch(() => {
        toast.error('Erro ao agendar!')
      })
      .finally(() => {
        DayList();
        setValue('client.id', '');
        setValue('client.name', '');
        setValue('price', '');
        setValue('valuePaid', '');
      })
  }

  //Use Effect do campo mount
  useEffect(() => {
    setListDaySelect([]); //Limpando a lista de datas
    setIsDaySelect(true)
    if (mountSelect < (dayjs().month() + 1)) { //Verificando se o mês selecionado é menor que o atual
      //Criando o erro caso o mês seja menor que o atual
      setError("mount", {
        type: "manual",
        message: "O mês menor que o atual"
      });
    } else {
      clearErrors('mount') //Apagando os erros do campo mês
      DayList();
    }
  }, [mountSelect, clearErrors, setError, DayList])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthCard>

        {/*Status*/}
        <input name="status" type="text" defaultValue="Aguardando" ref={register} className="d-none" />
        {/* Selecte MES e Dia */}
        <div className="d-flex justify-content-between mt-3">
          <div>
            <select
              className={`custom-select input-base select-base mt-4 ${errors.mount ? 'is-invalid' : ''}`}
              name="mount"
              value={mountSelect}
              onChange={e => setMountSelect(Number(e.target.value))}
              ref={register({
                required: "Campo obrigatório",
              })}
            >
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
            {errors.mount && (
              <div className="invalid-feedback d-block text-left">
                {errors.mount.message}
              </div>
            )}
          </div>
          <div>
            <select
              className={`form-control input-base select-base mt-4 ${errors.date ? 'is-invalid' : ''}`}
              name="date"
              value={daySelect}
              disabled={isDaySelect}
              onChange={e => setDaySelect(e.target.value)}
              ref={register({
                required: "Campo obrigatório",
              })}
            >
              {listDaySelect.map(day => (
                <option key={day.freeDay} value={day.freeTime}>{day.freeDay}</option>
              ))}
            </select>
            {errors.date && (
              <div className="invalid-feedback d-block text-left">
                {errors.date.message}
              </div>
            )}
          </div>
        </div>

        <div className="contente-client card-base border-radius-20">
          <h2>Cliente</h2>
          <div className="d-flex justify-content-between">
            <input
              name="client.id"
              type="text"
              //value={client?.id}
              readOnly
              className={`form-control input-base input-id mt-4 ${errors.client?.id || errors.client?.name ? 'is-invalid' : ''}`}
              placeholder="Id"
              ref={register({
                required: "Um cliente de ser informado, por favor pesquise",
              })}
            />
            <input
              name="client.name"
              type="text"
              //value={client?.name}
              readOnly
              className={`form-control input-base input-name mt-4 ${errors.client?.id || errors.client?.name ? 'is-invalid' : ''}`}
              placeholder="Nome"
              ref={register({
                required: "Um cliente de ser informado, por favor pesquise",
              })}
            />
          </div>
          {errors.client?.id ? (
            <div className="invalid-feedback d-block text-left">
              {errors.client?.id?.message}
            </div>
          ) : errors.client?.name && (
            <div className="invalid-feedback d-block text-left">
              {errors.client?.name?.message}
            </div>
          )}
          <div className="text-right">
            <ModalSearch clientStateCallback={setClient} />
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <div className="mr-4 w-50">
            <input
              name="price"
              type="text"
              className={`form-control input-base ${errors.price ? 'is-invalid' : ''}`}
              placeholder="Valor Total"
              ref={register({
                required: "Campo Obrigatório",
              })}
            />
            {errors.price && (
              <div className="invalid-feedback d-block  text-left">
                {errors.price.message}
              </div>
            )}
          </div>
          <div className="w-50">
            <input
              name="valuePaid"
              type="text"
              className={`form-control input-base input-phone ${errors.valuePaid ? 'is-invalid' : ''}`}
              placeholder="Valor Pago"
              ref={register({
                required: 'Campo Obrigatório',
              })}
            />
            {errors.valuePaid && (
              <div className="invalid-feedback d-block text-left">
                {errors.valuePaid.message}
              </div>
            )}
          </div>
        </div>

        {/* BOTÃO AGENDAR E CANCELAR */}
        <div className="button-container-schedule">
          <button type="button" className="btn btn-outline-danger button-base" onClick={handleCancel}>CANCELAR</button>
          <button className="btn btn-light btn-conclui button-base">AGENDAR</button>
        </div>
      </AuthCard >
    </form >
  );
}

export default Scheduling;