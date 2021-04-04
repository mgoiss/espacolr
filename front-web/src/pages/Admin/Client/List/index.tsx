import CardListLoader from 'pages/Admin/Components/Loaders/CardListLoader';
import { ClientResponse } from 'core/types/Client';
import { makeRequest } from 'core/utils/request';
import CardClientList from 'pages/Admin/Components/CardClientList';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import Pagination from 'core/components/Pagination';

const ListClient = () => {
  const [clientResponse, setClientResponse] = useState<ClientResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 5,
      direction: 'DESC',
      ordeBy: 'id'
    }

    setIsLoading(true);
    makeRequest({ url: '/clients', params })
      .then(response => setClientResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage]);


  return (
    <div className="client-list">
      <div className="d-flex">
        <button className="btn btn-primary text-white btn-lg button-pattern" type="button" >
          ADICIONAR
        </button>
      </div>
      <div className="client-list-container">
        {isLoading ? <CardListLoader /> : (
          clientResponse?.content.map(client => (
            <CardClientList
              client={client}
              key={client.id}
            />
          ))
        )}
      </div>

      { clientResponse && (
        clientResponse.totalPages > 1 && (
          <Pagination
            totalPages={clientResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        )
      )}
    </div>
  );
}

export default ListClient;