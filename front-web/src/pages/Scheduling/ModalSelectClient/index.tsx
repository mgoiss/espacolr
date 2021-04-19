import NameFilters from 'core/components/NameFilters';
import Pagination from 'core/components/Pagination';
import { Client, ClientResponse } from 'core/types/Client';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import CardClientList from 'pages/Admin/Components/CardClientList';
import CardListLoader from 'pages/Admin/Components/Loaders/CardListLoader';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import './styles.scss';

type Props = {
  clientStateCallback: (item: Client) => void;
}

type FormClient = {
  name: string;
  phone: string;
}

Modal.setAppElement('#root')

const ModalSearch = ({ clientStateCallback }: Props) => {

  const { register, handleSubmit, errors } = useForm<FormClient>();

  const [show, setShow] = useState(false);

  const [clientResponse, setClientResponse] = useState<ClientResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState('');

  //Metodo para retornar o valor selecionado na lista de clientes
  const handleState = (client: Client) => {
    clientStateCallback(client);
    closeModal();
  }
  //metodo de listagem dos clientes
  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 5,
      direction: 'DESC',
      ordeBy: 'id',
      name: name
    }

    setIsLoading(true);
    makeRequest({ url: '/clients', params })
      .then(response => setClientResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, show, name]);
  //Cadastrar Cliente
  const onsubmitModal = (data: FormClient) => {
    console.log(data);
    makePrivateRequest({
      url: '/clients',
      method: 'POST',
      data
    })
      .then(respose => { handleState(respose.data) })
  }

  const handleChageName = (name: string) => {
    setActivePage(0);
    setName(name);
  }

  const clearFilters = () => {
    setActivePage(0);
    setName('');
  }

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
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary text-white button-base" onClick={registerClient}>ADICIONAR</button>
            <NameFilters
              name={name}
              handleChageName={handleChageName}
              clearFilters={clearFilters}
            />
          </div>
          <div className="mt-5">
            {isRegister ? (
              <form onSubmit={handleSubmit(onsubmitModal)}>
                <div className="d-flex">
                  <div className="mr-4 w-75">
                    <input
                      name="name"
                      type="text"
                      className={`form-control input-base ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Nome"
                      ref={register({
                        required: "Campo Obrigatório",
                        minLength: { value: 3, message: 'O campo deve ter no mínimo 3 caracteres' },
                        maxLength: { value: 50, message: 'O campo deve ter no maximo 30 caracteres' }
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="w-50">
                    <input
                      name="phone"
                      type="text"
                      className={`form-control input-base input-phone ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Telefone"
                      ref={register({
                        required: 'Campo Obrigatório',
                        minLength: { value: 11, message: 'O campo deve ter no mínimo 11 caracteres' },
                        maxLength: { value: 11, message: 'O campo deve ter no maximo 11 caracteres' }
                      })}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback d-block">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-row-reverse">
                  <button className="btn btn-primary text-white button-base mt-4">SALVAR</button>
                </div>
              </form>
            ) : isLoading ? <CardListLoader /> : (
              clientResponse?.content.map(client => (
                <div className="client-item" key={client.id} onClick={() => handleState(client)}>
                  <CardClientList client={client} />
                </div>
              ))
            )}
          </div>
        </section>
        <footer className={`footer-modal ${isRegister ? 'd-flex flex-row-reverse' : ''}`}>
          {isRegister === false && (
            clientResponse && (
              clientResponse.totalPages > 1 && (
                <Pagination
                  totalPages={clientResponse.totalPages}
                  activePage={activePage}
                  onChange={page => setActivePage(page)}
                />
              )
            )
          )}
        </footer>
      </Modal>
    </div>
  )
}

export default ModalSearch
