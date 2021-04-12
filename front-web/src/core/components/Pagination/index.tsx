import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';
import { genereteList } from 'core/utils/list';

type Props = {
  totalPages: number;
  activePage: number;
  onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
  const items = genereteList(totalPages);
  const previousClass = totalPages > 0 && activePage > 0 ? 'page-active' : 'page-inactive'
  const nextClass = (activePage + 1) < totalPages ? 'page-active' : 'page-inactive'


  return (
    <div className="Pagination-container">
      <ArrowIcon
        className={`pagination-previous ${previousClass}`}
        onClick={() => onChange(activePage - 1)}
      />
      {items.map(item => (
        <div
          key={item}
          className={`pagination-item ${item === activePage ? 'active' : ''}`}
          onClick={() => onChange(item)}
        >
          {item + 1}
        </div>
      ))}
      <ArrowIcon
        className={`pagination-next ${nextClass}`}
        onClick={() => onChange(activePage + 1)}
      />
    </div>
  );
}

export default Pagination;