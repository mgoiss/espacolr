import React from 'react';
import { ReactComponent as LogoImage } from '../../assets/images/AtemporalLogo.svg';
import './styles.scss';

const Footer = () => (
    <div className="row footer-container justify-content-center align-items-center">
        <div className="container-info">
            <div className=" footer-container-image">
                <LogoImage className="footer-logo" />
            </div>
            <div className=" footer-container-copyright">
                <p>
                    <span>© COPYRIGHT 2021 - ATEMPORAL SOLUTION<br /></span>
                        TODOS OS DIREITOS RESERVADOS.
                </p>
            </div>
        </div>
    </div>
);

export default Footer;