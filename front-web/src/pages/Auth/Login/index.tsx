import ButtonIcon from 'core/components/Buttonicon';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormState = {
  username: string;
  password: string;
}

type locationState = {
  from: string;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormState>();
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const location = useLocation<locationState>();

  const { from } = location.state || { from: { pathname: "/admin" } };

  const onSubmit = (data: FormState) => {
    makeLogin(data)
      .then(response => {
        setHasError(false);
        saveSessionData(response.data);
        history.replace(from);
      })
      .catch(() => {
        setHasError(true);
      })
  }

  return (
    <AuthCard>
      {hasError && (
        <div className="alert alert-danger mt-5 mb-0">
          Usuário ou senha inválidos
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="margin-bottom-30">
          <input
            className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
            type="email"
            placeholder="Email"
            name="username"
            ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          )}
        </div>
        <div>
          <input
            className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
            type="password"
            placeholder="Senha"
            name="password"
            ref={register({ required: "Campo obrigatório" })}
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>

        <Link to="/auth/recover" className="login-link-recover">
          Esqueceu a senha?
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Logar" />
        </div>
      </form>
    </AuthCard>
  );
}

export default Login;