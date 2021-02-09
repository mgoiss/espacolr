import React from 'react';
import { useHistory } from 'react-router-dom';

const List = () => {

    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/user/create');
    }

    return (
        <div className="user-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
        </div>
    )
}

export default List;