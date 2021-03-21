import { User } from 'core/types/User';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

type Prop = {
    user: User;
    path: string
    onRemove: (userId: number) => void;
}

const CardList = ({ user, path, onRemove }: Prop) => {
    return (
        <div className="card-base border-radius-10 d-flex row card-list-container">
            <div className="col-4">
                <h3>{user.firstName} {user.lastName}</h3>
                {user.roles.map(roles => (
                    <span key={roles.id} className="badge badge-pill badge-secondary mr-2">{roles.authority}</span>
                ))}
            </div>
            <div className="col-8 text-right">
                <Link
                    to={`${path}${user.id}`}
                    className="btn btn-outline-secondary card-list-button"
                    type="button"
                >
                    EDITAR
                </Link>
                <button
                    className="btn btn-outline-danger ml-4 card-list-button"
                    type="button"
                    onClick={() => onRemove(user.id)}
                >
                    EXCLUIR
                </button>
            </div>
        </div>
    );
}

export default CardList;