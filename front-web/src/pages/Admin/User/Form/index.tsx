import BaseForm from 'core/components/BaseForm';
import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.scss';
import { Role } from 'core/types/User';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
}

type ParamsType = {
  userId: string;
}

const options = [
  { id: '1', authority: 'ROLE_OPERATOR' },
  { id: '2', authority: 'ROLE_ADMIN' }
]

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { userId } = useParams<ParamsType>();
  const isEditing = userId !== 'create'

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/users/${userId}` })
        .then(response => {
          setValue('firstName', response.data.firstName);
          setValue('email', response.data.email);
          setValue('lastName', response.data.lastName);
          setValue('roles', response.data.roles);
        })
    }
  }, [userId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/users/${userId}` : '/users',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.success('Usuário cadastrado com sucesso!', {
          style: { background: '#81c41d' },
          position: "bottom-right"
        });
        history.push('/admin/user');
      })
      .catch(() => {
        toast.error('Error ao salvar usuário!')
      })
  }


  return (
    <div className="container-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseForm
          title={isEditing ? 'EDITAR USUÁRIO' : "CADASTRAR USUÁRIO"}
        >
          <div className="row">
            <div className="col-6">
              <div className="mb-4">
                <input
                  name="firstName"
                  type="text"
                  className={`form-control input-base ${errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Nome"
                  ref={register({
                    required: "Campo obrigatório",
                    minLength: { value: 3, message: 'O campo deve ter no mínimo 3 caracteres' },
                    maxLength: { value: 25, message: 'O campo deve ter no maximo 25 caracteres' }
                  })}
                />
                {errors.firstName && (
                  <div className="invalid-feedback d-block">
                    {errors.firstName.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  name="email"
                  type="email"
                  className={`form-control input-base ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  ref={register({
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  name="password"
                  type="password"
                  className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Digite aqui a Senha"
                  ref={register({
                    required: "Campo obrigatório",
                    minLength: { value: 6, message: 'O campo deve ter no mínimo 6 caracteres' },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password.message}
                  </div>
                )}
                <p className="form-text-info mt-2"> A sua senha deve ter pelo menos 8 caracteres e conter pelo menos um número</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-4">
                <input
                  name="lastName"
                  type="text"
                  className={`form-control input-base ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Sobrenome"
                  ref={register({
                    required: "Campo obrigatório",
                    minLength: { value: 3, message: 'O campo deve ter no mínimo 3 caracteres' },
                    maxLength: { value: 25, message: 'O campo deve ter no maximo 25 caracteres' }
                  })}
                />

                {errors.lastName && (
                  <div className="invalid-feedback d-block">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <Controller
                  name="roles"
                  rules={{ required: true }}
                  control={control}
                  as={Select}
                  classNamePrefix="roles-select"
                  options={options}
                  getOptionLabel={(option: Role) => option.authority}
                  getOptionValue={(option: Role) => option.id}
                  isMulti
                  placeholder="Tipo Usuário"
                />
                {errors.roles && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>
            </div>
          </div>
        </BaseForm>
      </form>
    </div>
  )
}

export default Form;