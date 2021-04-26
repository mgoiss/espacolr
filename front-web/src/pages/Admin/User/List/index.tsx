import CardList from 'pages/Admin/Components/CardList';
import CardListLoader from 'pages/Admin/Components/Loaders/CardListLoader';
import Pagination from 'core/components/Pagination';
import { UserResponse } from 'core/types/User';
import { getSessionData } from 'core/utils/auth';
import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.scss';
import NameFilters from 'core/components/NameFilters';

const List = () => {
  document.title = "Espaço LR | Usuários";

  //PEGANDO O ID DO USUÁRIO ATUAL
  const [currentUser, setCurrentUser] = useState('');

  const [userResponse, setUserResponse] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  const [name, setName] = useState('');

  const getUsers = useCallback(() => {
    //Passando parametros
    const params = {
      page: activePage,
      linesPerPage: 5,
      direction: 'DESC',
      orderBy: 'id',
      firstName: name
    }

    //Pegando o Id do usuario no localStorage
    const currentUserData = getSessionData();
    setCurrentUser(currentUserData.UserId);

    //Iniciando o Loading
    setIsLoading(true)
    makePrivateRequest({ url: '/users', params })
      .then(response => setUserResponse(response.data))
      .finally(() => {
        //Finalizando o Loading
        setIsLoading(false);
      });
  }, [activePage, name])

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChageName = (name: string) => {
    setActivePage(0);
    setName(name);
  }

  const clearFilters = () => {
    setActivePage(0);
    setName('');
  }

  const handleCreate = () => {
    history.push('/admin/user/create');
  }

  const handleMyData = () => {
    history.push(`/admin/user/${currentUser}`);
  }

  const onRemove = (userId: number) => {
    const confirm = window.confirm('Deseja realmente excluir esse usuário?');
    if (confirm) {
      //Essa função vai ser chamada pela botão do componente cardList
      //ou seja o elemento filho tá chamando uma função do elemento Pai
      makePrivateRequest({ url: `/users/${userId}`, method: 'DELETE' })
        .then(() => {
          toast.success('Usuário removido com sucesso!', {
            style: { background: '#81c41d' },
            position: "bottom-right"
          });
          getUsers();
        })
        .catch(() => {
          toast.error('Erro ao remover o usuário!', {
            position: "bottom-right"
          });
        })
    }
  }

  return (
    <div className="user-list">
      <div className="d-flex justify-content-between">
        <div>
          <button className="btn btn-primary text-white btn-lg button-pattern" type="button" onClick={handleCreate}>
            ADICIONAR
        </button>
          <button className="btn btn-primary text-white btn-lg ml-4 button-pattern" type="button" onClick={handleMyData}>
            MEUS DADOS
        </button>
        </div>
        <NameFilters
          name={name}
          handleChageName={handleChageName}
          clearFilters={clearFilters}
        />
      </div>
      <div className="user-list-container">
        {isLoading ? /*se true*/ <CardListLoader /> : /*se false*/ (
          userResponse?.content.map(user => (
            <CardList
              user={user}
              key={user.id}
              path="/admin/user/"
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      { userResponse && (
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