import React, {useState} from 'react';
import axios from "axios";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import jwtDecode from 'jwt-decode'

const Test = () => {
    const CLIENT_ID_GOOGLE = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const [userContext, setUserContext] = useState([]);
    async function getUserContext() {
        console.log('getUserContext');

        var BACKEND_BASE_URL = 'http://127.0.0.1:8000';
        const response = await axios.get(`${BACKEND_BASE_URL}/api/v1.0/get_context`).catch(function (error) {
            throw error
        })

        if (!response.data.success){
            if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
                throw new Error('badCredentialError')
            }
            //console.log(response.data)
            setUserContext(response.data.msgs);
            //throw new Error('badDataError')

        }
        else setUserContext(response.data.data);
    }

    return (<div>
        <h1>GoogleLogin</h1>
        <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    if (credentialResponse.credential != null) {
                        const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
                        console.log(USER_CREDENTIAL);
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                type = {"icon"}
                //theme = {"filled_black"} //outline, filled_blue, filled_black
                width = {280}
                auto_select = {false}
                ux_mode = {"popup"}
                nonce = {"jthbwawt"}
                //useOneTap
            />
        </GoogleOAuthProvider>
        <h1>test</h1>
        <p>console:</p>
        <samp className={"m-4"}>{JSON.stringify(userContext, null, 2)}</samp>
        <p className={"m-4"}>
            <button onClick={getUserContext}>go axios</button>
        </p>
    </div>);
};

export default Test;