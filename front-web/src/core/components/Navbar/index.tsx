import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as LogoImage } from '../../assets/images/logo.svg';
import { getAccessTokenDecoded, isAllowedByRole, logout } from 'core/utils/auth';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location])

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/admin/schedule">
                    <LogoImage className="main-image" />
                </Link>
            </div>
            <div className="col-6 p-0 row d-flex justify-content-center">
                <ul className="main-manu">
                    <li>
                        <NavLink className="nav-link" to="/admin/schedule" activeClassName="active">
                            AGENDAMENTO
                        </NavLink>
                    </li>
                    {isAllowedByRole(['ROLE_ADMIN']) && (
                        <li>
                            <NavLink className="nav-link" to="/admin/user" activeClassName="active">
                                USUÁRIOS
                        </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink className="nav-link" to="/admin/client" activeClassName="active">
                            CLIENTES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/scheduling" className="nav-link" activeClassName="active">
                            AGENDAR
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right main-manu-end ">
                {currentUser}
                <a
                    href="#logout"
                    className="nav-link active d-inline"
                    onClick={handleLogout}
                >
                    LOGOUT
                </a>
            </div>
        </nav>
    );
}

export default Navbar;