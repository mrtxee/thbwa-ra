import React from 'react';

const Footer = () => {
    return (
        <div className="container d-flex">
            <div className="flex-grow-1">
                <span className="text-muted">© 2023 Tuya Home Online, Inc</span>
            </div>
            <div className="flex-grow-1">
                <sub className="text-muted ">v.1.3</sub>
            </div>
            <div className="flex-shrink-0 text-end">
                <a className="text-decoration-none" href="https://t.me/mrtxee"><i
                    className="bi bi-telegram fs-3"></i></a>
            </div>
        </div>);
};

export default Footer;