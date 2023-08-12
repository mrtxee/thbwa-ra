import React, {useContext} from 'react';
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";
import PostServiceV2 from "../../api/PostServiceV2";
import {toast_error} from "../../components/ui/ToastCt";
import {UserContext} from "../../context";

const SignUp = () => {
    const {setLoginData} = useContext(UserContext);

    function signupHandleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        PostServiceV2.registerUser(
            (errMsg) => toast_error(errMsg),
            (res) => setLoginData(res),
            Object.fromEntries(new FormData(form).entries())
        );
    }

    return (
        <div className={"container pt-2"}>
            <div className="row justify-content-center mb-4">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <GoogleLoginButton/>
                </div>
            </div>

            <div className="row justify-content-center mb-4">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Sign up
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={signupHandleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="f21" className="form-label mb-0">Username</label>
                                <input type="text" name="username" className="form-control" id="f21" required
                                       minLength="5" maxLength="128"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="f22" className="form-label mb-0">Password</label>
                                <input type="password" name="password" className="form-control" id="f22" required
                                       minLength="5" maxLength="128"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="f25" className="form-label mb-0">Email</label>
                                <input type="email" name="email" className="form-control" id="f25" required/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="f23" className="form-label mb-0">First name</label>
                                <input type="text" name="first_name" className="form-control" id="f23" required
                                       minLength="3" maxLength="128"/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="f24" className="form-label mb-0">Last name</label>
                                <input type="text" name="last_name" className="form-control" id="f24" required
                                       minLength="3" maxLength="128"/>
                            </div>
                            <div className="mb-1 mt-3">
                                <button type="submit" className="w-100 btn btn-outline-primary">Sign up</button>
                            </div>
                            <div className="mb-1 mt-3 text-center">
                                <span className={"float-center text-secondary"}
                                      style={{fontSize: "0.6rem", lineHeight: "3%"}}>
                                    By clicking “Sign up”, you agree to our terms of use and privacy policy of the service.
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;