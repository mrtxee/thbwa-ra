import React from 'react';
import {toast_error, toast_success} from "../../components/ui/ToastCt";
import {useParams} from "react-router-dom";
import PostServiceV2 from "../../api/PostServiceV2";

const PasswordReset_Step2 = () => {
    const { key } = useParams();

    function passwordChangeHandleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (data.password !== data.password2) {
            toast_error('пароли не совпадают');
            return;
        }
        PostServiceV2.passwordResetConfirm(
            (errMsg) => toast_error(errMsg),
            (res) => {toast_success("updated");
        }, Object.fromEntries(new FormData(e.target).entries()));
    }

    return (
        <div className={"container pt-2"}>
            <div className="row justify-content-center mb-4 px-sm-0 px-2">
                <div className={"col-12 col-sm-8 col-md-6 col-lg-4 p-0 card shadow-lg bg-body-tertiary rounded"}>
                    <div className="card-header text-center">
                        Account Recovery
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={passwordChangeHandleSubmit}>
                            <input type="hidden" name="key" value={key}/>
                            <div className="mb-2">
                                <span className={"float-center text-secondary fs-6"}>
                                    You are about to set new password for your account
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="f42" className="form-label mb-0">New password</label>
                                <input type="password" name="password" className="form-control" id="f42" required
                                       minLength="5" maxLength="128"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="f42" className="form-label mb-0">New password (again)</label>
                                <input type="password" name="password2" className="form-control" id="f42" required
                                       minLength="5" maxLength="128"/>
                            </div>
                            <div className="mb-3 mt-3">
                                <button type="submit" className="w-100 btn btn-outline-primary">Recover my account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset_Step2;