import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../../../context";


const HeaderUserBlock = ({navbarLinkToggle}) => {
    const {loginData, setLoginData} = useContext(UserContext);
    if (loginData && !loginData.picture) loginData.picture = require('./user_spacer.png');
    return (
        <div>
            {!loginData ? (
                <Link to="/signin" className="btn btn-outline-primary me-2" role="button"
                      onClick={() => navbarLinkToggle()}>Sign in</Link>
            ) : (
                <div className="btn-group">
                    <Link to="/user/profile" type="button"
                          className="btn btn-link nav-link d-block text-decoration-none"
                          onClick={() => navbarLinkToggle()}>
                        <img src={loginData.picture} className="rounded-circle border" width="32" height="32"
                             alt={'user'}/>
                        <span className="navbar-text"> {loginData.name}</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HeaderUserBlock;