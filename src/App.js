import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/ui/Header/Header";
import ToastCt, {toast_error} from "./components/ui/ToastCt";
import PostServiceV2 from "./api/PostServiceV2";
import RoutesSchema from "./router/RoutesSchema";
import {GoogleOAuthClient, UserContext} from "./context";

function App() {
    const [loginData, setLoginData] = useState();
    const GOOGLE_CLIENT_ID = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const processGoogleOAuth = (tokenResponse) => {
        PostServiceV2.authenticateUserWithGoogleAccessToken(
            (errMessage) => toast_error(errMessage),
            (res) => setLoginData(res),
            tokenResponse);
    }
    const getLoginDataByToken = () => {
        PostServiceV2.getUserLogin(
            (errMessage, err) => {
                if (err.status === 401) localStorage.removeItem('token')
                else toast_error(errMessage);
            },
            (res) => setLoginData(res)
        )
    };
    const updateLocalStorageToken = () => {
        if (loginData && loginData.token)
            localStorage.setItem('token', loginData.token);
    }
    useEffect(() => {
        getLoginDataByToken();
    }, []);
    useEffect(() => {
        updateLocalStorageToken();
    }, [loginData]);

    return (
        <UserContext.Provider value={{loginData, setLoginData, getLoginDataByToken}}>
            <BrowserRouter>
                <Header/>
                <main className="flex-shrink-0 mt-0 mb-4 p-0">
                    <GoogleOAuthClient.Provider value={{GOOGLE_CLIENT_ID, processGoogleOAuth}}>
                        <RoutesSchema/>
                    </GoogleOAuthClient.Provider>
                </main>
                <ToastCt/>
            </BrowserRouter>
            {/*<Footer />*/}
        </UserContext.Provider>
    );
}

export default App;
