import React, {useEffect, useState} from 'react';
import {toast_error} from "../../components/ui/ToastCt";
import PostServiceV2 from "../../api/PostServiceV2";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";

const CompentensDev = ({fetchUserDataCallback, userdata}) => {
    const CLIENT_ID_GOOGLE = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const [consoleText, setConsoleText] = useState([]);
    const defaultErrorHandler = (err) => {
        toast_error(err);
        setConsoleText(err);
    }
    useEffect(() => {
        setConsoleText(userdata);
    }, [userdata]);

    function updateUserData() {
        fetchUserDataCallback();
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3">
                    <h3>username unique check</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.isUniqueUsernameCheck(
                                    (err) => defaultErrorHandler(err),
                                    (res) => setConsoleText(res),
                                    'delmeUser2');
                            }}>usernameUniqueCheck
                    </button>
                    <hr/>

                    <h3>register apply</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.registerUser(
                                    (err) => defaultErrorHandler(err),
                                    (res) => setConsoleText(res),
                                    'delmeUser1', '****bw', 'rvanat@mail.ru', 'vasya', 'pupkin');
                            }}>register apply
                    </button>
                    <hr/>

                    <h3>password login apply</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.authenticateUser(
                                    (err) => defaultErrorHandler(err),
                                    (res) => setConsoleText(res),
                                    'r****1', '****bw');
                            }}>password login apply
                    </button>
                    <hr/>

                    <h3>get userdata by token</h3>
                    <button className='btn btn-secondary' onClick={updateUserData}>get userdata by token</button>
                    <hr/>

                    <h3>GoogleLogin</h3>
                    <GoogleLoginButton
                        CLIENT_ID_GOOGLE={CLIENT_ID_GOOGLE}
                        onSuccessCallback={(tokenResponse) => {
                            PostServiceV2.authenticateUserWithGoogleAccessToken(
                                (err) => defaultErrorHandler(err),
                                (res) => {
                                    setConsoleText(res.data);
                                    if (res.data.token) {
                                        localStorage.setItem('token', res.data.token);
                                    }
                                },
                                tokenResponse
                            )
                        }}
                    />
                    <hr/>
                </div>
                <div className="col">
                    <h4>console</h4>
                    <pre className={""}>
                        <code>{JSON.stringify(consoleText, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CompentensDev;