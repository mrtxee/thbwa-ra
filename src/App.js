import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import Header from "./components/ui/Header/Header";
import CompentensDev from "./pages/dev/CompentensDev";
import Extra from "./pages/dev/Extra";
import ToastCt, {toast_error} from "./components/ui/ToastCt";
import PostServiceV2 from "./api/PostServiceV2";
import SigninModal from "./components/ui/Header/SigninModal";
import newid from "./components/utils/newid";

function App() {
    const [userdata, setUserdata] = useState();
    const CLIENT_ID_GOOGLE = "93483542407-ckrg8q5q527dmcd62ptg0am5j9jhvesb.apps.googleusercontent.com";
    const SigninModalID = newid();
    const getUserDataByToken = () => {
        PostServiceV2.getUserdata(
            (errMessage, err) => {
                if (err.status === 401) localStorage.removeItem('token')
                else toast_error(errMessage);
            },
            (res) => setUserdata(res)
        )
    };
    const updateLocalStorageToken = () => {
        if (userdata && userdata.token)
            localStorage.setItem('token', userdata.token);
    }
    useEffect(() => {
        getUserDataByToken();
    }, []);
    useEffect(() => {
        updateLocalStorageToken();
    }, [userdata]);

    /* todo: подключить
    *   + сделать состояние unserdata
    *   + обновлять состояние unserdata по токену при страрте, если есть токен
    *   + если unserdata не пустое, то изменить кнопку signin
    * */

    return (
        <BrowserRouter>
            <Header
                userdata={userdata}
                setUserdata={setUserdata}
                SigninModalID={SigninModalID}
            />
            <main className="flex-shrink-0 mt-0 mb-4 p-0">
                <div className="container">
                    <Routes>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/dev1" element={<CompentensDev
                            getUserDataCallback={getUserDataByToken}
                            userdata={userdata}
                            setUserdata={setUserdata}
                            CLIENT_ID_GOOGLE={CLIENT_ID_GOOGLE}
                        />}/>
                        <Route path="/dev2" element={<Extra/>}/>
                    </Routes>
                </div>
            </main>
            <SigninModal
                SigninModalID={SigninModalID}
                CLIENT_ID_GOOGLE={CLIENT_ID_GOOGLE}
                setUserdata = {setUserdata}
            />
            <ToastCt/>
            {/*<Footer />*/}
        </BrowserRouter>
    );
}

export default App;
