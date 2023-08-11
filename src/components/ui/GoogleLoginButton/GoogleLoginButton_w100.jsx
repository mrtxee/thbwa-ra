import React from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleLoginButtonNested_w100 from "./GoogleLoginButtonNested_w100";

const GoogleLoginButton_w100 = ({CLIENT_ID_GOOGLE, onSuccessCallback}) => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
            <GoogleLoginButtonNested_w100
                onSuccessCallback={onSuccessCallback}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton_w100;