import React, {useState} from 'react';
import axios from "axios";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Test = () => {
    const CLIENT_ID_GOOGLE = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    const [userContext, setUserContext] = useState([]);

    async function getUserContext() {
        console.log('getUserContext');
        const response = await axios.get(`${BACKEND_BASE_URL}/api/v1.0/get_context`).catch(function (error) {
            throw error
        })

        if (!response.data.success){
            if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
                throw new Error('badCredentialError')
            }
            setUserContext(response.data.msgs);
        }
        else setUserContext(response.data.data);
    }

    async function sendCredsToBE(jwt) {
        console.log('getUserContext');
        const response = await axios.post(
            `${BACKEND_BASE_URL}/api/v2.0/auth/login/google/`,
            jwt
        ).catch(function (error) {
            throw error
        })
        setUserContext(response.data);
        console.log(response);
    }


    function refreshUserToken(){
        console.log('refreshUserToken pressed');
    }

    return (<div>
        <h1>GoogleLogin</h1>
        <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    if (credentialResponse.credential != null) {
                        const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
                        console.log(USER_CREDENTIAL);
                        sendCredsToBE(credentialResponse).then(()=>{
                            console.log('sendCredsToBE did');
                        })
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                type = {"icon"}
                theme = {"outline"} //outline, filled_blue, filled_black
                width = {280}
                auto_select = {false}
                ux_mode = {"popup"}
                nonce = {"jthbwawt"}
                prompt='consent'
                //native_login_uri={'http://127.0.0.1:8000/api/v2.0/auth/login/google/'}
                //login_uri={'http://127.0.0.1:8000/api/v2.0/auth/login/google/'}
                //useOneTap
            />
        </GoogleOAuthProvider>
        <h1>test</h1>
        <p>console:</p>
        <pre className={"m-4"}>
            <code>
                {JSON.stringify(userContext, null, 2)}
            </code>
        </pre>
        <p className={"m-4"}>
            <button onClick={getUserContext}>go axios</button>
            <button onClick={refreshUserToken}>refresh user token</button>
        </p>
    </div>);
};

export default Test;