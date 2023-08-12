import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../../../context";


const HeaderUserBlock = () => {
    const {loginData, setLoginData} = useContext(UserContext);
    if (loginData && !loginData.picture) loginData.picture = require('./user_spacer.png');
    return (
        <div>

            {!loginData ? (
                <Link to="/signin" className="btn btn-outline-primary me-2" role="button">Sign in</Link>
            ) : (
                <div className="btn-group">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={loginData.picture} className="rounded-circle border" width="32" height="32"
                             alt={'user'}/>
                        <span className="navbar-text"> {loginData.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-sm-end">
                        <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#"
                               onClick={() => {
                                   setLoginData();
                                   localStorage.removeItem("token");
                               }}
                        >Sign out</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HeaderUserBlock;