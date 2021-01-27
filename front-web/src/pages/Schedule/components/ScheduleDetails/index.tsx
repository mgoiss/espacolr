import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import Price from '../../../../core/components/Price';
import './styles.scss';

const ScheduleDetails = () => {

    return (
        <div className="schedule-details-container">
            <div className="card-base border-radius-20 schedule-details">
                <div className="row schedule-details-up">
                    <Link to="/" className="col-2 schedule-details-goback">
                        <ArrowIcon className="icon-goback"/>
                        <h1 className="text-goback">VOLTAR</h1>
                    </Link>

                    <div className=" col-10 schedule-details-btn">
                        <button type="button" className="btn btn-outline-danger">CANCELAR</button>
                        <input className="btn btn-primary" type="button" value="CONCLUIR" />
                    </div>                    
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <div className="schedule-details-card">
                            <h2 className="h2">José Manoel</h2>
                            <h3 className="h3">Telefone: (75) 99999-9999  </h3>
                        </div>
                        <div className="schedule-details-card">
                            <h3 className="h3">Data Aluguel</h3>
                            <h1 className="h1">20/12/2020</h1>
                        </div>
                    </div>
                    <div className="col-6 ">
                        <div className="schedule-details-card">
                            <h2 className="h2">Pagamento:</h2>
                            <div className="d-flex">
                                <div>
                                    <h3 className="h3">Pagamento Inicial</h3>
                                    <Price price="250,00"/>
                                </div>

                                <div className="schedule-details-card-value-total">
                                    <h3 className="h3">Valor Total</h3>
                                    <Price  price="250,00"/>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ScheduleDetails;