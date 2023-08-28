import React from 'react';
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";
import PostServiceV2 from "../../api/PostServiceV2";
import {toast_error, toast_success} from "../../components/ui/ToastCt";

const PasswordReset_Step1 = () => {
    function sendPasswordLinkHandleSubmit(e) {
        e.preventDefault();
        PostServiceV2.passwordReset(
            (errMsg, err) => {
                if (err.status === 417) toast_error("указанный e-mail не зарегстророван")
                else toast_error(errMsg)
            },
            (res) => {
                toast_success("письмо для восстановление пароля будет отправлено в ближайшее время");
            },
            Object.fromEntries(new FormData(e.target).entries()));
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
                        Account recovery
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={sendPasswordLinkHandleSubmit}>
                            <div className="mb-2">
                                <span className={"float-center text-secondary fs-6"}>
                                    Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="f31" className="form-label mb-0">Email</label>
                                <input type="email" name="email" className="form-control" id="f31" required/>
                            </div>
                            <div className="mb-3 mt-3">
                                <button type="submit" className="w-100 btn btn-outline-primary">Send recovery email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PasswordReset_Step1;