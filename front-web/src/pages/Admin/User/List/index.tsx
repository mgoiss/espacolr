import CardList from 'core/components/CardList';
import CardListLoader from 'core/components/CardList/Loaders/CardListLoader';
import Pagination from 'core/components/Pagination';
import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.scss';

const List = () => {

    const [userResponse, setUserResponse] = useState<UserResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    useEffect(() => {

        //Passando parametros
        const params = {
            page: activePage,
            linesPerPage: 5
        }

        //Iniciando o Loading
        setIsLoading(true)
        makePrivateRequest({ url: '/users', params })
            .then(response => setUserResponse(response.data))
            .finally(() => {
                //Finalizando o Loading
                setIsLoading(false);
            });
    }, [activePage]);


    const handleCreate = () => {
        history.push('/admin/user/create');
    }

    return (
        <div className="user-list">
            <div className="d-flex">
                <button className="btn btn-primary text-white btn-lg button-pattern" type="button" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <button className="btn btn-primary text-white btn-lg ml-4 button-pattern" type="button" onClick={handleCreate}>
                    MEUS DADOS
                </button>
            </div>
            <div className="user-list-container">
                {isLoading ? /*se true*/ <CardListLoader /> : /*se false*/ (
                    userResponse?.content.map(User => (
                        <CardList user={User} key={User.id} />
                    ))
                )}
            </div>

            {userResponse && (
                userResponse.totalPages > 1 && (
                    <Pagination
                        totalPages={userResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )
            )}
        </div>
    )
}

export default List;