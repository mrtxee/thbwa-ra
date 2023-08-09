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
        const response = await axios.post(
            `${BACKEND_BASE_URL}/api/v2.0/auth/login/google/`, data
        ).catch(function (error) {
            throw error
        })
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        setConsoleText(response.data);
    }


    async function err403handler() {
        setConsoleText('err403handler');
        const response = await axios.get(`${BACKEND_BASE_URL}/api/v2.0/test403`).catch(
            function (error) {
                if (error.response.status === 403 || error.response.status === 401) {
                    toast_error(`bad credentials`);
                } else throw error
            }
        )
        if (!response) return;
        if (!response.data.success) {
            // ...
        }
    }


    function updateUserData(){
        fetchUserDataCallback().then(
            setConsoleText(userdata)
        )
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3">
                    <h1>get userdata by token</h1>
                    <button className='btn btn-secondary' onClick={updateUserData}>get userdata by token</button>
                    <hr/>

                    <h1>GoogleLogin</h1>
                    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
                        <GoogleLoginButton
                            onSuccessCallback={authByGoogleAccessToken}
                        />
                    </GoogleOAuthProvider>
                    <hr/>

                    <h1>401, 403 http err hander ex</h1>
                    <button className='btn btn-secondary' onClick={err403handler}>403 handle ex</button>
                    <hr/>
                </div>
                <div className="col">
                    <h1>console</h1>
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