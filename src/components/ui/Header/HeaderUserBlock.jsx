import React from 'react';


const HeaderUserBlock = ({userdata}) => {
    if (userdata) {
        console.log('HeaderUserBlock for ' + userdata.username);
        if(!userdata.picture){
            userdata.picture=require('./user_spacer.png');
        }

    } else {
        console.log('HeaderUserBlock NO_USER ');
    }
    return (
        <div>
            {userdata ? (
                <div className="btn-group">
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userdata.picture} className="rounded-circle border" width="32" height="32"/>
                        <span className="navbar-text"> {userdata.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-sm-end">
                        <li><a className="dropdown-item" href="/user/profile/">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="/accounts/logout/">Sign out</a></li>
                    </ul>
                </div>
            ) : (
                <a className="btn btn-outline-primary me-2" href="#" role="button">Sign in</a>
            )}
        </div>
    );
};

export default HeaderUserBlock;