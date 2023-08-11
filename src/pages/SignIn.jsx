import React from 'react';
import GoogleLoginButton_w100 from "../components/ui/GoogleLoginButton/GoogleLoginButton_w100";
import PostServiceV2 from "../api/PostServiceV2";
import {toast_error, toast_success} from "../components/ui/ToastCt";

const SignIn = ({CLIENT_ID_GOOGLE, onSuccessCallback, setUserdata}) => {
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        PostServiceV2.authenticateUser(
            (errMsg)=>toast_error(errMsg),
            (res)=>setUserdata(res),
            Object.fromEntries(new FormData(form).entries())
        );
    }
    return (
        <div className={"container pt-2"}>
            <div className="row justify-content-center mb-4">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <GoogleLoginButton_w100
                        CLIENT_ID_GOOGLE ={CLIENT_ID_GOOGLE}
                        onSuccessCallback = {onSuccessCallback}
                    />
                </div>
            </div>

            <div className="row justify-content-center mb-4">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Sign in with username
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="f1un" className="form-label mb-0">Username</label>
                            <input type="text" name="username" className="form-control" id="f1un" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="f1pw" className="form-label mb-0">Password</label>
                            <a className={"float-end text-secondary text-decoration-none"} style={{fontSize:"0.9rem"}} href={"#"}>Forgot password?</a>
                            <input type="password" name="password" className="form-control" id="f1pw" required/>
                        </div>
                        <div className="mb-2">
                            <button type="submit" className="w-100 btn btn-outline-primary">Sign in</button>
                        </div>
                        <div className="mb-1 mt-3 text-center">
                            <span className={"float-center text-secondary"} style={{fontSize:"0.9rem"}}>
                                Don’t have an account?
                                <a className={"text-decoration-none"}  href={"#"}> Sign up</a>
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