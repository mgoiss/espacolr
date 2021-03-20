import { User } from 'core/types/User';
import React from 'react';
import './style.scss';

type Prop = {
    user: User;
}

const CardList = ({ user }: Prop) => {
    return (
        <div className="card-base border-radius-10 d-flex row card-list-container">
            <div className="col-6">
                <h3>{user.firstName} {user.lastName}</h3>
                {user.roles.map(roles => (
                    <span className="badge badge-pill badge-secondary mr-2">{roles.authority}</span>
                ))}
            </div>
            <div className="col-6 text-right">
                <button className="btn btn-outline-secondary card-list-button" type="button">
                    EDITAR
                </button>
                <button className="btn btn-outline-danger ml-4 card-list-button" type="button">
                    EXCLUIR
                </button>
            </div>
        </div>
    )
}

export default CardList;