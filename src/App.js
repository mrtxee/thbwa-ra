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

function App() {
    const [userdata, setUserdata] = useState();
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
            <Header userdata={userdata}/>
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
                        />}/>
                        <Route path="/dev2" element={<Extra/>}/>
                    </Routes>
                </div>
            </main>
            <ToastCt/>
            {/*<Footer />*/}
        </BrowserRouter>
    );
}

export default App;
