import React, {useState} from 'react';
import axios from "axios";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {toast_error} from "../../components/ui/ToastCt";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";

const CompentensDev = ({fetchUserDataCallback, userdata}) => {
    const CLIENT_ID_GOOGLE = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    const [consoleText, setConsoleText] = useState([]);

    async function authByGoogleAccessToken(data) {
        await axios.post(
            `${BACKEND_BASE_URL}/api/v2.0/auth/login/google/`, data
        )
            .then((res) => {
                setConsoleText(res.data);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                }
            })
            .catch((err) => {
                setConsoleText(`${err.response.status} ${err.response.data}`);
                toast_error(`${err.response.status} ${err.response.data}`);
            });
    }


    function updateUserData() {
        fetchUserDataCallback().then(
            setConsoleText(userdata)
        )
    }


    function authByPassword() {
        setConsoleText('authByPassword')

        const handleLogin = (username, password) => {
            const data = {username, password};
            axios.post(`${BACKEND_BASE_URL}/api/v2.0/auth/login/`, data)
                .then((res) => {
                    setConsoleText(res.data);
                })
                .catch((err) => {
                    setConsoleText(err.response.data);
                    toast_error(`${err.response.status} ${err.response.data}`);
                });

        };
        //handleLogin('a','b');
        handleLogin('r****1', '****bw');
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3">
                    <h3>password login apply</h3>
                    <button className='btn btn-secondary' onClick={authByPassword}>password login apply</button>
                    <hr/>

                    <h3>get userdata by token</h3>
                    <button className='btn btn-secondary' onClick={updateUserData}>get userdata by token</button>
                    <hr/>

                    <h3>GoogleLogin</h3>
                    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
                        <GoogleLoginButton
                            onSuccessCallback={authByGoogleAccessToken}
                        />
                    </GoogleOAuthProvider>
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