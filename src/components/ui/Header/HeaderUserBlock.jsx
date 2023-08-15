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
                    <button type="button" className="btn btn-link d-block link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={loginData.picture} className="rounded-circle border" width="32" height="32"
                             alt={'user'}/>
                        <span className="navbar-text"> {loginData.name}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-sm-end">
                        <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><button type="button" className="btn btn-link dropdown-item" href="#"
                               onClick={() => {
                                   setLoginData();
                                   localStorage.removeItem("token");
                               }}
                        >Sign out</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HeaderUserBlock;