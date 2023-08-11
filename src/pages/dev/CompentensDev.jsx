import React, {useEffect, useState} from 'react';
import {toast_error} from "../../components/ui/ToastCt";
import PostServiceV2 from "../../api/PostServiceV2";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";

const CompentensDev = ({getUserDataCallback, userdata, setUserdata, CLIENT_ID_GOOGLE, onSuccessCallback}) => {
    const [consoleText, setConsoleText] = useState({'start': 'state'});
    const defaultErrorHandler = (errMessage) => {
        toast_error(errMessage);
        setConsoleText(errMessage);
    }
    useEffect(() => {
        let txt = {'TOKEN': 'state'}
        if (userdata) {
            txt = userdata;
            txt['TOKEN'] = localStorage.getItem('token');
        }
        txt['TOKEN'] = localStorage.getItem('token');
        setConsoleText(txt);
    }, [userdata]);

    function getUserData() {
        getUserDataCallback();
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3">

                    <h3>user logout</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                setUserdata();
                                localStorage.removeItem("token");
                            }}>Logout
                    </button>
                    <hr/>

                    <h3>username unique check</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.isUniqueUsernameCheck(
                                    (errMessage) => defaultErrorHandler(errMessage),
                                    (res) => setConsoleText(res),
                                    {'username': 'delmeUser1'});
                            }}>Unique username check
                    </button>
                    <hr/>

                    <h3>register apply</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.registerUser(
                                    (errMessage) => defaultErrorHandler(errMessage),
                                    (res) => setUserdata(res),
                                    {'username': 'delmeUser1', 'password': '****bw', 'email': 'rvanat@mail.ru', 'first_name': 'vasya', 'last_name': 'pupkin'});
                            }}>Register user
                    </button>
                    <hr/>

                    <h3>login</h3>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.authenticateUser(
                                    (errMessage) => defaultErrorHandler(errMessage),
                                    (res) => setUserdata(res),
                                    {'username': 'root1', 'password': 'Ss3pLsmbw'}
                                );
                            }}>Login
                    </button>
                    <hr/>

                    <h3>get userdata by token</h3>
                    <button className='btn btn-secondary' onClick={getUserData}>Get userdata by token</button>
                    <hr/>

                    <h3>google login</h3>
                    <GoogleLoginButton
                        CLIENT_ID_GOOGLE={CLIENT_ID_GOOGLE}
                        onSuccessCallback={(tokenResponse) => onSuccessCallback(tokenResponse)}
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