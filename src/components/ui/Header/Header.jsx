import React from 'react';
import tuya_image from "../../../assets/tuya_image.png";
import {Link} from "react-router-dom";
import HeaderThemeSwitcher from "./HeaderThemeSwitcher";
import HeaderUserBlock from "./HeaderUserBlock";

const Header = ({userdata}) => {
    /*
    <div className="container">
        <header
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/"
               className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="bi me-2" height="32" alt="tuya" src={tuya_image}/>
                <span className="fs-4">Home Online</span>
            </a>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                <li><a href="/devices/" className="nav-link px-2 link-dark">Devices</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                    <div className="vr d-none d-lg-flex h-100 mx-lg-2"></div>
                    <hr className="d-lg-none my-2"/>
                </li>
                <li>
                    <HeaderThemeSwitcher />
                </li>
            </ul>

            <div className="col-md-3 text-end">
                <div className="btn-group">
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img
                            src="https://lh3.googleusercontent.com/a/ALm5wu1OwCQVggUhiQ3B16mTK-VbhZRS_bS5KwDamxw-=s96-c"
                            alt="mdo" className="rounded-circle" width="32" height="32"/>
                        <span className="navbar-text"> yser </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="/accounts/profile/">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="/accounts/logout/">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
    * */


    return (<nav
        className="container navbar navbar-expand-lg py-3 mb-4 border-bottom align-items-center justify-content-center justify-content-md-between"
        aria-label="Eleventh navbar example">
        <div className="container-fluid">
            <a href="/src/pages" className="navbar-brand text-decoration-none">
                <img className="bi me-2" height="32" alt="tuya" src={tuya_image}/><span
                className="fs-4">Home Online</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar_header"
                    aria-controls="navbar_header" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-lg-flex" id="navbar_header">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1 justify-content-lg-center">
                    <li><Link to="/devices" className="nav-link px-2">Устройства</Link></li>
                    <li><Link to="/faq" className="nav-link px-2">FAQ</Link></li>
                    <li><Link to="/about" className="nav-link px-2">О проекте</Link></li>
                    <li><Link to="/dev1" className="nav-link px-2">ComponentsDev</Link></li>
                    <li><Link to="/dev2" className="nav-link px-2">Extra</Link></li>
                    <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                        <div className="vr d-none d-lg-flex h-100 mx-lg-2"></div>
                        <hr className="d-lg-none my-2"/>
                    </li>
                    <li>
                        <HeaderThemeSwitcher/>
                    </li>
                </ul>


                <div className="justify-content-lg-end text-lg-end">
                    <HeaderUserBlock userdata={userdata}/>
                </div>
            </div>
        </div>
    </nav>);
};

export default Header;