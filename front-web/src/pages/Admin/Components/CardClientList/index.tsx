import { Client } from 'core/types/Client';
import React from 'react';
import './styles.scss';

type Prop = {
  client: Client;
}

const CardClientList = ({ client }: Prop) => {
  return (
    <div className="card-base border-radius-10 d-flex row card-client-list-container">
      <div className="col-6">
        <h3>{client.name}</h3>
      </div>
      <div className="col-6 text-right">
        <h3>{client.phone}</h3>
      </div>
    </div>
  );
}

export default CardClientList;