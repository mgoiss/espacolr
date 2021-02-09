import React from 'react';
import './styles.scss';
import {ReactComponent as Logo} from 'core/assets/images/logoNome.svg';
import { type } from 'os';

type Props = {
    children: React.ReactNode;
}

const AuthCard = ({ children}: Props) => {
    return(
        <div className="card-base bg-primary auth-card border-radius-20">
            <Logo className="auth-card-image"/>
            {children}
        </div>
    );
}

export default AuthCard;