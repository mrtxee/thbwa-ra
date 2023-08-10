import React from 'react';
import SigninModal from "./SigninModal";


const HeaderUserBlock = ({userdata, setUserdata, SigninModalID}) => {
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

            {!userdata ? (
                <a className="btn btn-outline-primary me-2" role="button" data-bs-toggle="modal" data-bs-target={"#"+SigninModalID}>Sign in</a>
            ) : (
                <div className="btn-group">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userdata.picture} className="rounded-circle border" width="32" height="32" alt={'user'}/>
                        <span className="navbar-text"> {userdata.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-sm-end">
                        <li><a className="dropdown-item" href="/user/profile/">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#"
                               onClick={() => {
                                   setUserdata();
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