import React, { useState } from 'react';
import { ReactComponent as Search } from 'core/assets/images/iconSearch.svg';
import './styles.scss';
import Select from 'react-select';

const options = [
  { value: 'Concluido', label: 'Concluidos' },
  { value: 'Aguardando', label: 'Aguardando' },
  { value: 'Cancelado', label: 'Cancelados' }
]

const optionsMonth = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

const ScheduleFilters = () => {
  const [name, setname] = useState('');

  const handleChangeName = (name: string) => {
    setname(name);

    
  }
  return (
    <div className="card-base border-radius-10 schedule-filters-container">
      <div className="input-search">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por Cliente"
          onChange={event => handleChangeName(event.target.value)}
          value={name}
        />
        <Search />
      </div>
      <Select
        options={options}
        classNamePrefix="filter-select"
        className="filter-select-container"
        placeholder="Filtrar por Execução"
        inputId="status"
      />
      <Select
        options={optionsMonth}
        classNamePrefix="filter-select"
        className="filter-select-container"
        placeholder="Filtrar por Mês"
        inputId="monh"
      />
      <button className="btn btn-outline-secondary border-radius-10 card-list-button">
        LIMPAR FILTRO
      </button>
    </div>
  )
}

export default ScheduleFilters;