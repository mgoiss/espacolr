import ButtonIcon from 'core/components/Buttonicon';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {

    }

    return (
        <AuthCard>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control input-base-green margin-bottom-30"
                    type="email"
                    placeholder="Email"
                    name="email"
                    ref={register}
                />
                <input
                    className="form-control input-base-green"
                    type="password"
                    placeholder="Senha"
                    name="password"
                    ref={register}
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