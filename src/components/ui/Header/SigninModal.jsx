import React from 'react';
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import PostServiceV2 from "../../../api/PostServiceV2";
import {toast_error} from "../ToastCt";

const SigninModal = ({SigninModalID, CLIENT_ID_GOOGLE, setUserdata}) => {
    return (
        <div>
            <div className="modal fade" id={SigninModalID} tabIndex="-1" aria-labelledby={SigninModalID + 'label'}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={SigninModalID + 'label'}>Вход в аккаунт</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className={"text-center py-4"}>
                                <GoogleLoginButton
                                    CLIENT_ID_GOOGLE={CLIENT_ID_GOOGLE}
                                    onSuccessCallback={(tokenResponse) => {
                                        PostServiceV2.authenticateUserWithGoogleAccessToken(
                                            (errMessage) => toast_error(errMessage),
                                            (res) => setUserdata(res),
                                            tokenResponse);
                                    }}
                                />
                            </p>

                            <div className="mb-2">
                                <input type="text" className="form-control" placeholder="username"/>
                            </div>
                            <div>
                                <input type="password" className="form-control" placeholder="password"/>
                            </div>
                            <div className={'row align-text-top'}>
                                <div className="col pt-2">
                                    <button type="submit" className="px-5 btn btn-light btn-outline-primary">
                                        Sign in
                                    </button>
                                </div>
                                <div className="col text-muted text-end fs-6">
                                    забыл пароль?
                                </div>
                            </div>
                        </div>
                        {/*<div className="modal-footer">*/}
                        {/*    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                        {/*    <button type="button" className="btn btn-primary">Understood</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SigninModal;