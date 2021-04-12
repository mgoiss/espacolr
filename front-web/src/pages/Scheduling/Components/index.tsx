import Pagination from 'core/components/Pagination';
import { ClientResponse } from 'core/types/Client';
import { makeRequest } from 'core/utils/request';
import CardClientList from 'pages/Admin/Components/CardClientList';
import CardListLoader from 'pages/Admin/Components/Loaders/CardListLoader';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import './styles.scss';

type Props = {
  showModal: boolean
}

Modal.setAppElement('#root')

const ModalSearch = ({ showModal = false }: Props) => {

  const [show, setShow] = useState(showModal);

  const [clientResponse, setClientResponse] = useState<ClientResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
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

  // Funções para exibir e fechar o modal
  const openModal = () => {
    setShow(true)
    setIsRegister(false)
  };
  const closeModal = () => setShow(false);
  const registerClient = () => setIsRegister(true);

  return (
    <div>
      <button type="button" className="btn btn-primary text-white button-base mt-4" onClick={openModal}>PESQUISAR</button>
      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Example Modal"
      >
        <header>
          <h2> Cliente </h2>
          <button className="btn-header-close" onClick={closeModal} />
        </header>
        <section className="body-modal">
          <div>
            <button type="button" className="btn btn-primary text-white button-base mt-4" onClick={registerClient}>ADICIONAR</button>
          </div>
          <div className="mt-5">
            {isRegister ? (
              <div className="d-flex">
                <input name="name" type="text" className={`form-control input-base mr-4`} placeholder="Nome" />
                <input name="phone" type="text" className={`form-control input-base input-phone`} placeholder="Telefone" />
              </div>
            ) : isLoading ? <CardListLoader /> : (
              clientResponse?.content.map(client => (
                <div className="client-item" key={client.id}>
                  <CardClientList client={client} />
                </div>
              ))
            )}
          </div>
        </section>
        <footer className={`footer-modal ${isRegister ? 'd-flex flex-row-reverse' : ''}`}>
          {isRegister ? (
            <button type="button" className="btn btn-primary text-white button-base mt-4">SALVAR</button>
          ) : clientResponse && (
            clientResponse.totalPages > 1 && (
              <Pagination
                totalPages={clientResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
              />
            )
          )}
        </footer>
      </Modal>
    </div>
  )
}

export default ModalSearch
