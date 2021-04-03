import AuthCard from 'pages/Auth/Card';
import './styles.scss'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import dayjs from 'dayjs';
import { makePrivateRequest } from 'core/utils/request';

// const options = [
//   { value: 1, label: 'Janeiro' },
//   { value: 2, label: 'Fevereiro' },
//   { value: 3, label: 'Março' },
//   { value: 4, label: 'Abril' },
//   { value: 5, label: 'Maio' },
//   { value: 6, label: 'Junho' },
//   { value: 7, label: 'Julho' },
//   { value: 8, label: 'Agosto' },
//   { value: 9, label: 'Setembro' },
//   { value: 10, label: 'Outubro' },
//   { value: 11, label: 'Novembro' },
//   { value: 12, label: 'Dezembro' }
// ]

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
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
        <input
          name="firstName"
          type="text"
          className={`form-control input-base mt-4 ${errors.firstName ? 'is-invalid' : ''}`}
          placeholder="Nome"
          ref={register({
            required: "Campo obrigatório",
            minLength: { value: 3, message: 'O campo deve ter no mínimo 3 caracteres' },
            maxLength: { value: 25, message: 'O campo deve ter no maximo 25 caracteres' }
          })}
        />
        {errors.firstName && (
          <div className="invalid-feedback d-block text-left">
            {errors.firstName.message}
          </div>
        )}
        <input
          name="lastName"
          type="text"
          className={`form-control input-base mt-4 ${errors.lastName ? 'is-invalid' : ''}`}
          placeholder="Sobrenome"
          ref={register({
            required: "Campo obrigatório",
            minLength: { value: 3, message: 'O campo deve ter no mínimo 3 caracteres' },
            maxLength: { value: 25, message: 'O campo deve ter no maximo 25 caracteres' }
          })}
        />
        {errors.lastName && (
          <div className="invalid-feedback d-block text-left">
            {errors.lastName.message}
          </div>
        )}
        <input
          name="phone"
          type="text"
          className={`form-control input-base mt-4 ${errors.phone ? 'is-invalid' : ''}`}
          placeholder="Telefone"
          ref={register({
            required: "Campo obrigatório",
            minLength: { value: 11, message: 'O campo deve ter no mínimo 11 caracteres' },
            maxLength: { value: 12, message: 'O campo deve ter no maximo 12 caracteres' }
          })}
        />
        {errors.phone && (
          <div className="invalid-feedback d-block text-left">
            {errors.phone.message}
          </div>
        )}
        <div className="button-container-schedule">
          <button type="button" className="btn btn-outline-danger" onClick={handleCancel}>CANCELAR</button>
          <button className="btn btn-light btn-conclui">AGENDAR</button>
        </div>
      </AuthCard>
    </form >
  );
}

export default Scheduling;