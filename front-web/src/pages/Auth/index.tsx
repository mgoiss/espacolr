import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg'
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Bem vindo!
            </h1>
            <p className="auth-info-subtitle">
                Informe as suas credenciais e acesse nosso <br/> sistema.
            </p>
            <AuthImage/>
        </div>
        <div className="auth-content">
            <Switch>
                <Redirect from="/admin/auth" to="/admin/auth/login" exact />
                <Route path="/admin/auth/login">
                    <Login />
                </Route>
                <Route path="/admin/auth/recover">
                    <h1>RECUPERAÇÃO</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Auth;