import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from '../../assets/images/AtemporalLogo.svg';
import './styles.scss';

const Footer = () => (
    <div className="row footer-container justify-content-center align-items-center">
        <div className="col-2 footer-container-image">
            <LogoImage className="footer-logo" />
        </div>
        <div className="col-3 footer-container-item">
            <ul className="footer-manu">
                <li>
                    <Link to="/" className="footer-manu-text">
                        Contato
                        </Link>
                </li>
            </ul>
        </div>
        <div className="col-2 footer-container-copyright">
            <p>
                <span>© COPYRIGHT 2021 - ATEMPORAL SOLUTION<br /></span>
                    TODOS OS DIREITOS RESERVADOS.
            </p>
        </div>
    </div>
);

export default Footer;