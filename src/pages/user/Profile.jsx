import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../../context";
import {toast_error, toast_success} from "../../components/ui/ToastCt";
import PostServiceV2 from "../../api/PostServiceV2";

const Profile = () => {
    const {loginData, setLoginData} = useContext(UserContext);
    const [userSettingsData, setUserSettingsData] = useState({
        "access_id": "", "access_secret": "", "uid": "", "endpoint_url": ""
    });
    const [userData, setUserData] = useState({
        "username": "", "last_login": "", "date_joined": "", "email": "", "first_name": "", "last_name": ""
    });

    function updateUserSettingsHandleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        PostServiceV2.updateUserSettings((errMsg) => toast_error(errMsg), (res) => toast_success("updated"), Object.fromEntries(new FormData(form).entries()));
    }

    useEffect(() => {
        PostServiceV2.getUserSettings((errMessage) => toast_error(errMessage), (res) => setUserSettingsData(res));
        PostServiceV2.getUserData((errMessage) => toast_error(errMessage), (res) => setUserData(res))
    }, []);

    if (loginData && !loginData.picture) loginData.picture = require('./user_spacer.png');
    return (<div className="container pt-2">
        <div className="row justify-content-center g-4 row-cols-2 pb-5">
            <div className={"col-12 col-sm-9 col-md-6 col-lg-5 col-xl-5"}>
                <div className={"card shadow bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Profile
                    </div>
                    <div className="card-body">
                        <img src={loginData.picture} className="rounded mx-auto d-block mb-4 mt-3" height="96"
                             alt={loginData.username}/>
                        <div className="fs-4 text-center"> {loginData.name} </div>
                        <div>
                            <i className="bi bi-person-fill"></i> {loginData.username}
                        </div>
                        <div>
                            <i className="bi bi-envelope-fill"></i> {userData.email}
                        </div>
                        <div>
                            <i className="bi bi-calendar"></i> {userData.date_joined}
                        </div>
                        <div>
                            <i className="bi bi-calendar-check"></i> {userData.last_login}
                        </div>
                    </div>
                    <div className="card-footer pb-3">
                        <div>
                            <Link to="/user/profile/update" className="text-decoration-none">
                                <i className="bi bi-gear"></i> Update profile
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/changepass" className="text-decoration-none">
                                <i className="bi bi-lock"></i> Change password
                            </Link>
                        </div>
                        <div>
                            <button type="button" className="btn btn-link text-decoration-none p-0"
                                    onClick={() => {
                                        PostServiceV2.userLogoutEverywhere((errMessage) => toast_error(errMessage), (res) => {
                                            setLoginData();
                                            localStorage.removeItem('token');
                                        })
                                    }}>
                                <i className="bi bi-door-closed"></i> Sign out on all devices
                            </button>
                        </div>

                    </div>
                </div>
            </div>


            <div className={"col-12 col-sm-9 col-md-6 col-lg-6 col-xl-6"}>
                <div className={"card shadow bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Tuya access settings
                    </div>
                    <div className="card-body">
                        <div className="mb-2">
                                <span className={"float-center text-secondary fs-6"}>
                                    Tuya cloud platform access settings <Link to="/faq"><i
                                    className="bi bi-question-circle-fill"></i></Link>
                                </span>
                        </div>
                        <form className="form" onSubmit={updateUserSettingsHandleSubmit}>
                            <div className="mb-3">
                                <label className="form-label mb-0" htmlFor="id_access_id">Access id</label>
                                <input type="text" name="access_id" value={userSettingsData.access_id} maxLength="40"
                                       className="form-control" required id="id_access_id"
                                       onChange={e => {
                                           setUserSettingsData({...userSettingsData, access_id: e.target.value});
                                       }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label mb-0" htmlFor="id_access_secret">Access secret</label>
                                <input type="text" name="access_secret" value={userSettingsData.access_secret}
                                       maxLength="40" className="form-control" required id="id_access_secret"
                                       onChange={e => {
                                           setUserSettingsData({...userSettingsData, access_secret: e.target.value});
                                       }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label mb-0" htmlFor="id_uid">Uid</label>
                                <input type="text" name="uid" value={userSettingsData.uid} maxLength="40"
                                       className="form-control" required id="id_uid"
                                       onChange={e => {
                                           setUserSettingsData({...userSettingsData, uid: e.target.value});
                                       }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label mb-0" htmlFor="id_endpoint_url">Endpoint url</label>
                                <select name="endpoint_url" className="form-select" required id="id_endpoint_url"
                                        value={userSettingsData.endpoint_url}
                                        onChange={e => {
                                            setUserSettingsData({...userSettingsData, endpoint_url: e.target.value});
                                        }}
                                >
                                    <option value="">---------</option>
                                    <option value="openapi.tuyaus.com">America</option>
                                    <option value="openapi.tuyacn.com">China</option>
                                    <option value="openapi.tuyaeu.com">Europe</option>
                                    <option value="openapi.tuyain.com">India</option>
                                    <option value="openapi-ueaz.tuyaus.com">EasternAmerica</option>
                                    <option value="openapi-weaz.tuyaeu.com">WesternEurope</option>
                                </select>
                            </div>
                            <div className="mb-1 mt-3">
                                <button type="submit" className="w-100 btn btn-outline-primary">Save settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Profile;