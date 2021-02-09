import ButtonIcon from 'core/components/Buttonicon';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.push("/admin/schedule")
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
                <input
                    className="form-control input-base-green margin-bottom-30"
                    type="email"
                    placeholder="Email"
                    name="username"
                    ref={register({ required: true })}
                />
                <input
                    className="form-control input-base-green"
                    type="password"
                    placeholder="Senha"
                    name="password"
                    ref={register({ required: true })}
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueceu a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="Logar"/>
                </div>
            </form>
        </AuthCard>
    );
}

export default Login;