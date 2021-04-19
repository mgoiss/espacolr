import React from 'react';
import { ReactComponent as Search } from 'core/assets/images/iconSearch.svg';

type Props = {
  name?: string;
  handleChageName: (name: string) => void;
  clearFilters: () => void;
}

const NameFilters = ({ name, handleChageName, clearFilters }: Props) => {



  return (
    <div className="card-base border-radius-10 filters-container ml-4">
      <div className="input-search">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por Nome"
          onChange={event => handleChageName(event.target.value)}
          value={name}
        />
        <Search />
      </div>
      <button
        className="btn btn-outline-secondary border-radius-10 card-list-button"
        onClick={clearFilters}
      >
        LIMPAR FILTRO
      </button>
    </div>
  );
}

export default NameFilters;