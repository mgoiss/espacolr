import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as LogoImage } from '../../assets/images/logo.svg';

const Navbar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <Link to="/">
                <LogoImage className="main-image" />
            </Link>
        </div>
        <div className="col-8 p-0 row d-flex justify-content-center">
            <ul className="main-manu">
                <li>
                    <NavLink to="/" activeClassName="active" exact>
                        AGENDAMENTO
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user" activeClassName="active">
                        USUÁRIOS
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/client" activeClassName="active">
                        CLIENTES
                    </NavLink>
                </li>
            </ul>
        </div>  
        <div className="col-2 main-manu-agenda">
            <NavLink to="/scheduling" className="col-2 main-manu-agenda" activeClassName="active">
                AGENDAR
            </NavLink>
        </div>      
    </nav>
);

export default Navbar;