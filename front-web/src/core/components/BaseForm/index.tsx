import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const BaseForm = ({ title, children }: Props) => {

    const history = useHistory();
    const handleCancel = () => {
        history.push('./');
    }

    return (
        <div className="base-form card-base border-radius-20">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button
                    type="button"
                    className="btn btn-outline-danger nr-3 button-pattern" onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button
                    className="btn btn-primary text-white button-green button-pattern"
                >
                    CADASTRAR
                </button>
            </div>
        </div>
    )
}

export default BaseForm;