import AuthCard from 'pages/Auth/Card';
import './styles.scss'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import dayjs from 'dayjs';
import { makePrivateRequest } from 'core/utils/request';
import ModalSearch from './Components';
import { Client } from 'core/types/Client';

type FormState = {
  id: number;
  name: string;
  mount: number;
  day: number;
}

type FormDay = {
  freeDay: number,
  freeTime: string
}

const Scheduling = () => {

  const { register, handleSubmit, errors, setError, clearErrors, getValues } = useForm<FormState>();
  const [mountSelect, setMountSelect] = useState(dayjs().month() + 1);
  const [daySelect, setDaySelect] = useState('');
  const [listDaySelect, setListDaySelect] = useState<FormDay[]>([]);
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    history.push('./');
  }

  //Metodo de Cadastro
  const onSubmit = (data: FormState) => {
    console.log(data)
    console.log(getValues("mount"))
    console.log(dayjs().month())
  }

  //Use Effect do campo mount
  useEffect(() => {
    if (mountSelect < (dayjs().month() + 1)) { //Verificando se o mês selecionado é menor que o atual
      //Criando o erro caso o mês seja menor que o atual
      setError("mount", {
        type: "manual",
        message: "O mês menor que o atual"
      });
      setListDaySelect([]); //Limpando a lista de datas
    } else {
      clearErrors('mount') //Apagando os erros do campo mês
      makePrivateRequest({ url: `/scheduleds/date/${dayjs().year()}&${mountSelect}` })
        .then(response => setListDaySelect(response.data))
    }
  }, [mountSelect, clearErrors, setError])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthCard>
        {/* Selecte MES e Dia */}
        <div className="d-flex justify-content-between mt-5">
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
              className={`form-control input-base select-base mt-4 ${errors.day ? 'is-invalid' : ''}`}
              name="day"
              value={daySelect}
              onChange={e => setDaySelect(e.target.value)}
              ref={register({
                required: "Campo obrigatório",
              })}
            >
              {listDaySelect.map(day => (
                <option key={day.freeDay} value={day.freeTime}>{day.freeDay}</option>
              ))}
            </select>
            {errors.day && (
              <div className="invalid-feedback d-block text-left">
                {errors.day.message}
              </div>
            )}
          </div>
        </div>
        <div className="contente-client card-base border-radius-20">
          <h2>Cliente</h2>
          <div className="d-flex justify-content-between">
            <input
              name="id"
              type="text"
              disabled
              className={`form-control input-base input-id mt-4 ${errors.id ? 'is-invalid' : ''}`}
              placeholder="Id"
              ref={register({
                required: "Um cliente de ser informado, por favor pesquise",
              })}
            />
            <input
              name="name"
              type="text"
              disabled
              className={`form-control input-base input-name mt-4 ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Nome"
              ref={register({
                required: "Um cliente de ser informado, por favor pesquise",
              })}
            />
          </div>
          {errors.id ? (
            <div className="invalid-feedback d-block text-left">
              {errors.id.message}
            </div>
          ) : errors.name && (
            <div className="invalid-feedback d-block text-left">
              {errors.name.message}
            </div>
          )}
          <div className="text-right">
            <ModalSearch showModal={showModal} />
          </div>

          <div className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                ...
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO AGENDAR E CANCELAR */}
        <div className="button-container-schedule">
          <button type="button" className="btn btn-outline-danger button-base" onClick={handleCancel}>CANCELAR</button>
          <button className="btn btn-light btn-conclui button-base">AGENDAR</button>
        </div>
      </AuthCard>
    </form >
  );
}

export default Scheduling;