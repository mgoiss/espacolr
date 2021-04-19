import React, { useState } from 'react';
import { ReactComponent as Search } from 'core/assets/images/iconSearch.svg';
import './styles.scss';
import Select from 'react-select';
import dayjs from 'dayjs';

const options = [
  { value: 'Concluido', label: 'Concluidos' },
  { value: 'Aguardando', label: 'Aguardando' },
  { value: 'Cancelado', label: 'Cancelados' }
]

const optionsMonth = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

type optionsSelect = {
  value?: string | number,
  label?: string
}

export type FilterForm = {
  month?: number,
  status?: string,
  client?: string
}

type Props = {
  onSearch: (filter: FilterForm) => void;
}

const ScheduleFilters = ({ onSearch }: Props) => {
  const [client, setClient] = useState('');
  const [status, setStatus] = useState<optionsSelect>();
  const [month, setMonth] = useState<optionsSelect>({ value: dayjs().month() + 1, label: 'Filtrar por Mês' })

  const handleChangeName = (client: string) => {
    setClient(client);
    onSearch({ month: month.value as number, client, status: status?.value as string })
  }
  const handleChangeStatus = (status: optionsSelect) => {
    setStatus(status);
    onSearch({ month: month.value as number, client, status: status?.value as string })
  }
  const handleChangeMonth = (month: optionsSelect) => {
    setMonth(month);
    onSearch({ month: month.value as number, client, status: status?.value as string })
  }

  const clearFilters = () => {
    setClient('')
    setMonth({ value: dayjs().month() + 1, label: 'Filtrar por Mês' });
    setStatus(undefined)

    onSearch({ month: dayjs().month() + 1, client: '', status: '' })
  }

  return (
    <div className="card-base border-radius-10 filters-container">
      <div className="input-search">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por Cliente"
          onChange={event => handleChangeName(event.target.value)}
          value={client}
        />
        <Search />
      </div>
      <Select
        options={options}
        key={`select-${status?.value}`}
        value={status}
        classNamePrefix="filter-select"
        className="filter-select-container"
        placeholder="Filtrar por Execução"
        inputId="status"
        onChange={value => handleChangeStatus(value as optionsSelect)}
        isClearable
      />
      <Select
        options={optionsMonth}
        key={`select-${month.value}`}
        value={month}
        classNamePrefix="filter-select"
        className="filter-select-container"
        placeholder="Filtrar por Mês"
        inputId="month"
        onChange={value => handleChangeMonth(value as optionsSelect)}
      />
      <button className="btn btn-outline-secondary border-radius-10 card-list-button" onClick={clearFilters}>
        LIMPAR FILTRO
      </button>
    </div>
  )
}

export default ScheduleFilters;