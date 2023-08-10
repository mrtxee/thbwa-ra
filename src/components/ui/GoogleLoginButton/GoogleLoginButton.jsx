import React from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleLoginButtonNested from "./GoogleLoginButtonNested";

const GoogleLoginButton = ({CLIENT_ID_GOOGLE, onSuccessCallback}) => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
            <GoogleLoginButtonNested
                onSuccessCallback={onSuccessCallback}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;