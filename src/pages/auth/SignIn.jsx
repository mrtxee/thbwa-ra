import React, {useContext} from 'react';
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";
import PostServiceV2 from "../../api/PostServiceV2";
import {toast_error} from "../../components/ui/ToastCt";
import {UserContext} from "../../context";
import {Link} from "react-router-dom";

const SignIn = () => {
    const {setLoginData} = useContext(UserContext);

    function signinHandleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        PostServiceV2.authenticateUser(
            (errMsg) => toast_error(errMsg),
            (res) => setLoginData(res),
            Object.fromEntries(new FormData(form).entries())
        );
    }

    return (
        <div className={"container pt-2"}>
            <div className="row justify-content-center mb-4 px-sm-0 px-2">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <GoogleLoginButton/>
                </div>
            </div>

            <div className="row justify-content-center mb-4 px-sm-0 px-2">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Sign in with username
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={signinHandleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="f1un" className="form-label mb-0">Username</label>
                                <input type="text" name="username" className="form-control" id="f1un" required/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="f1pw" className="form-label mb-0">Password</label>
                                <Link to="/sendpass" className={"float-end link-secondary text-decoration-none"}
                                      style={{fontSize: "0.9rem"}}>Forgot password?</Link>
                                <input type="password" name="password" className="form-control" id="f1pw" required/>
                            </div>
                            <div className="mb-1 mt-3">
                                <button type="submit" className="w-100 btn btn-outline-primary">Sign in</button>
                            </div>
                            <div className="mb-1 mt-3 text-center">
                                <span className={"float-center text-secondary"} style={{fontSize: "0.9rem"}}>
                                    Don’t have an account?
                                    <Link to="/signup" className={"text-decoration-none"}> Sign up</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignIn;