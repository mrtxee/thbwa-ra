import React, {useContext, useEffect, useState} from 'react';
import {toast_error, toast_success} from "../../components/ui/ToastCt";
import PostServiceV2 from "../../api/PostServiceV2";
import {UserContext} from "../../context";

const UpdateProfile = () => {
    const {getLoginDataByToken} = useContext(UserContext);
    const [userData, setUserData] = useState({
        "username": "",
        "last_login": "",
        "date_joined": "",
        "email": "",
        "first_name": "",
        "last_name": ""
    });

    function updateUserDataHandleSubmit(e) {
        e.preventDefault();
        PostServiceV2.updateUserData((errMsg) => toast_error(errMsg), (res) => {
            toast_success("updated");
            getLoginDataByToken()
        }, Object.fromEntries(new FormData(e.target).entries()));
    }

    useEffect(() => {
        PostServiceV2.getUserData((errMessage) => toast_error(errMessage), (res) => setUserData(res))
    }, []);

    return (<div className="container pt-2">
        <div className="row justify-content-center mb-4">
            <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                <div className="card-header text-center">
                    Update user profile
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={updateUserDataHandleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="f51" className="form-label mb-0">Username</label>
                            <input type="text" name="username" className="form-control" id="f51" required
                                   minLength="5" maxLength="128" value={userData.username}
                                   onChange={e => {
                                       setUserData({...userData, username: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="f55" className="form-label mb-0">Email</label>
                            <input type="email" name="email" className="form-control" id="f55" required
                                   value={userData.email}
                                   onChange={e => {
                                       setUserData({...userData, email: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="f53" className="form-label mb-0">First name</label>
                            <input type="text" name="first_name" className="form-control" id="f53" required
                                   minLength="3" maxLength="128" value={userData.first_name}
                                   onChange={e => {
                                       setUserData({...userData, first_name: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="f54" className="form-label mb-0">Last name</label>
                            <input type="text" name="last_name" className="form-control" id="f54" required
                                   minLength="3" maxLength="128" value={userData.last_name}
                                   onChange={e => {
                                       setUserData({...userData, last_name: e.target.value});
                                   }}
                            />
                        </div>
                        <div className="mb-1 mt-3">
                            <button type="submit" className="w-100 btn btn-outline-primary">Update user</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
};

export default UpdateProfile;