import React from 'react';
import TwoButtons from '../TwoButtons';
import './styles.scss';

type Props = {
    title: string;
}

const BaseForm = ({ title }: Props) => {
    return(
        <div className="base-form card-base border-radius-20">
            <h1 className="base-form-title">
                {title}
            </h1>
            <div className="base-form-actions">
                <TwoButtons valueGreen="CADASTRAR" valueRed="CANCELAR"/>
            </div>
        </div>
    )
}

export default BaseForm;