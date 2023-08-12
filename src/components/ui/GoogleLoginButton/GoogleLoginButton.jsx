import React, {useContext} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleLoginButtonNested from "./GoogleLoginButtonNested";
import {GoogleOAuthClient} from "../../../context";

const GoogleLoginButton = ({onSuccessCallback}) => {
    const {GOOGLE_CLIENT_ID} = useContext(GoogleOAuthClient);
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLoginButtonNested
                onSuccessCallback={onSuccessCallback}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;