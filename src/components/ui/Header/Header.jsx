import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import HeaderThemeSwitcher from "./HeaderThemeSwitcher";
import HeaderUserBlock from "./HeaderUserBlock";

const Header = () => {
    const navbarTogglerRef = useRef();
    function navbarLinkToggle(){
        if (navbarTogglerRef.current.offsetHeight>0) navbarTogglerRef.current.click();
    }
    return (<nav
        className="container navbar navbar-expand-lg py-3 mb-4 border-bottom align-items-center justify-content-center justify-content-md-between"
        aria-label="Eleventh navbar example">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand text-decoration-none">
                <img className="bi me-2" height="32" alt="tuya" src={require('./tuya_image.png')}/><span
                className="fs-4">Home Online</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar_header" aria-controls="navbar_header" aria-expanded="false"
                    aria-label="Toggle navigation" ref={navbarTogglerRef}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-lg-flex" id="navbar_header">
                <ul className="navbar-nav me-auto mb-lg-0 flex-grow-1 justify-content-lg-center">
                    <li><Link to="/devices" className="nav-link px-2" onClick={() => navbarLinkToggle()}>Устройства</Link></li>
                    <li><Link to="/about" className="nav-link px-2" onClick={() => navbarLinkToggle()}>О проекте</Link></li>
                    <li><Link to="/faq" className="nav-link px-2" onClick={() => navbarLinkToggle()}>FAQ</Link></li>
                </ul>
                <hr className="d-lg-none"/>
                <div className="d-flex flex-row">

                    <HeaderThemeSwitcher/>
                    <HeaderUserBlock navbarLinkToggle={navbarLinkToggle}/>
                </div>

            </div>

        </div>
    </nav>);
};

export default Header;