import React from 'react';
import './GoogleLoginButton.css';
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
    const login = useGoogleLogin({
        prompt: 'consent',
        onSuccess: async tokenResponse => {
            console.log('tokenResponse');
            console.log(tokenResponse);
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {Authorization: `Bearer ${tokenResponse.access_token}`},
                })
                .then(res => res.data);
            console.log('userInfo');
            console.log(userInfo);
        }
    });
    return (
        <button className="btn btn-outline-primary btn-social text-bl1ack" onClick={() => {
            console.log('google_login');
            login();
        }}>
            <img src={require("../../../assets/google.png")} className="bi bi-google"/> Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;