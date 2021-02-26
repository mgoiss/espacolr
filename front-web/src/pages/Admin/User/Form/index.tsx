import BaseForm from 'core/components/BaseForm';
import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Form = () => {

    const { register, handleSubmit, errors } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/users', method: 'POST', data })
    }

    return (
        <div className="container-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <BaseForm title="CADASTRO UM USUÁRIO">
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
                                    ref={register({ required: "Campo obrigatório" })}
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
                        </div>
                    </div>
                </BaseForm>
            </form>
        </div>
    )
}

export default Form;